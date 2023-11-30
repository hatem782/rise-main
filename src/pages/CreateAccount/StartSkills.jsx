import React from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import { H1, H2 } from "../../components/typos/H/H";

import c1 from "../../assets/images/CA/c1.svg";

import { useNavigate } from "react-router-dom";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";
import { steps } from "./SelectData";

function StartSkills() {
  const navigare = useNavigate();

  const Next = () => {
    navigare("/ca_skills");
  };

  const Back = () => {
    navigare("/education_summary");
  };

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={3} />
      <div className={`${styles["content"]} ${styles["Descetiptive-part"]}`}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={`${styles["h1"]} ${styles.ca_start_skills}`}>
          Next, let’s take care of your skills{" "}
        </H1>
        <H2 className={styles["h2"]}>Here’s what you need to know</H2>
        <p className={styles["p"]}>
          Employers scan skills for relevant keywords.
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

export default StartSkills;
