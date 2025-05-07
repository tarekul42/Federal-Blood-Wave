import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navber from "./components/navber/navber";
import Router from "./routes/router";
import { api } from "./db/api";
import Loading from "./components/loading/loading";
import ScrollToTop from "./ScrollToTop";

const AuthContext = createContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false); // App ready flag
  const [profData, setProfData] = useState({});

  const [accessToken, setAccessToken] = useState("");

  const checkAuth = async () => {
    try {
      const res = await fetch(`${api}/authorizeDonor`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data);
      setIsAuth(data?.auth);
    } catch (error) {
      // console.error("Authorization error:", error);
      setIsAuth(false);
    }
  };

  // Refresh Access Token
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

  const profileGet = async (token) => {
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
      // console.log(data )
    } catch (error) {
      console.error("Profile fetch error:", error);
      setProfData({});
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      await restoreSession();
      setIsAppReady(true); // Mark app ready
    };
    init();
  }, []);

  useEffect(() => {
    if (accessToken) {
      profileGet(accessToken);
    }
  }, [accessToken]);

  // console.log(accessToken);
  return (
    <AuthContext.Provider
      value={{ isAuth, profData, token: accessToken, setAccessToken }}
    >
      {!isAppReady ? (
        <Loading />
      ) : (
        <>
          <ScrollToTop />
          <Navber />
          <Router />
          <Footer />
        </>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("ServerError");
  return context;
};

export default App;
