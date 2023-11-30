import React from "react";
import styles from "./styles.module.scss";
import phone_img from "../../../assets/images/home_page/mob_phone.png";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import { NavLink } from "react-router-dom";

function Section4() {
  return (
    <div className={styles["main"]}>
      <div className={styles["Left"]}>
        <img src={phone_img} alt="" />
      </div>
      <div className={styles["Right"]}>
        <div className={styles["container"]}>
          <p>
            Rise offers personalized skill development resources and assessments
            
            to help you identify your strengths, address skill gaps, and improve
            
            your chances of landing your dream job.
          </p>
          <div className={styles['btn-or-box']}>
          <BtnOrange size="medium" className={styles["btn"]}>
            <NavLink to="/ca_profile">Get started !</NavLink>
          </BtnOrange>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section4;
