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
  const [popInfo, setPopInfo] = useState({
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

  const handleInfoUpdate = async (e) => {
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
    <section>
      <form onSubmit={handleInfoUpdate} className={styles.formCard}>
        <h3>📝 Update Info</h3>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            placeholder="Full Name"
          />
        </div>

        <div>
          <label htmlFor="phone">Call:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            placeholder="Phone Number"
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            placeholder="Your Address"
          />
        </div>

        <div>
          <label htmlFor="thana">Your Area:</label>
          <select
            value={thana}
            onChange={(e) => setInfo({ ...info, thana: e.target.value })}
          >
            <option value={thana}>{thana}</option>
            {dhakaThana?.map((area) => (
              <option value={area?.name} key={area?.id}>
                {area?.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? <SfLoading /> : "Update Info"}
        </button>
      </form>
      <Popup popInfo={popInfo} />
    </section>
  );
};

export default DonorInfuUpdate;
