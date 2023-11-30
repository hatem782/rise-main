import React from "react";
import styles from "./styles.module.scss";

import logo from "../../../assets/svgs/logo1.svg";
import user_icon from "../../../assets/svgs/navbar/user.svg";

function StepperNav({
  steps = ["step1", "step2", "step3", "step4", "step5", "step6"],
  current = 0,
}) {
  return (
    <div className={styles["main"]}>
      <div className={styles["navbar"]}>
        <img className={styles["logo"]} src={logo} alt="" />
        <div className={styles["steps"]}>
          {steps.map((step, key) => {
            return (
              <div
                key={key}
                className={`
                ${styles["step"]} 
                ${key === current ? styles["current"] : ""}
                ${key < current ? styles["done"] : ""}
                `}
              >
                <span className={styles["number"]}>{key + 1}</span>
                <span className={styles["name"]}>{step}</span>
                {key !== steps.length - 1 && (
                  <span className={styles["divider"]} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StepperNav;
