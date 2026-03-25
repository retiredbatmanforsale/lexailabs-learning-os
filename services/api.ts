let _apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

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

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${_apiUrl}${path}`;
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const accessToken = _getAccessToken();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response = await fetch(url, { ...options, headers });

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
    public data?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
