import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import c0 from "../../../assets/images/home_page/c0.png";
import img3 from "../../../assets/images/home_page/img3.png";
import { NavLink } from "react-router-dom";

function Section3() {
  return (
    <div className={styles["main"]}>
        <div  className={styles["c3"]} >
          <img src={c0} alt="" className={styles['c0']}/>
        </div>
       <div className={styles["Right"]}>
        <img src={img3} alt="" />
      </div>
      <div className={styles["Left"]}>
        <div className={styles["container"]}>
          <h1>Access Africa's untapped talent</h1>
          <p>
            Connect with ambitious, skilled, and passionate entry-level 
            candidates. Rise AI-driven platform ensures that you find the 
            right fit for your organization, saving time and resources.
          </p>
          <div className={styles['btn-or-box']}>
            <BtnOrange size="medium" className={styles["btn"]}>
              <NavLink to="/emp_cre_acc_comp_prof">Partner with Rise</NavLink>
            </BtnOrange>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Section3;
