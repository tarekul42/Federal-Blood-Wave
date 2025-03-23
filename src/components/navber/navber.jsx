import React, { useEffect, useState } from "react";
import styles from "./navber.module.css";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
const Navber = () => {
  const [isNavProf, setIsNavProf] = useState(false);

  const [navRoute, setNavRoute] = useState("");

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.navProf}`)) {
        setIsNavProf(false);
      };
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(()=>{
    const path = window.location.pathname.split("/")[1];
    setNavRoute(path);
  },[])

console.log(navRoute);

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
          <li className={styles.navItem}>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faHouse} />{" "}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to={"/community"}>
              <FontAwesomeIcon icon={faUsers} />{" "}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to={"/auth"}>Login</Link>
          </li>
        </ul>
      </section>

      <section className={styles.navProf}>
        <ul>
          <li className={styles.navItem}>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the global click event
                setIsNavProf((prev) => !prev);
              }}
            >
              <FontAwesomeIcon icon={faUserTie} />
            </button>
          </li>
        </ul>

        {isNavProf && (
          <ul className={styles.navProfItem}>
            <li className={styles.navItem}>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/setting"}>Setting</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={"/about"}>About</Link>
            </li>
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
