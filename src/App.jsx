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

  const checkAuth = async () => {
    try {
      const res = await fetch(`${api}/authorizeDonor`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setIsAuth(data?.auth);
    } catch (error) {
      // console.error("Authorization error:", error);
      setIsAuth(false);
    }
  };

  const profileGet = async () => {
    try {
      const res = await fetch(`${api}/donor/profile`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setProfData(data?.donor || {});
    } catch (error) {
      // console.error("Profile fetch error:", error);
      setProfData({});
    }
  };

  useEffect(() => {
    const init = async () => {
      await profileGet();
      await checkAuth();
      setIsAppReady(true); // Mark app ready
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, profData }}>
      {!isAppReady ? (
        <Loading />
      ) : (
        <>
          <ScrollToTop/>
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
