import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navber from "./components/navber/navber";
import Router from "./routes/router";
import { api } from "./db/api";

const AuthContext = createContext();

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${api}/authorizeDonor`, {
          method: "GET",
          credentials: "include", // Important for httpOnly cookies
        });

        const data = await res.json();
        setIsAuth(data.auth); // Should be true or false
      } catch (error) {
        console.error("Authorization error:", error);
        setIsAuth(false); // Fallback if error
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, isLoading }}>
      <Navber />
      <Router />
      <Footer />
    </AuthContext.Provider>
  );
}

// Hook to use Auth anywhere
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default App;
