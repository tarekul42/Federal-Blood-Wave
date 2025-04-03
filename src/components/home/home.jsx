import React from "react";
import Banner from "./banner/Banner";
import styles from "./home.module.css";
import Features from "./features/feat";
import BLDinfo from "./Dinfo/BLDinfo";
const Home = () => {
  return (
    <section className={styles.home}>
      {/* <h1>Home</h1> */}
      <Banner />
      <hr />
      <BLDinfo />
      <hr />

      <Features />
      <hr />
    </section>
  );
};

export default Home;
