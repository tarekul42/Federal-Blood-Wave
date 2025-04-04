import React, { useState } from "react";
import styles from "./auth.module.css";
import { bangladeshiDistricts, bdDivision } from "../../db/data";
import { api } from "../../db/api";
import Login from "./login";

const Auth = () => {
  const [isLoginAuth, setIsLoginAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const [regData, setRegData] = useState({
    name: "",
    mail: "",
    phone: "",
    password: "",
    address: "",
    weight: 0,
    height: 0,
    city: "",
    district: "",
    gender: "",
    dob: "",
    lastDonationDate: "",
    bloodGroup: "",
    isSick: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData((prev) => ({
      ...prev,
      [name]: name === "isSick" ? value === "true" : value,
    }));
  };

  const {
    weight,
    height,
    lastDonationDate,
    bloodGroup,
    dob,
    name,
    mail,
    phone,
    password,
    address,
    city,
    district,
    gender,
    isSick,
  } = regData;

  const bmiCalc = height > 0 ? weight / (height * height) : 0;
  const dobDate = new Date(dob);
  const today = new Date();

  const ageInYears = Math.ceil(
    (today - dobDate) / (1000 * 60 * 60 * 24 * 365.25)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log((today - donationDate) / (1000 * 60 * 60 * 24));
    if (bmiCalc > 19 && ageInYears > 17) {
      try {
        const response = await fetch(`${api}/donor/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weight,
            height,
            lastDonationDate,
            dob: dobDate,
            name,
            mail,
            phone,
            password,
            bloodGroup,
            address,
            city,
            district,
            gender,
            isSick,
          }),
        });

        const data = await response.json();
        console.log(data);
        alert("Registration successful!");
      } catch (error) {
        console.error(error);
        setErr("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setErr("Your health is not prepared for blood donation.");
      alert("Your body is not prepared for blood donation.");
      setIsLoading(false);
    }
  };

  return (
    <aside className={styles.auth}>
      {isLoginAuth ? (
        <Login />
      ) : (
        <section className={styles.signUpAuth}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              required
            />

            <label>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="mail"
              placeholder="Email"
              value={mail}
              onChange={handleChange}
              required
            />

            <label>
              Phone <span className={styles.required}>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handleChange}
              required
            />

            <label>
              Password <span className={styles.required}>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={handleChange}
            />

            <label>
              Weight (kg) <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={weight}
              onChange={handleChange}
              step="0.01"
              required
            />

            <label>
              Height (m) <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="height"
              placeholder="Height (m)"
              value={height}
              onChange={handleChange}
              step="0.01"
              required
            />

            <label>
              Blood Group <span className={styles.required}>*</span>
            </label>
            <select
              name="bloodGroup"
              value={bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+ev">A+</option>
              <option value="A-ev">A-</option>
              <option value="B+ev">B+</option>
              <option value="B-ev">B-</option>
              <option value="O+ev">O+</option>
              <option value="O-ev">O-</option>
              <option value="AB+ev">AB+</option>
              <option value="AB-ev">AB-</option>
            </select>

            <label>
              City <span className={styles.required}>*</span>
            </label>
            <select name="city" value={city} onChange={handleChange} required>
              <option value="">Select City</option>
              {bdDivision.map((data) => (
                <option value={data.name} key={data.id}>
                  {data.name}
                </option>
              ))}
            </select>

            <label>
              District <span className={styles.required}>*</span>
            </label>
            <select
              name="district"
              value={district}
              onChange={handleChange}
              required
            >
              <option value="">Select District</option>
              {bangladeshiDistricts.map((data) => (
                <option value={data.name} key={data.id}>
                  {data.name}
                </option>
              ))}
            </select>

            <label>
              Gender <span className={styles.required}>*</span>
            </label>
            <select
              name="gender"
              value={gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label>
              Date of Birth <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
              required
            />

            <label>Last Donation Date</label>
            <input
              type="date"
              name="lastDonationDate"
              value={lastDonationDate}
              onChange={handleChange}
            />

            <label>
              Are you sick right now? <span className={styles.required}>*</span>
            </label>
            <div>
              <input
                type="radio"
                name="isSick"
                value="true"
                onChange={handleChange}
              />{" "}
              Yes
              <input
                type="radio"
                name="isSick"
                value="false"
                onChange={handleChange}
                defaultChecked
              />{" "}
              No
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </section>
      )}

      <section className={styles.controlSec}>
        {isLoginAuth ? (
          <button onClick={() => setIsLoginAuth(false)}>Sign Up</button>
        ) : (
          <button onClick={() => setIsLoginAuth(true)}>Log In</button>
        )}
      </section>
    </aside>
  );
};

export default Auth;
