import { useState, useCallback } from "react";
import { api } from "../db/api";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const useAuthForm = (onSuccess: () => void) => {
  const { t } = useTranslation();
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [popInfo, setPopInfo] = useState({
    trigger: null as number | null,
    type: null as boolean | null,
    message: null as string | null,
  });

  // Combined State
  const [formData, setFormData] = useState({
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
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isSick" ? value === "true" : value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAccepted(e.target.checked);
  }, []);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErr("");
  };

  // Derived Values for validation
  const heightInMeters = formData.heightFeet && formData.heightInch
    ? parseInt(formData.heightFeet) * 0.3048 + parseInt(formData.heightInch) * 0.0254
    : 0;
  
  const weightNum = typeof formData.weight === 'string' ? parseFloat(formData.weight) : formData.weight;
  const bmiCalc = heightInMeters > 0 && weightNum ? weightNum / (heightInMeters * heightInMeters) : 0;

  const dobDate = new Date(formData.dob);
  const today = new Date();
  const ageInYears = formData.dob ? Math.floor((today.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : 0;

  // Password strength
  const calculateStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };
  const passStrength = calculateStrength(formData.password);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${api}/donor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: formData.mail,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });

      if (data?.success) {
        setAccessToken(data?.token);
        setTimeout(() => {
          onSuccess();
          navigate("/", { replace: true });
          location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setErr(t("auth.login_fail"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (bmiCalc <= 19 || ageInYears < 18) {
      setPopInfo({
        trigger: Date.now(),
        type: false,
        message: t("auth.body_not_prepared"),
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${api}/donor/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          weight: weightNum,
          height: heightInMeters,
          bloodGroup: formData.bloodGroup.replace("ev", ""), // Remove the 'ev' suffix for backend
          phone: "+880" + formData.phone,
          lastDonationDate: formData.lastDonationDate || null,
          thana: formData.thana, // Keep original casing
          dob: dobDate,
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
          location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setErr(t("auth.reg_fail"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return {
    formData,
    isLogin,
    toggleMode,
    handleChange,
    accepted,
    handleCheckboxChange,
    handleSubmit,
    isLoading,
    err,
    popInfo,
    passStrength,
    bmiCalc,
    ageInYears
  };
};
