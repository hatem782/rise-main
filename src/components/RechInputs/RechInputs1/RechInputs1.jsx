import React from "react";
import styles from "./styles.module.scss";

import loop_icon from "../../../assets/svgs/loops/loop1.svg";

function RechInputs1({ placeholder = "", className = "" }) {
  return (
    <div className={`${styles["main"]} ${className}`}>
      <img src={loop_icon} alt="" />
      <input placeholder={placeholder} type="text" />
    </div>
  );
}

export default RechInputs1;
