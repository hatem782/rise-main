import React from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import { H1, H2 } from "../../components/typos/H/H";

import c1 from "../../assets/images/CA/c1.svg";

import { useNavigate } from "react-router-dom";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";
import { steps } from "./SelectData";

function Finishing() {
  const navigare = useNavigate();

  const Finish = () => {
    navigare("/");
  };

  const Back = () => {
    navigare("/verif_data");
  };

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={10} />
      <div className={`${styles["content"]} ${styles["Descetiptive-part"]}`}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>Thank you for registering to rise</H1>
        <p className={styles["p"]}>Click finish to complete your profile.</p>

        <div className={styles["btn-container"]}>
          <BtnOrange
            onClick={Back}
            className={`${styles["btn"]} ${styles["btn-black"]}`}
          >
            Back
          </BtnOrange>
          <BtnOrange onClick={Finish} className={`${styles["btn"]}`}>
            Finish
          </BtnOrange>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default Finishing;
