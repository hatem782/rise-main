import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import { NavLink } from "react-router-dom";
import LoginPopup from "../../Popups/LoginPopup/LoginPopup";
import { useSelector } from "react-redux";
import usePopup from "../../../hooks/usePupup";

function Section4() {
  const {isCompany} = useSelector((state) => state.users);
  const [P_login, O_login, C_login] = usePopup();
  return (
    <div className={styles["main"]}>
      <h2 className={styles["title"]}>Experience the Rise difference today</h2>
      {isCompany ? 
          <NavLink to="/overview">
          <BtnOrange size="medium" className={styles["btn"]}>
               Get in touch
          </BtnOrange>
          </NavLink>
          :
          <BtnOrange size="medium" className={styles["btn"]} onClick={O_login}>
               Get in touch
          </BtnOrange>
          }
          <LoginPopup handleClose={C_login} open={P_login} />

    </div>
  );
}

export default Section4;
