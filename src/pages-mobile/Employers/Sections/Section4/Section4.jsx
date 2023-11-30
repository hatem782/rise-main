import React from "react";
import styles from "./styles.module.scss";

import img2 from "../../../../assets/images/EmployersPage/3.png";

import c from "../../../../assets/images/EmployersPage/circles/c0-mb.svg";
import c3 from "../../../../assets/images/EmployersPage/circles/c3.svg";
//hello
function Section4() {
  return (
    <div className={styles["main"]}>
                  <img src={c} alt="" className={styles["c"]} />

      <div className={styles["Left"]}>
        <img src={img2} alt="" />
      </div>
      <div className={styles["Right"]}>
        <div className={styles["container"]}>
          <h1>Access candidate profiles</h1>
          <p>
            Review detailed candidate profiles, including education, work 
            experience, and assessment results, to make informed hiring 
            decisions. Our platform offers a holistic view of each applicant's
            potential, ensuring you select the right talent for your
            organization.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section4;
