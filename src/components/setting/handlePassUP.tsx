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
  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  const { currentPass, newPass } = passwords;

  const handlePasswordUpdate = async (e) => {
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
    <section>
      <form onSubmit={handlePasswordUpdate} className={styles.formCard}>
        <h3>🔒 Update Password</h3>
        <div>
          <input
            type="password"
            placeholder="Current Password"
            onChange={(e) =>
              setPasswords({ ...passwords, currentPass: e.target.value })
            }
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <SfLoading /> : "Update Password"}
        </button>
      </form>

      <Popup popInfo={popInfo} />
    </section>
  );
};

export default HandlePassUp;
