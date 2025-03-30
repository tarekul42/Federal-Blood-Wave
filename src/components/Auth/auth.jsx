import React, { useState } from "react";
import styles from "./auth.module.css";
import { bangladeshiDistricts, bdDivision } from "../../db/data";
import { api } from "../../db/api";

const Auth = () => {
  const [isLoginAuth, setIsLoginAuth] = useState(true);

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
    isSick: false,
  });

  const {
    weight,
    height,
    lastDonationDate,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData((prev) => ({ ...prev, [name]: value }));
  };

  const bmiCalc = weight / height ** 2;
  const dobDate = new Date(dob);
  const donationDate = new Date(lastDonationDate);
  const today = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = today - dobDate;

  // Convert milliseconds to days
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  const dayToYear = Math.ceil(diffInDays / 365.25);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bmiCalc > 19 && dayToYear > 17) {
      fetch(`${api}/donor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weight,
          height,
          lastDonationDate: donationDate,
          dob: dobDate,
          name,
          mail,
          phone,
          password,
          address,
          city,
          district,
          gender,
          isSick,
        }),
      }).then((res)=>res.json())
      .then((res)=>{

      });
    } else {
      setErr("Your health is not prepare for Blood dontaion. ");
      alert("Your Body is not prepare for Blood dontaion. ");
    }
  };

  return (
    <aside className={styles.auth}>
      {isLoginAuth ? (
        <section className={styles.loginAuth}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="mail"
              placeholder="Email"
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
              onChange={handleChange}
              required
            />

            <button type="submit">Log In</button>
          </form>
        </section>
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
              onChange={handleChange}
              required
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />

            <label>
              Weight (kg) <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
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
              onChange={handleChange}
              step="0.01"
              required
            />

            <label>
              City <span className={styles.required}>*</span>
            </label>
            <select name="city" onChange={handleChange} required>
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
            <select name="district" onChange={handleChange} required>
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
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label>
              Date of Birth <span className={styles.required}>*</span>
            </label>
            <input type="date" name="dob" onChange={handleChange} required />

            <label>Last Donation Date</label>
            <input
              type="date"
              name="lastDonationDate"
              onChange={handleChange}
            />

            <label>
              Are you sick right now? <span className={styles.required}>*</span>
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="isSick"
                  value={true}
                  onChange={handleChange}
                  className={styles.inpRadio}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isSick"
                  value={false}
                  onChange={handleChange}
                  className={styles.inpRadio}
                  defaultChecked
                />{" "}
                No
              </label>
            </div>

            <button type="submit">Register</button>
          </form>
        </section>
      )}

      <section className={styles.controlSec}>
        {isLoginAuth ? (
          <>
            <p>Don't have an account?</p>
            <button onClick={() => setIsLoginAuth(false)}>Sign Up</button>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <button onClick={() => setIsLoginAuth(true)}>Log In</button>
          </>
        )}
      </section>
    </aside>
  );
};

export default Auth;
