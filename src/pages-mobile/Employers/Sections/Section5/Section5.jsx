import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../../components/buttons/BtnOrange/BtnOrange";

function Section5() {
  return (
    <div className={styles["main"]}>
      <h2 className={styles["title"]}>Engage candidates directly</h2>
      <p className={styles["description"]}>
        Engage with prospective employees through our integrated messaging
        system. <br />
        Coordinate interviews, provide feedback, and streamline the hiring
        process with ease.
      </p>

      <BtnOrange size="medium-mb" className={styles["btn"]}>
        Start hiring
      </BtnOrange>
    </div>
  );
}

export default Section5;
