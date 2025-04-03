import React from "react";
import styles from "../home.module.css";
import CountUp from "react-countup";

const BLDinfo = () => {
  return (
    <section className={styles.bldinfo}>
      <div className={styles.infos}>
        <h2>
          <CountUp end={7} duration={1} /> +
        </h2>
        <h3>Different type Blood</h3>
      </div>
      <div className={styles.infos}>
        <h2>
          <CountUp end={200} duration={3} />+
        </h2>
        <h3>Donted Blood</h3>
      </div>
      <div className={styles.infos}>
        <h2>
          <CountUp end={40} duration={3} />+
        </h2>
        <h3>Complete Serve Patient</h3>
      </div>
      <div className={styles.infos}>
        <h2>
          <CountUp end={80} duration={3} />+
        </h2>
        <h3>DONOR</h3>
      </div>
      <div className={styles.infos}>
        <h2>
          <CountUp end={90} duration={3} />+
        </h2>
        <h3>Actrive Donor</h3>
      </div>
    </section>
  );
};

export default BLDinfo;
