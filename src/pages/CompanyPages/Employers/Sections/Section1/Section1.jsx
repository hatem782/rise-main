import React from "react";
import styles from "./styles.module.scss";

import img from "../../../../../assets/images/employee/head.jpg";

import Button from "../../../../../components/buttons/BtnOrange/BtnOrange";
import { useSelector } from "react-redux";
import usePopup from "../../../../../hooks/usePupup";
import { NavLink } from "react-router-dom";
import LoginPopup from "../../../../Popups/LoginPopup/LoginPopup";

function Section1() {

  const {isCompany} = useSelector((state) => state.users);
  const [P_login, O_login, C_login] = usePopup();

  return (
    <div className={styles["main"]}>
      <img src={img} alt="" />
      <div className={styles.content}>
        <h1>
          Discover top <br /> entry-level talent <br /> with ease
        </h1>
        <p>
          Partner with Rise to access a pool of the best <br /> young prospects
          the market has to offer.
        </p>
        {isCompany ? 
        <NavLink to="/overview">
         <Button className={styles.btn}>Start hiring </Button>
        </NavLink>
        :

        <Button className={styles.btn}  onClick={O_login}>Start hiring </Button>
        }
        <LoginPopup handleClose={C_login} open={P_login} />
      </div>
    </div>
  );
}

export default Section1;
