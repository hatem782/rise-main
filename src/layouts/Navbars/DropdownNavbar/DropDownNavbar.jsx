import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import logo from "../../../assets/svgs/logo1.svg";
import user_icon from "../../../assets/svgs/navbar/user.svg";

import usePopup from "../../../hooks/usePupup";
import LoginPopup from "../../../pages/Popups/LoginPopup/LoginPopup";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function DefaultNavbar() {
  const [P_login, O_login, C_login] = usePopup();
  const { isCompany, isTalent } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const location = useLocation();

  const handle_click = () => {
    if (isCompany) {
      navigate("/overview");
      return;
    }

    if (isTalent) {
      navigate("/user_dashboard");
      return;
    }

    O_login();
  };

  const [current, setCurrent] = useState("");

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={styles["main"]}>
      <div className={styles["navbar"]}>
        <NavLink to="/">
          <img className={styles["logo"]} src={logo} alt="" />
        </NavLink>
        <div className={styles["links"]}>
          <span
            className={`
            ${styles["link"]} 
            ${current === "/talent" ? styles["current"] : ""}`}
          >
            <NavLink to="/talent">Jobseekers</NavLink>
          </span>

          <span>|</span>

          <span
            className={`
            ${styles["link"]} 
            ${current === "/employers" ? styles["current"] : ""}`}
          >
            <NavLink to="/employers">Employers & Recruiters</NavLink>
          </span>

          <span>|</span>

          <span
            className={`
            ${styles["link"]} 
            ${styles["current"] && current === ""}`}
          >
            Jobs & Internships
          </span>

          <span>|</span>

          <span
            className={`
            ${styles["link"]} 
            ${current === "/career_center" ? styles["current"] : ""}`}
          >
            <NavLink to="/career_center">Career Center</NavLink>
          </span>

          <span>|</span>

          <span className={styles["link"]} onClick={handle_click}>
            <img src={user_icon} alt="" /> Account
          </span>
        </div>
      </div>

      {P_login && <LoginPopup handleClose={C_login} open={P_login} />}
    </div>
  );
}

export default DefaultNavbar;
