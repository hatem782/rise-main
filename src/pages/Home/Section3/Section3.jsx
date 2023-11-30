import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import c3 from "../../../assets/images/home_page/c3.png";
import img3 from "../../../assets/images/home_page/img3.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Section3() {

  const {isCompany} = useSelector((state) => state.users);
  
  return (
    <div className={styles["main"]}>
      <div className={styles["Left"]}>
        <div className={styles["container"]}>
          <img src={c3} alt="" className={styles["c3"]} />
          <h1>Access Africa's untapped talent</h1>
          <p>
            Connect with ambitious, skilled, and passionate entry-level <br />
            candidates. Rise AI-driven platform ensures that you find the <br />
            right fit for your organization, saving time and resources.
          </p>
          <NavLink to={isCompany ? "overview" :"/emp_cre_acc_comp_prof"}>
            <BtnOrange size="medium" className={styles["btn"]}>
              Partner with Rise
            </BtnOrange>
          </NavLink>
        </div>
      </div>
      <div className={styles["Right"]}>
        <img src={img3} alt="" />
      </div>
    </div>
  );
}

export default Section3;
