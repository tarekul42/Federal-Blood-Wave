import React, { useEffect, useState } from "react";
import styles from "./auth.module.css";
import { api } from "../../db/api";
import Login from "./login";
import { dhakaThana } from "../../db/data";
import Popup from "../popup/popup";
import SfLoading from "../loading/slfLoad";
import JoinRules from "./joinRulesModal/JoinRules";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
  const [isLoginAuth, setIsLoginAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  const [regData, setRegData] = useState({
    name: "",
    mail: "",
    phone: "",
    password: "",
    address: "",
    weight: 0,
    heightFeet: "",
    heightInch: "",
    thana: "",
    gender: "",
    dob: "",
    lastDonationDate: "",
    bloodGroup: "",
    isSick: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData((prev) => ({
      ...prev,
      [name]: name === "isSick" ? value === "true" : value,
    }));
  };

  const {
    weight,
    heightFeet,
    heightInch,
    lastDonationDate,
    bloodGroup,
    dob,
    name,
    mail,
    phone,
    password,
    address,
    thana,
    gender,
    isSick,
  } = regData;

  /*BMI Calculator--> */
  const heightInMeters =
    heightFeet && heightInch
      ? parseInt(heightFeet) * 0.3048 + parseInt(heightInch) * 0.0254
      : 0;
  const bmiCalc =
    heightInMeters > 0 ? weight / (heightInMeters * heightInMeters) : 0;

  /*AGE Calculator--> */
  const dobDate = new Date(dob);
  const today = new Date();
  const ageInYears = Math.floor(
    (today - dobDate) / (1000 * 60 * 60 * 24 * 365.25)
  );

  /**Join Rules Open fucnction--> */
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  useEffect(() => {
    if (!isLoginAuth) {
      setIsJoinOpen(true);
    }
  }, [isLoginAuth]);

  /**Accept Terms---> */
  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = (e) => {
    setAccepted(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    if (bmiCalc > 19 && ageInYears > 17) {
      try {
        const response = await fetch(`${api}/donor/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            weight,
            height: heightInMeters,
            lastDonationDate,
            dob: dobDate,
            name,
            mail,
            phone: "+880" + phone,
            password,
            bloodGroup,
            address,
            thana: thana.toLowerCase(),
            gender,
            isSick,
          }),
        });

        const data = await response.json();
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
        console.error(error);
        setErr("Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setPopInfo({
        trigger: Date.now(),
        type: false,
        message: "Your body is not prepared for blood donation.",
      });
      setIsLoading(false);
    }
  };

  return (
    <aside className={styles.auth}>
      {isLoginAuth ? (
        <Login />
      ) : (
        <section className={styles.signUpAuth}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              required
            />

            <label>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="mail"
              placeholder="Email"
              value={mail}
              onChange={handleChange}
              required
            />

            <label>
              Phone <span className={styles.required}>*</span>
            </label>
            <div className={styles.telePhon}>
              <input type="text" value={"+880"} readOnly />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={handleChange}
                required
              />
            </div>

            <label>
              Password <span className={styles.required}>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={handleChange}
            />

            <label>
              Weight (kg) <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={weight}
              onChange={handleChange}
              step="0.01"
              required
            />

            <label>
              Height <span className={styles.required}>*</span>
            </label>
            <div className={styles.selectGroup}>
              <select
                name="heightFeet"
                value={heightFeet}
                onChange={handleChange}
                required
              >
                <option value="">Feet</option>
                {[...Array(17)].map((_, i) => (
                  <option key={i + 4} value={i + 4}>
                    {i + 4} ft
                  </option>
                ))}
              </select>
              <br />
              <select
                name="heightInch"
                value={heightInch}
                onChange={handleChange}
                required
              >
                <option value="">Inch</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} in
                  </option>
                ))}
              </select>
            </div>

            <label>
              Blood Group <span className={styles.required}>*</span>
            </label>
            <select
              name="bloodGroup"
              value={bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+ev">A+</option>
              <option value="A-ev">A-</option>
              <option value="B+ev">B+</option>
              <option value="B-ev">B-</option>
              <option value="O+ev">O+</option>
              <option value="O-ev">O-</option>
              <option value="AB+ev">AB+</option>
              <option value="AB-ev">AB-</option>
            </select>

            <label>
              Area in Dhaka city <span className={styles.required}>*</span>
            </label>
            <select name="thana" value={thana} onChange={handleChange} required>
              <option value="">Select Your Area</option>
              {dhakaThana.map((data) => (
                <option value={data.name} key={data.id}>
                  {data.name}
                </option>
              ))}
            </select>

            <label>
              Gender <span className={styles.required}>*</span>
            </label>
            <select
              name="gender"
              value={gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label>
              Date of Birth <span className={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
              required
            />

            <label>Last Donation Date</label>
            <input
              type="date"
              name="lastDonationDate"
              value={lastDonationDate}
              onChange={handleChange}
            />

            <label>
              Are you sick right now? <span className={styles.required}>*</span>
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="isSick"
                  value="true"
                  checked={isSick === true}
                  onChange={handleChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isSick"
                  value="false"
                  checked={isSick === false}
                  onChange={handleChange}
                />{" "}
                No
              </label>
            </div>

            <div className={styles.termsLabel}>
              <input
                type="checkbox"
                name="termsAcc"
                id="termsAcc"
                checked={accepted}
                onChange={handleCheckboxChange}
              />
              <p>
                By Accepting Our Terms & Conditions{" "}
                <Link to={"/terms"} style={{ color: "blueviolet" }}>
                  Trems <FontAwesomeIcon icon={faArrowRight}/>
                </Link>{" "}
              </p>
            </div>

            {err && <p className={styles.error}>{err}</p>}

            <button type="submit" disabled={isLoading || !accepted}>
              {isLoading ? <SfLoading /> : "Register"}
            </button>
          </form>
        </section>
      )}

      <section className={styles.controlSec}>
        {isLoginAuth ? (
          <>
            <p>Don't have any account </p>
            <button onClick={() => setIsLoginAuth(false)}>
              Join As A Donor
            </button>
          </>
        ) : (
          <>
            <p>Already Have An Account</p>
            <button onClick={() => setIsLoginAuth(true)}>Log In</button>
          </>
        )}
      </section>
      <Popup popInfo={popInfo} />
      <JoinRules open={isJoinOpen} setOpen={setIsJoinOpen} />
    </aside>
  );
};

export default Auth;
