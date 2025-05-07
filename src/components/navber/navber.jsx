import React, { useEffect, useState } from "react";
import styles from "./navber.module.css";
import { Link, useLocation, useNavigate, useRoutes } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHandHoldingHeart,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../App";
import { api } from "../../db/api";
import DonationM from "../DonationM/DonationM";
import Popup from "../popup/popup";

const Navber = () => {
  const [isNavProf, setIsNavProf] = useState(false);
  const [navRoute, setNavRoute] = useState("");

  const { isAuth, token, setAccessToken } = useAuth();
  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Update active route
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setNavRoute(path || "home");
  }, [location.pathname]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.navProf}`)) {
        setIsNavProf(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Navigation items list
  const navItems = [
    { name: "home", path: "/", icon: faHouse },
    isAuth
      ? { name: "community", path: "/community", icon: faUsers }
      : { name: "auth", path: "/auth", label: "Join US" },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      const resposne = await fetch(`${api}/donor/signOut`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await resposne.json();
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });
      if (data?.success) {
        navigate("/", {
          replace: true,
        });
        setAccessToken("");
        window.location.reload();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  /* donation modal--> */
  const [isDModal, setIsDModal] = useState(false);

  return (
    <nav className={styles.navber}>
      {/* Donation navigation element---> */}

      <aside className={styles.navOneDonate}>
        <div className={styles.topBar}>
          <p className={styles.message}>
            আপনার একটি দান আমাদের কার্যক্রমকে এগিয়ে নিতে সহায়তা করবে
          </p>
          <button
            className={styles.donateBtn}
            onClick={() => setIsDModal(true)}
          >
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              className={styles.icon}
            />
            Donate Us
          </button>
        </div>
      </aside>

      {/* All navigation elements---> */}
      <aside className={styles.navTwoNavigation}>
        <section className={styles.navLogo}>
          <h1>
            <span>F</span>
            <span>B</span>W
          </h1>
        </section>

        <section className={styles.navItems}>
          <ul>
            {navItems.map((item, index) => (
              <li
                key={`${item?.name + index}`}
                className={`${styles.navItem} ${
                  navRoute === item?.name ? styles.active : ""
                }`}
              >
                <Link to={item?.path}>
                  {item?.icon ? (
                    <FontAwesomeIcon icon={item?.icon} />
                  ) : (
                    item?.label
                  )}
                </Link>
              </li>
            ))}

            <div
              className={styles.activeIndicator}
              style={{
                left: `calc(${
                  navItems.findIndex((item) => item?.name === navRoute) * 100
                }% + 10px)`,
              }}
            />
          </ul>
        </section>

        <section className={styles.navProf}>
          <ul>
            <li className={styles.navItem}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNavProf((prev) => !prev);
                }}
              >
                <FontAwesomeIcon icon={faGear} />
              </button>
            </li>
          </ul>

          {isNavProf && (
            <ul className={styles.navProfItem}>
              {isAuth && (
                <>
                  <li
                    className={`${styles.navItem} ${
                      navRoute === "profile" ? styles.active : ""
                    }`}
                  >
                    <Link to={"/profile"}>Profile</Link>
                  </li>
                  <li
                    className={`${styles.navItem} ${
                      navRoute === "setting" ? styles.active : ""
                    }`}
                  >
                    <Link to={"/setting"}>Setting</Link>
                  </li>
                </>
              )}
              <li
                className={`${styles.navItem} ${
                  navRoute === "about" ? styles.active : ""
                }`}
              >
                <Link to={"/about"}>AboutUS</Link>
              </li>
              <li
                className={`${styles.navItem} ${
                  navRoute === "terms" ? styles.active : ""
                }`}
              >
                <Link to={"/terms"}>Terms</Link>
              </li>
              <li
                className={`${styles.navItem} ${
                  navRoute === "contact" ? styles.active : ""
                }`}
              >
                <Link to={"/contact"}>CONTACT</Link>
              </li>
              <li>
                {isAuth && (
                  <button onClick={handleLogOut} disabled={isLoading}>
                    {isLoading ? (
                      <span className={styles.loader}></span>
                    ) : (
                      "LOGOUT"
                    )}
                  </button>
                )}
              </li>
            </ul>
          )}
        </section>
      </aside>
      <DonationM open={isDModal} setOpen={setIsDModal} />
      <Popup popInfo={popInfo}/>
    </nav>
  );
};

export default Navber;
