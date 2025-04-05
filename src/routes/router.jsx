import React from "react";
import { Route, Routes } from "react-router";
import Home from "../components/home/home";
import About from "../components/about/about";
import Contact from "../components/contact/contact";
import NotFound from "../components/notFound/404";
import Auth from "../components/Auth/auth";
import PrivateRoute from "./privateRoute";
import Donors from "../components/donor/Donors.JSx";
import { useAuth } from "../App";

const Router = () => {
  const {isAuth} = useAuth();
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="/donor" element={<Donors />} />

        {isAuth || <Route path="/auth" element={<Auth />} />}

        <Route path="/" element={<PrivateRoute loginAuth={isAuth} />}>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
