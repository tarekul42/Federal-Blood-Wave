import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import { useAuth } from "../../context/AuthContext";
import { dhakaThana } from "../../db/data";
import { api } from "../../db/api";
import SfLoading from "../loading/slfLoad";
import Popup from "../popup/popup";

const DonorInfuUpdate = () => {
  const { profData, token } = useAuth();
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
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    thana: "",
  });

  useEffect(() => {
    if (profData) {
      setInfo({
        name: profData.name || "",
        phone: profData.phone || "",
        address: profData.address || "",
        thana: profData?.location?.thana || "",
      });
    }
  }, [profData]);

  const { name, phone, address, thana } = info;

  const handleInfoUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const respons = await fetch(`${api}/donor/update/info`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ name, address, phone, thana }),
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
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

  return (
      <form onSubmit={handleInfoUpdate} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3><span role="img" aria-label="info">📝</span> Personal Information</h3>

        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            placeholder="Enter your full name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            placeholder="Enter your phone number"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            placeholder="Street address, House No."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="thana">Area / Thana</label>
          <select
            id="thana"
            value={thana}
            onChange={(e) => setInfo({ ...info, thana: e.target.value })}
          >
            <option value="" disabled>Select your area</option>
            {dhakaThana?.map((area) => (
              <option value={area?.name} key={area?.id}>
                {area?.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isLoading} style={{ marginTop: 'auto' }}>
          {isLoading ? <SfLoading /> : "Update Profile"}
        </button>
        <Popup popInfo={popInfo} />
      </form>
  );
};

export default DonorInfuUpdate;
