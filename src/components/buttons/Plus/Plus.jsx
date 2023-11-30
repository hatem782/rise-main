import React from "react";
import styles from "./styles.module.scss";
import plus_icon from "../../../assets/svgs/plus.svg";
import plus_icon_white from "../../../assets/svgs/plus_white.svg";

// size : large - medium - small
function Plus({
  children,
  onClick = () => {},
  className = "",
  size = "large",
  color = "main", // main - white - black
}) {
  return (
    <div
      onClick={onClick}
      className={`${styles["main"]} ${className} ${styles[size]} `}
    >
      {color === "main" && <img src={plus_icon} alt="" />}
      {color === "white" && <img src={plus_icon_white} alt="" />}
      <span>{children}</span>
    </div>
  );
}

export default Plus;
