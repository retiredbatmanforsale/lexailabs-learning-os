import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { apiFetch, setTokenHandlers, setApiUrl } from '../services/api';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  isPremium: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasAccess: boolean;
  accessType: 'premium' | 'institution' | null;
  organizationName: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  loginWithGoogle: (credential: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ message: string }>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<boolean>;
  getAccessToken: () => string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const REFRESH_TOKEN_KEY = 'lexai_refresh_token';
const REFRESH_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

function decodeJwtPayload(token: string): any {
  try {
    const base64 = token.split('.')[1];
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:4000';

  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    hasAccess: false,
    accessType: null,
    organizationName: null,
    isLoading: true,
  });

  const accessTokenRef = useRef<string | null>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Set API URL on mount
  useEffect(() => {
    setApiUrl(apiUrl);
  }, [apiUrl]);

  const getAccessToken = useCallback(() => accessTokenRef.current, []);

  const clearSession = useCallback(() => {
    accessTokenRef.current = null;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
    setState({
      user: null,
      isAuthenticated: false,
      hasAccess: false,
      accessType: null,
      organizationName: null,
      isLoading: false,
    });
  }, []);

  const setSession = useCallback(
    (accessToken: string, refreshToken: string) => {
      accessTokenRef.current = accessToken;
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      const payload = decodeJwtPayload(accessToken);
      if (!payload) {
        clearSession();
        return;
      }

      setState({
        user: {
          id: payload.userId,
          name: '',
          email: payload.email,
          role: payload.role,
          isPremium: payload.hasAccess && payload.accessType === 'premium',
        },
        isAuthenticated: true,
        hasAccess: payload.hasAccess,
        accessType: payload.accessType,
        organizationName: payload.organizationName,
        isLoading: false,
      });

      // Schedule proactive refresh
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
      refreshTimerRef.current = setTimeout(() => {
        refreshTokens();
      }, REFRESH_INTERVAL_MS);
    },
    []
  );

  const refreshTokens = useCallback(async (): Promise<boolean> => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!storedRefreshToken) {
      clearSession();
      return false;
    }

    try {
      const data = await apiFetch<{
        success: boolean;
        accessToken: string;
        refreshToken: string;
      }>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      setSession(data.accessToken, data.refreshToken);
      return true;
    } catch {
      clearSession();
      return false;
    }
  }, [clearSession, setSession]);

  // Register token handlers for apiFetch
  useEffect(() => {
    setTokenHandlers(getAccessToken, refreshTokens);
  }, [getAccessToken, refreshTokens]);

  // On mount, try to restore session from refresh token
  useEffect(() => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (storedRefreshToken) {
      refreshTokens().then((success) => {
        if (success) {
          // Fetch full user profile
          apiFetch<{
            user: User;
            hasAccess: boolean;
            accessType: 'premium' | 'institution' | null;
            organizationName: string | null;
          }>('/auth/me')
            .then((data) => {
              setState((prev) => ({
                ...prev,
                user: data.user,
                hasAccess: data.hasAccess,
                accessType: data.accessType,
                organizationName: data.organizationName,
              }));
            })
            .catch(() => {
              // Token valid but /me failed — still authenticated from JWT
            });
        }
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const loginWithGoogle = useCallback(
    async (credential: string) => {
      const data = await apiFetch<{
        success: boolean;
        accessToken: string;
        refreshToken: string;
      }>('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
      });

      setSession(data.accessToken, data.refreshToken);

      // Fetch full profile
      try {
        const profile = await apiFetch<{
          user: User;
          hasAccess: boolean;
          accessType: 'premium' | 'institution' | null;
          organizationName: string | null;
        }>('/auth/me');
        setState((prev) => ({
          ...prev,
          user: profile.user,
          hasAccess: profile.hasAccess,
          accessType: profile.accessType,
          organizationName: profile.organizationName,
        }));
      } catch {
        // Profile fetch failed — JWT data is sufficient
      }
    },
    [setSession]
  );

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      const data = await apiFetch<{
        success: boolean;
        accessToken: string;
        refreshToken: string;
      }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setSession(data.accessToken, data.refreshToken);

      try {
        const profile = await apiFetch<{
          user: User;
          hasAccess: boolean;
          accessType: 'premium' | 'institution' | null;
          organizationName: string | null;
        }>('/auth/me');
        setState((prev) => ({
          ...prev,
          user: profile.user,
          hasAccess: profile.hasAccess,
          accessType: profile.accessType,
          organizationName: profile.organizationName,
        }));
      } catch {
        // Profile fetch failed — JWT data is sufficient
      }
    },
    [setSession]
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<{ message: string }> => {
      const data = await apiFetch<{ success: boolean; message: string }>(
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        }
      );
      return { message: data.message };
    },
    []
  );

  const logout = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (storedRefreshToken && accessTokenRef.current) {
      try {
        await apiFetch('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken: storedRefreshToken }),
        });
      } catch {
        // Logout failed on server — clear locally anyway
      }
    }
    clearSession();
  }, [clearSession]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginWithGoogle,
        loginWithEmail,
        register,
        logout,
        refreshTokens,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
