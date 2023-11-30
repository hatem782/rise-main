import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

function Section4() {
  return (
    <div className={styles["main"]}>
      <h2 className={styles["title"]}>Experience the Rise difference today</h2>

      <BtnOrange size="medium-mb" className={styles["btn"]}>
        Get in touch
      </BtnOrange>
    </div>
  );
}

export default Section4;
