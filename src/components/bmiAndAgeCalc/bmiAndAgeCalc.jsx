import React, { useState } from "react";
import styles from "./bmiAgeCalculator.module.css";

const BMIAgeCalculator = () => {
  const [weight, setWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("4");
  const [heightInch, setHeightInch] = useState("1");
  const [birthYear, setBirthYear] = useState("2000");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [bmiResult, setBmiResult] = useState("");
  const [bmiMessage, setBmiMessage] = useState("");
  const [ageMessage, setAgeMessage] = useState("");

  const calculateBMI = () => {
    if (!weight) return;
    const totalInches = parseInt(heightFeet) * 12 + parseInt(heightInch);
    const heightMeters = totalInches * 0.0254;
    const bmi = weight / (heightMeters * heightMeters);
    setBmiResult(bmi.toFixed(2));

    if (bmi < 18.5) {
      setBmiMessage("BMI is Low. Not eligible to donate.");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiMessage("Perfect BMI! You are good to go.");
    } else {
      setBmiMessage("BMI is High. Please consult a doctor.");
    }
  };

  const calculateAge = () => {
    const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() + 1 - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age >= 18) {
      setAgeMessage("Age is perfect for blood donation.");
    } else {
      setAgeMessage("You must be 18 or older to donate.");
    }
  };

  const renderOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Smart BMI & Age Calculator</h2>

      <div className={styles.section}>
        <h3 className={styles.subheading}>BMI Calculator</h3>
        <label>Weight :</label>
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={styles.input}
        />
        <div className={styles.selectGroup}>
          <label>Height(Feet) :</label>
          <select
            value={heightFeet}
            onChange={(e) => setHeightFeet(e.target.value)}
          >
            {renderOptions(4, 20)}
          </select>
          <label>Height(inch) :</label>
          <select
            value={heightInch}
            onChange={(e) => setHeightInch(e.target.value)}
          >
            {renderOptions(1, 12)}
          </select>
        </div>
        <button className={styles.button} onClick={calculateBMI}>
          Calculate BMI
        </button>
        {bmiResult && (
          <div className={styles.result}>
            <p>BMI: {bmiResult}</p>
            <p>{bmiMessage}</p>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.subheading}>Age Calculator</h3>
        <div className={styles.selectGroup}>
          <label htmlFor="Year">Year :</label>
          <select
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          >
            {renderOptions(1950, new Date().getFullYear())}
          </select>
          <label htmlFor="Month">Month :</label>
          <select
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
          >
            {renderOptions(1, 12)}
          </select>
          <label htmlFor="day">Day :</label>
          <select
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          >
            {renderOptions(1, 31)}
          </select>
        </div>
        <button className={styles.button} onClick={calculateAge}>
          Check Age
        </button>
        {ageMessage && (
          <div className={styles.result}>
            <p>{ageMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMIAgeCalculator;
