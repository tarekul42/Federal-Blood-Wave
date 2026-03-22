import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthContextType, Donor } from "../types";
import { api } from "../db/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [profData, setProfData] = useState<Partial<Donor>>({});
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));

  // Persist token to localStorage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const checkAuth = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(`${api}/authorizeDonor`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      if (res.status === 401) {
        setAccessToken(null);
        setIsAuth(false);
        return;
      }
      const data = await res.json();
      setIsAuth(data?.auth);
    } catch (error) {
      setIsAuth(false);
    }
  };

  const restoreSession = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(`${api}/donor/refresh`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      if (res.status === 401) {
        setAccessToken(null);
        return;
      }
      const data = await res.json();
      if (data?.token) {
        setAccessToken(data.token);
      }
    } catch (err) {
      setAccessToken(null);
    }
  };

  const profileGet = async (token: string) => {
    try {
      const res = await fetch(`${api}/donor/profile`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (res.status === 401) {
        setAccessToken(null);
        return;
      }
      const data = await res.json();
      setProfData(data?.donor || {});
    } catch (error) {
      console.error("Profile fetch error:", error);
      setProfData({});
    }
  };

  useEffect(() => {
    const init = async () => {
      if (accessToken) {
        await checkAuth();
        await restoreSession();
      }
      setIsAppReady(true);
    };
    init();
  }, []);

  const logout = () => {
    setAccessToken(null);
    setProfData({});
    setIsAuth(false);
    localStorage.removeItem("accessToken");
    // Force a full redirect to clear any lingering protected states
    window.location.href = "/";
  };

  useEffect(() => {
    if (accessToken) {
      profileGet(accessToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuth, profData, token: accessToken, setAccessToken, logout, isLoading: !isAppReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
