import React, { useState } from "react";
import styles from "./settings.module.css";
import SfLoading from "../loading/slfLoad";
import Popup from "../popup/popup";
import { api } from "../../db/api";
import { useAuth } from "../../context/AuthContext";

const HandlePassUp = () => {
  const {token}=useAuth();
  const [passwords, setPasswords] = useState({ currentPass: "", newPass: "" });
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

  const { currentPass, newPass } = passwords;

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const respons = await fetch(`${api}/donor/update/pass`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ currentPass, newPass }),
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
      <form onSubmit={handlePasswordUpdate} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3><span role="img" aria-label="password">🔒</span> Security Settings</h3>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
          Ensure your account stays secure by using a strong, unique password.
        </p>
        
        <div className={styles.formGroup}>
          <label htmlFor="currentPass">Current Password</label>
          <input
            id="currentPass"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setPasswords({ ...passwords, currentPass: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newPass">New Password</label>
          <input
            id="newPass"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isLoading} style={{ marginTop: 'auto' }}>
          {isLoading ? <SfLoading /> : "Update Password"}
        </button>
        <Popup popInfo={popInfo} />
      </form>
  );
};

export default HandlePassUp;
