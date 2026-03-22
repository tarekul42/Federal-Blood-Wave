import React, { useState } from "react";
import styles from "./auth.module.css";
import { api } from "../../db/api";
import { useNavigate } from "react-router";
import Popup from "../popup/popup";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [regData, setRegData] = useState({
    mail: "",
    password: "",
  });
  const navigate = useNavigate();
  const {setAccessToken}=useAuth()

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  
    const [popInfo, setPopInfo] = useState({
      trigger: null,
      type: null,
      message: null,
    });
  

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
        credentials: "include", // set Cookies
        body: JSON.stringify({
          mail,
          password,
        }),
      });

      const data = await response.json();
      setPopInfo({
        trigger: Date.now() as any,
        type: data?.success,
        message: data?.message,
      });

      if (data.success === true) {
        setTimeout(() => {
          navigate("/", {
            replace: true,
          });
          setAccessToken(data?.token)
          location.reload();
        }, 3000);
        
      }
    } catch (error) {
      console.error(error);
      setPopInfo({
        trigger: Date.now() as any,
        type: false as any,
        message: t("auth.login_fail"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.loginAuth}>
      <h2>{t("auth.login_heading")}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          {t("auth.email")} <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="mail"
          placeholder={t("auth.email")}
          onChange={handleChange}
          required
        />

        <label>
          {t("auth.password")} <span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder={t("auth.password")}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? <span className={styles.loader}></span> : t("auth.login_btn")}
        </button>
      </form>
      <Popup popInfo={popInfo} />
    </section>
  );
};

export default Login;
