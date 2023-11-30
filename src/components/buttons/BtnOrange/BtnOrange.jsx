import React from "react";
import styles from "./styles.module.scss";

// size : large - medium - small
function BtnOrange({
  children,
  onClick = () => {},
  className = "",
  size = "large", //  large - medium -small
  isOutlined = false,
  type = "",
  is_div = false,
  disabled = false,
}) {
  return is_div ? (
    <div
      type={type}
      onClick={disabled ? () => {} : onClick}
      className={`
    ${styles["main"]} 
    ${className} 
    ${styles[size]} 
    ${isOutlined && styles["outlined"]} `}
      disabled={disabled}
    >
      {children}
    </div>
  ) : (
    <button
      type={type}
      onClick={disabled ? () => {} : onClick}
      className={`
      ${styles["main"]} 
      ${className} 
      ${styles[size]} 
      ${isOutlined && styles["outlined"]}
      ${disabled && styles["disabled"]} `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default BtnOrange;
