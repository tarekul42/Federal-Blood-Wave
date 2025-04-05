import React from "react";
import { useSearchParams } from "react-router";
// import { useAuth } from "../../App";

const Donors = () => {
  const [searchIndex] = useSearchParams();
  // const {isAuth}=useAuth();
  const bloodType = searchIndex.get("bloodType");
  const distric = searchIndex.get("distric");
  // console.log(isAuth);
  return (
    <section>
      <h1>{bloodType}</h1>
      <h1>{distric}</h1>
      {/* <h2>{isAuth?"aiuu":'buuu'}</h2> */}
    </section>
  );
};

export default Donors;
