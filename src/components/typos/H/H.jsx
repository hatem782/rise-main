import React from "react";
import styles from "./styles.module.scss";

export const H1 = ({ children, className = "" }) => {
  return <h1 className={`${styles["h1"]} ${className} `}>{children}</h1>;
};

export const H2 = ({ children, className = "" }) => {
  return <h2 className={`${styles["h2"]} ${className} `}>{children}</h2>;
};
