import React, { useState } from "react";
import styles from "./auth.module.css";
import { bangladeshiDistricts, bdDivision } from "../../db/data";

const Auth = () => {
  const [isLoginAuth, setIsLoginAuth] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    weight: "",
    height: "",
    city: "",
    district: "",
    gender: "",
    dob: "",
    lastDonationDate: "",
    isSick: "no",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    // Fetch API call can be placed here
  };

  return (
    <aside className={styles.auth}>
      {isLoginAuth ? (
        <section className={styles.loginAuth}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <label>Password</label>
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
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <label>Password</label>
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
              required
            />

            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              onChange={handleChange}
              required
            />

            <label>Height (m)</label>
            <input
              type="number"
              name="height"
              placeholder="Height (m)"
              onChange={handleChange}
              step="0.01" // Allows two decimal points (e.g., 1.75)
              required
            />

            <label>City</label>
            <select name="city" onChange={handleChange} required>
              <option value="">Select City</option>
              {bdDivision.map((data) => (
                <option value={data.name} key={data.id}>
                  {data.name}
                </option>
              ))}
            </select>

            <label>District</label>
            <select name="district" onChange={handleChange} required>
              <option value="">Select District</option>
              {bangladeshiDistricts.map((data) => (
                <option value={data.name} key={data.id}>
                  {data.name}
                </option>
              ))}
            </select>

            <label>Gender</label>
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label>Date of Birth</label>
            <input type="date" name="dob" onChange={handleChange} required />

            <label>Last Donation Date</label>
            <input
              type="date"
              name="lastDonationDate"
              onChange={handleChange}
            />

            <label>Are you sick right now?</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="isSick"
                  value="yes"
                  onChange={handleChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isSick"
                  value="no"
                  onChange={handleChange}
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
