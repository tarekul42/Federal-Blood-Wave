import React from "react";
import Banner from "./banner/Banner";
import styles from './home.module.css';
const Home = () => {
  return (
    <section className={styles.home}>
      {/* <h1>Home</h1> */}
        <Banner />
    </section>
  );
};

export default Home;
