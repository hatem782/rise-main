import React from "react";
import styles from "./styles.module.scss";

import img2 from "../../../../assets/images/EmployersPage/2.png";

import c from "../../../../assets/images/EmployersPage/circles/c.svg";
import c1 from "../../../../assets/images/EmployersPage/circles/c1.svg";
import c2 from "../../../../assets/images/EmployersPage/circles/c2.svg";

function Section3() {
  return (
    <div className={styles["main"]}>
            <img src={c} alt="" className={styles["c"]} />

      <div className={styles["Left"]}>
        <img src={img2} alt="" />
      </div>
      <div className={styles["Right"]}>
        <div className={styles["container"]}>
      
          <h1>Identify potential</h1>
          <p>
            Discover exceptional young talents and brilliant prospects 
            based on aptitude, cognitive and behavioral traits integrated 
            assessments candidates pass while joining the platform.
          </p>
        </div>
      </div>
   
    </div>
  );
}

export default Section3;
/**    <img src={c} alt="" className={styles["c1"]} />
          <img src={c} alt="" className={styles["c2"]} /> */