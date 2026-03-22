import { useState, useCallback } from "react";
import { api } from "../db/api";
import { useTranslation } from "react-i18next";

export const useJoinForm = (onSuccess: () => void) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [popInfo, setPopInfo] = useState({
    trigger: null as number | null,
    type: null as boolean | null,
    message: null as string | null,
  });

  const [regData, setRegData] = useState({
    name: "",
    mail: "",
    phone: "",
    password: "",
    address: "",
    weight: "" as number | string,
    heightFeet: "",
    heightInch: "",
    thana: "",
    gender: "",
    dob: "",
    lastDonationDate: "",
    bloodGroup: "",
    isSick: false,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegData((prev) => ({
      ...prev,
      [name]: name === "isSick" ? value === "true" : value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAccepted(e.target.checked);
  }, []);

  // Complex derived state
  const {
    weight, heightFeet, heightInch,
    lastDonationDate, bloodGroup, dob,
    name, mail, phone, password,
    address, thana, gender, isSick,
  } = regData;

  const heightInMeters = heightFeet && heightInch
    ? parseInt(heightFeet) * 0.3048 + parseInt(heightInch) * 0.0254
    : 0;
  
  const weightNum = typeof weight === 'string' ? parseFloat(weight) : weight;
  const bmiCalc = heightInMeters > 0 && weightNum ? weightNum / (heightInMeters * heightInMeters) : 0;

  const dobDate = new Date(dob);
  const today = new Date();
  const ageInYears = dob ? Math.floor((today.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : 0;

  // Password strength
  const calculateStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };
  const passStrength = calculateStrength(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    if (bmiCalc > 19 && ageInYears >= 18) {
      try {
        const response = await fetch(`${api}/donor/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weight: weightNum,
            height: heightInMeters,
            lastDonationDate: lastDonationDate || null,
            dob: dobDate,
            name,
            mail,
            phone: "+880" + phone,
            password,
            bloodGroup: bloodGroup.replace("ev", ""), // Remove the 'ev' suffix for backend
            address,
            thana, // Keep original casing from data.ts
            gender,
            isSick,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Registration error details:", errorData);
          throw new Error(errorData.message || `Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        setPopInfo({
          trigger: Date.now(),
          type: data?.success,
          message: data?.message,
        });

        if (data?.success) {
          setTimeout(() => {
            onSuccess();
          }, 3000);
        }
      } catch (error) {
        console.error("Submission error:", error);
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          setErr(t("auth.network_error") || "Network error. Please check your connection.");
        } else {
          setErr(t("auth.reg_fail"));
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setPopInfo({
        trigger: Date.now(),
        type: false,
        message: t("auth.body_not_prepared"),
      });
      setIsLoading(false);
    }
  };

  return {
    regData,
    handleChange,
    accepted,
    handleCheckboxChange,
    handleSubmit,
    isLoading,
    err,
    popInfo,
    passStrength,
    password
  };
};
