import React from "react";
import styles from "./styles.module.scss";
import phone_img from "../../../assets/images/home_page/phone.png";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import usePopup from "../../../hooks/usePupup";
import LoginPopup from "../../Popups/LoginPopup/LoginPopup"; 
function Section4() {

  const {isCompany} = useSelector((state) => state.users);
  const [P_login, O_login, C_login] = usePopup();

  return (
    <div className={styles["main"]}>
      <div className={styles["Left"]}>
        <img src={phone_img} alt="" />
      </div>
      <div className={styles["Right"]}>
        <div className={styles["container"]}>
          <p>
            Rise offers personalized skill development resources and assessments
            <br />
            to help you identify your strengths, address skill gaps, and improve
            <br />
            your chances of landing your dream job.
          </p>
          {isCompany ? 
          <NavLink to="/overview">
          <BtnOrange size="medium" className={styles["btn"]}>
            Get started !
          </BtnOrange>
          </NavLink>
          :
          <BtnOrange size="medium" className={styles["btn"]} onClick={O_login}>
            Get started !
          </BtnOrange>
          }
          <LoginPopup handleClose={C_login} open={P_login} /> 
        </div>
      </div>
    </div>
  );
}

export default Section4;

 