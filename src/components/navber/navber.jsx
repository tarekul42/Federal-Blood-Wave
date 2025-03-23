import React, { useEffect, useState } from "react";
import styles from "./navber.module.css";
import { Link, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";

const Navber = () => {
  const [isNavProf, setIsNavProf] = useState(false);
  const location = useLocation();
  const [navRoute, setNavRoute] = useState("");

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
    { name: "community", path: "/community", icon: faUsers },
    { name: "auth", path: "/auth", label: "Login" },
  ];

  return (
    <nav className={styles.navber}>
      <section className={styles.navLogo}>
        <h1>
          <span>F</span>
          <span>B</span>W
        </h1>
      </section>

      <section className={styles.navItems}>
        <ul>
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`${styles.navItem} ${
                navRoute === item.name ? styles.active : ""
              }`}
            >
              <Link to={item.path}>
                {item.icon ? <FontAwesomeIcon icon={item.icon} /> : item.label}
              </Link>
            </li>
          ))}
          <div
            className={styles.activeIndicator}
            style={{
              left: `calc(${
                navItems.findIndex((item) => item.name === navRoute) * 100
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
              <FontAwesomeIcon icon={faUserTie} />
            </button>
          </li>
        </ul>

        {isNavProf && (
          <ul className={styles.navProfItem}>
            {["profile", "setting", "about"].map((item) => (
              <li
                key={item}
                className={`${styles.navItem} ${
                  navRoute === item ? styles.active : ""
                }`}
              >
                <Link to={`/${item}`}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
            <li>
              <button>LogOut</button>
            </li>
          </ul>
        )}
      </section>
    </nav>
  );
};

export default Navber;
