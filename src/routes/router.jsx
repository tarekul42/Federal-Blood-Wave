import React from "react";
import { Route, Routes } from "react-router";
import Home from "../components/home/home";
import About from "../components/about/about";
import Contact from "../components/contact/contact";
import NotFound from "../components/notFound/404";
import Auth from "../components/Auth/auth";
import PrivateRoute from "./privateRoute";
import Donors from "../components/donor/Donors";
import { useAuth } from "../App";
import Profile from "../components/profile/profile";
import Settings from "../components/setting/setting";
import Terms from "../components/terms/Terms";
import Community from "../components/community/Community";
import MailVerified from "../components/mailVerify/MailVerified";
import BMIAgeCalculator from "../components/bmiAndAgeCalc/bmiAndAgeCalc";

const Router = () => {
  const { isAuth } = useAuth();
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="/donor" element={<Donors />} />
        <Route path="contact" element={<Contact />} />
        <Route path="bmicalc" element={<BMIAgeCalculator />} />
        <Route path="terms" element={<Terms />} />
        <Route path="about" element={<About />} />

        <Route path="verify" element={<MailVerified />} />
        <Route path="/auth" element={isAuth ? <Home /> : <Auth />} />

        <Route path="/" element={<PrivateRoute loginAuth={isAuth} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="community" element={<Community />} />
          <Route path="setting" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
