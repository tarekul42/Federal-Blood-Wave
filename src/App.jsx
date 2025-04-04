// import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navber from "./components/navber/navber";
import Router from "./routes/router";

function App() {
  const handleClick = () => {
    // fetch("http://localhost:1977", {
    //   method: "GET",
    //   credentials: "include", // Important to allow cookies
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
  };
  return (
    <>
      {/* <button onClick={handleClick}>BTN</button> */}
      <Navber />
      <Router />
      <Footer />
    </>
  );
}

export default App;
