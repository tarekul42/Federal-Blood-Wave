import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthContextType, Donor } from "../types";
import { api } from "../db/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [profData, setProfData] = useState<Partial<Donor>>({});
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${api}/authorizeDonor`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setIsAuth(data?.auth);
    } catch (error) {
      setIsAuth(false);
    }
  };

  const restoreSession = async () => {
    try {
      const res = await fetch(`${api}/donor/refresh`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setAccessToken(data?.token);
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
      const data = await res.json();
      setProfData(data?.donor || {});
    } catch (error) {
      console.error("Profile fetch error:", error);
      setProfData({});
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      await restoreSession();
      setIsAppReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (accessToken) {
      profileGet(accessToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuth, profData, token: accessToken, setAccessToken, isLoading: !isAppReady }}
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
