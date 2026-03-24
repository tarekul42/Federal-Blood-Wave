import React, { useEffect, useState } from "react";
import styles from "./dModal.module.css";
import { api } from "../../../db/api";
import Loading from "../../loading/loading";
import { useTranslation } from "react-i18next";

const DonorModal = ({ open, setOpen, donorId, setDonorId }) => {
  const { t } = useTranslation();
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
          {data?.donationStatus === "active" 
            ? `🟢 ${t("donor_modal.available")}` 
            : `🟡 ${t("donor_modal.unavailable")}`}
        </p>
        <img src={data?.profile?.img || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + data?.name} alt={data?.name} className={styles.img} />
        <h2>{data?.name}</h2>
        <p>
          <strong>{t("donor_modal.blood_group")}:</strong> {data?.bloodGroup}
        </p>
        <p>
          <strong>{t("donor_modal.gender")}:</strong> {data?.gender}
        </p>
        <p>
          <strong>{t("donor_modal.phone")}:</strong> {data?.phone || "N/A"}
        </p>
        <p>
          <strong>{t("donor_modal.address")}:</strong> {data?.address}
        </p>
        <p>
          <strong>{t("donor_modal.last_donation")}:</strong>{" "}
          {data?.lastDonationDate ? new Date(data?.lastDonationDate).toLocaleDateString() : "N/A"}
        </p>
        <p>
          <strong>{t("donor_modal.health_condition")}:</strong> {data?.isSeak ? t("donor_modal.sick") : t("donor_modal.good")}
        </p>
      </div>
    </div>
  );
};

export default DonorModal;
