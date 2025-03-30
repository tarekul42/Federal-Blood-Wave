import React from "react";
import styles from "./sdonor.module.css";
import { bangladeshiDistricts } from "../../db/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchDonor = () => {
  return (
    <section className={styles.sDonor} id="SearchDonor">
      <form action="/donor/">
        <select name="bloodType" id="bloodType">
          <option value="A+ev">Enter A Blood Group</option>
          <option value="A+ev">A+ (ev)</option>
          <option value="A-ev">A- (ev)</option>
          <option value="B+ev">B+ (ev)</option>
          <option value="B-ev">B- (ev)</option>
          <option value="O+ev">O+ (ev)</option>
          <option value="O-ev">O- (ev)</option>
          <option value="AB+ev">AB+ (ev)</option>
          <option value="AB-ev">AB- (ev)</option>
        </select>
        <select name="distric" id="distric">
            <option value="Dhaka">Select Your Disctric Area</option>
          {bangladeshiDistricts?.map((data) => {
            const { id, name } = data;
            return (
              <option value={name} key={id}>
                {name}
              </option>
            );
          })}
        </select>
        <button><FontAwesomeIcon icon={faMagnifyingGlass}/> </button>
      </form>
    </section>
  );
};

export default SearchDonor;
