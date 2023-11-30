import React from "react";
import styles from "./styles.module.scss";

function TitleUnderLined({ children }) {
  return <div className={styles["main"]}>{children}</div>;
}

export default TitleUnderLined;
