import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../../../components/buttons/BtnOrange/BtnOrange";
import { useSelector } from "react-redux";
import usePopup from "../../../../../hooks/usePupup";
import LoginPopup from "../../../../Popups/LoginPopup/LoginPopup";
import { NavLink } from "react-router-dom";

function Section5() {

  const {isCompany} = useSelector((state) => state.users);
  const [P_login, O_login, C_login] = usePopup();
  return (
    <div className={styles["main"]}>
      <h2 className={styles["title"]}>Engage candidates directly</h2>
      <p className={styles["description"]}>
        Engage with prospective employees through our integrated messaging
        system. <br />
        Coordinate interviews, provide feedback, and streamline the hiring
        process with ease.
      </p>

      {isCompany ? 
      <NavLink to="/overview">
      <BtnOrange className={styles.btn}>
        Join now
      </BtnOrange>
      </NavLink>
      :
      <BtnOrange size="medium" className={styles["btn"]} onClick={O_login}>
        Start hiring
      </BtnOrange>
      }
      <LoginPopup handleClose={C_login} open={P_login} />
    </div>
  );
}

export default Section5;
