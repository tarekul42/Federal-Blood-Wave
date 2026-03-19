import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/loading/loading";

// Lazy load components
const Home = lazy(() => import("../components/home/home"));
const About = lazy(() => import("../components/about/about"));
const Contact = lazy(() => import("../components/contact/contact"));
const NotFound = lazy(() => import("../components/notFound/404"));
const Auth = lazy(() => import("../components/Auth/auth"));
const PrivateRoute = lazy(() => import("./privateRoute"));
const Donors = lazy(() => import("../components/donor/Donors"));
const Profile = lazy(() => import("../components/profile/profile"));
const Settings = lazy(() => import("../components/setting/setting"));
const Terms = lazy(() => import("../components/terms/Terms"));
const Community = lazy(() => import("../components/community/Community"));
const MailVerified = lazy(() => import("../components/mailVerify/MailVerified"));
const BMIAgeCalculator = lazy(() => import("../components/bmiAndAgeCalc/bmiAndAgeCalc"));

const Router = () => {
  const { isAuth } = useAuth();
  
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
        <Route index element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
        <Route path="/donor" element={<Suspense fallback={<Loading />}><Donors /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<Loading />}><Contact /></Suspense>} />
        <Route path="bmicalc" element={<Suspense fallback={<Loading />}><BMIAgeCalculator /></Suspense>} />
        <Route path="terms" element={<Suspense fallback={<Loading />}><Terms /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<Loading />}><About /></Suspense>} />

        <Route path="verify" element={<Suspense fallback={<Loading />}><MailVerified /></Suspense>} />
        <Route path="/auth" element={isAuth ? <Home /> : <Auth />} />

        <Route path="/" element={<PrivateRoute loginAuth={isAuth} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="community" element={<Community />} />
          <Route path="setting" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
