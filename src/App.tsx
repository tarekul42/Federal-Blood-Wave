import { AuthProvider, useAuth } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/layout/Navbar";
import Router from "./routes/router";
import Loading from "./components/loading/loading";
import ScrollToTop from "./ScrollToTop";

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen pt-16">
        <Router />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
