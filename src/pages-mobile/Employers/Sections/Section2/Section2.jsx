import React from "react";
import styles from "./styles.module.scss";

import img2 from "../../../../assets/images/EmployersPage/1.png";

import c from "../../../../assets/images/EmployersPage/circles/c0-mb.svg";


function Section2() {
  return (
    <div className={styles["main"]}>

      <img src={c} alt="" className={styles["c"]} />

      <div className={styles["Left"]}>
        <img src={img2} alt="" />
      </div>
      <div className={styles["Right"]}>
        <div className={styles["container"]}>
          <h1>
            Post jobs, internships and  <br /> other entry-level opportunities
          </h1>
          <p>
            Reach your target audience with our AI-driven platform that matches
            your job openings with the most suitable candidates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section2;
