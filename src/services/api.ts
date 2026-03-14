import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

let _apiUrl = '';

export function setApiUrl(url: string) {
  _apiUrl = url;
}

export function getApiUrl(): string {
  return _apiUrl;
}

type TokenGetter = () => string | null;
type TokenRefresher = () => Promise<boolean>;

let _getAccessToken: TokenGetter = () => null;
let _refreshTokens: TokenRefresher = async () => false;

export function setTokenHandlers(
  getter: TokenGetter,
  refresher: TokenRefresher
) {
  _getAccessToken = getter;
  _refreshTokens = refresher;
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${_apiUrl}${path}`;
  const headers = new Headers(options.headers);

  // Only set Content-Type if there's actually a body to send
  if (options.body && !headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const accessToken = _getAccessToken();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response = await fetch(url, { ...options, headers });

  // If 401, try refreshing the token and retry once
  if (response.status === 401 && accessToken) {
    const refreshed = await _refreshTokens();
    if (refreshed) {
      const newToken = _getAccessToken();
      if (newToken) {
        headers.set('Authorization', `Bearer ${newToken}`);
      }
      response = await fetch(url, { ...options, headers });
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: response.statusText,
    }));
    throw new ApiError(response.status, error.error || 'Request failed', error);
  }

  return response.json();
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
