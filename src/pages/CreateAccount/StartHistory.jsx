import React from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import { H1, H2 } from "../../components/typos/H/H";

import c1 from "../../assets/images/CA/c1.svg";

import { useNavigate } from "react-router-dom";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";
import { steps } from "./SelectData";

function StartHistory() {
  const navigare = useNavigate();

  const Next = () => {
    navigare("/ca_work_history");
  };

  const Back = () => {
    navigare("/ca_profile");
  };

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={1} />
      <div className={`${styles["content"]} ${styles["Descetiptive-part"]}`}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>Now, lets fill out your work history</H1>
        <H2 className={styles["h2"]}>Some helpful hints :</H2>
        <p className={styles["p"]}>
          Employers scan your resume to see if you are a match. <br />
          We suggest bullet points that make a great impression.
        </p>

        <div className={styles["btn-container"]}>
          <BtnOrange
            onClick={Back}
            className={`${styles["btn"]} ${styles["btn-black"]}`}
          >
            Back
          </BtnOrange>
          <BtnOrange onClick={Next} className={`${styles["btn"]}`}>
            Next
          </BtnOrange>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default StartHistory;
