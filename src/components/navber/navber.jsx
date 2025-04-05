import React, { useEffect, useState } from "react";
import styles from "./navber.module.css";
import { Link, useLocation, useRoutes } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../App";
import { api } from "../../db/api";

const Navber = () => {
  const [isNavProf, setIsNavProf] = useState(false);
  const location = useLocation();
  const [navRoute, setNavRoute] = useState("");

  const { isAuth } = useAuth();

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
    isAuth || { name: "auth", path: "/auth", label: "Login" },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = () => {
    setIsLoading(true);
    try {
      fetch(`${api}/donor/signOut`, {
        method: "POST",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          alert(res.message);
          // location.
        });
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          {navItems.map((item, index) => (
            <li
              key={`${item.name + index}`}
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
            {[
              isAuth && "profile",
              isAuth && "setting",
              "about",
              "terms",
              "contact",
            ].map((item) => (
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
    </nav>
  );
};

export default Navber;
