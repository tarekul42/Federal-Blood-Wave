import React, { useEffect, useState } from "react";
import SearchDonor from "../../searchDonor/SearchDonor";

const Banner = () => {
  const slides = [
    " https://i.ibb.co.com/Xx6RdFhL/bloodD1.png",
    " https://i.ibb.co.com/hxwhKRkf/bloodD2.png",
    " https://i.ibb.co.com/wZF62DqP/bloodD3.png",
    "  https://i.ibb.co.com/5ddmTzD/bloodD4.png",
    " https://i.ibb.co.com/Rk6Ztmtx/bloodD5.png",
    " https://i.ibb.co.com/5g7qK6db/bloodD6.png",
    " https://i.ibb.co.com/LX8XWfNs/bloodD7.png",
    " https://i.ibb.co.com/spLYK2Cm/bloodD8.png",
    " https://i.ibb.co.com/mr2stzCx/bloodD9.png",
    "https://i.ibb.co.com/yBgXX271/bloodD10.png",
    "https://i.ibb.co.com/V0jZPnZb/bloodD12.png",
    "https://i.ibb.co.com/93tykPrB/bloodD13.png",
    "https://i.ibb.co.com/ynCrbmTb/bloodD15.png",
    "https://i.ibb.co.com/hxb6KNBb/bloodD21.png",
  ];

  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prevIndex) => {
        if (prevIndex >= slides.length - 1) {
          return 0; // Loop back to the first slide
        }
        return prevIndex + 1; // Go to the next slide
      });
    }, 3000); // Change slide every second

    return () => clearInterval(interval); // Cleanup the interval on unmount or dependency change
  }, [slides.length]);

  const slideStyle = {
    width: "100%",
    height: "80vh",
    // borderRadius:'1rem',
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currIndex]})`,
    // backgroundAttachment: 'fixed',
    backgroundRepeat: "no-repeat",
    transition: "all 1s ease-in-out",
  };

  const slideContStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#141313ad",
    color: "red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // padding: "0 5rem" ,
    gap: "1rem",
  };

  return (
    <section style={slideStyle}>
      <div style={slideContStyle}>
        <SearchDonor />
      </div>
    </section>
  );
};

export default Banner;
