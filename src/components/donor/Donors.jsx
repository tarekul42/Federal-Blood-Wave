import React from "react";
import { useSearchParams } from "react-router";

const Donors = () => {
  const [searchIndex] = useSearchParams();

  const bloodType = searchIndex.get("bloodType");
  const distric = searchIndex.get("distric");
  return (
    <section>
      <h1>{bloodType}</h1>
      <h1>{distric}</h1>
    </section>
  );
};

export default Donors;
