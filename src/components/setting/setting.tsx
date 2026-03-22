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
  const [phyCon, setPhyCon] = useState<boolean | null>(null);
  const { profData ,token} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [popInfo, setPopInfo] = useState<{
    trigger: number | null;
    type: boolean | null;
    message: string | null;
  }>({
    trigger: null,
    type: null,
    message: null,
  });

  useEffect(() => {
    if (profData) {
      setPhyCon(profData?.isSeak ?? null);
    }
  }, [profData]);
  const handlePhyConUpdate = async (e: React.FormEvent) => {
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
      <h2><span role="img" aria-label="settings">⚙️</span> Settings</h2>

      <div className={styles.settingsGrid}>
        {/* Profile Photo Update */}
        <div className={styles.formCard}>
          <ImageUp />
        </div>

        {/* Info Update */}
        <div className={styles.formCard}>
          <DonorInfuUpdate />
        </div>

        {/* Physical Condition */}
        <div className={styles.formCard}>
          <form onSubmit={handlePhyConUpdate} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3><span role="img" aria-label="health">🏥</span> Physical Condition</h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
              Update your current health status to let others know if you're available for donation.
            </p>
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
                  Healthy & Ready
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
                  Currently Unwell
                </label>
              </div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading || phyCon === profData?.isSeak}
              style={{ marginTop: 'auto' }}
            >
              {isLoading ? <SfLoading /> : "Update Status"}
            </button>
            <Popup popInfo={popInfo} />
          </form>
        </div>

        {/* Password Update */}
        <div className={styles.formCard}>
          <HandlePassUp />
        </div>
      </div>
    </section>
  );
};

export default Settings;
