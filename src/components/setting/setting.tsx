// Settings.jsx
import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import DonorInfuUpdate from "./donorPInfoUp";
import HandlePassUp from "./handlePassUP";
import ImageUp from "./imageUp";
import { useAuth } from "../../context/AuthContext";
import SfLoading from "../loading/slfLoad";
import Popup from "../popup/popup";
import { api } from "../../db/api";

const Settings = () => {
  const [phyCon, setPhyCon] = useState(null);
  const { profData ,token} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  useEffect(() => {
    if (profData) {
      setPhyCon(profData?.isSeak);
    }
  }, [profData]);
  const handlePhyConUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const respons = await fetch(`${api}/donor/update/phyCon`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ isSeak: phyCon }),
      });

      const data = await respons.json();

      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });

      if (data?.success === true) {
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setPopInfo({
        trigger: Date.now(),
        type: false,
        message: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.settingsPage}>
      <h2>⚙️ Settings</h2>

      {/* Profile Photo Update */}

      <ImageUp />

      {/* Info Update */}
      <DonorInfuUpdate />

      {/* Physical Condition */}
      <form onSubmit={handlePhyConUpdate} className={styles.formCard}>
        <h3>🏥 Physical Condition</h3>
        {phyCon !== null && (
          <div className={styles.segmentWrapper}>
            <label
              className={`${styles.segment} ${!phyCon ? styles.active : ""}`}
            >
              <input
                type="radio"
                name="health"
                checked={!phyCon}
                onChange={() => setPhyCon(false)}
              />
              I am good now.
            </label>

            <label
              className={`${styles.segment} ${phyCon ? styles.active : ""}`}
            >
              <input
                type="radio"
                name="health"
                checked={phyCon}
                onChange={() => setPhyCon(true)}
              />
              I'm sick right now
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || phyCon === profData?.isSeak}
        >
          {isLoading ? <SfLoading /> : "Update Physical Condition"}
        </button>
        <Popup popInfo={popInfo} />
      </form>

      {/* Password Update */}
      <HandlePassUp />
    </section>
  );
};

export default Settings;
