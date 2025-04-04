import React, { useState } from "react";
import styles from "./auth.module.css";
import { api } from "../../db/api";

const Login = () => {
  const [regData, setRegData] = useState({
    mail: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData((prev) => ({ ...prev, [name]: value }));
  };

  const { mail, password } = regData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
  
    try {
      const response = await fetch(`${api}/donor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important for cookies
        body: JSON.stringify({
          mail,
          password,
        }),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      setErr("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? <span className={styles.loader}></span> : "LOGIN"}
        </button>
      </form>

    </section>
  );
};

export default Login;
