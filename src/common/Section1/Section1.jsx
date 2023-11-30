import React from "react";
import styles from "./styles.module.scss";

function Section1() {
  return (
    <div className={styles["main"]}>
      <div className={styles["image_bg"]} />
      <div className={styles["filter_bg"]} />
      <div className={styles["content"]} />
    </div>
  );
}

export default Section1;
