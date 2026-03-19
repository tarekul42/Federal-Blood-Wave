import React, { useEffect, useState } from "react";
import styles from "./dModal.module.css";
import { api } from "../../../db/api";
import Loading from "../../loading/loading";

const DonorModal = ({ open, setOpen, donorId, setDonorId }) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState(null);

  const fetchDonor = async (dId) => {
    setIsloading(true);
    try {
      const res = await fetch(`${api}/donor/details/${dId}`);
      const getData = await res.json();
      setData(getData?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (donorId && open) fetchDonor(donorId);
  }, [donorId, open]);

  if (isLoading ) return <Loading />;
  const handleClose = () => {
    setOpen(false);
    setDonorId("");
  };
  return (
    <div
      className={styles.modal}
      style={{ display: open ? "flex" : "none" }}
      onClick={handleClose}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose}>
          ❌
        </button>

        <p
          className={`${styles.status} ${
            data?.donationStatus === "active" ? styles.active : styles.inactive
          }`}
        >
          {data?.donationStatus === "active" ? "🟢 Available" : "🟡 Unavailable"}
        </p>
        <img src={data?.profile?.img} alt={data?.name} className={styles.img} />
        <h2>{data?.name}</h2>
        <p>
          <strong>Blood Group:</strong> {data?.bloodGroup}
        </p>
        <p>
          <strong>Gender:</strong> {data?.gender}
        </p>
        <p>
          <strong>Phone:</strong> {data?.phone || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {data?.address}
        </p>
        <p>
          <strong>Last Donation:</strong>{" "}
          {new Date(data?.lastDonationDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Health Condition:</strong> {data?.isSeak ? "Seak" : "Good"}
        </p>
      </div>
    </div>
  );
};

export default DonorModal;
