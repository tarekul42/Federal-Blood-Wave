import React from "react";
import { Route, Routes } from "react-router";
import Home from "../components/home/home";
import About from "../components/about/about";
import Contact from "../components/contact/contact";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Router;
