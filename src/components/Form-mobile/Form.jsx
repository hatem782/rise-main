import React from "react";

import styles from "./styles.module.scss";
import { Form as FomikForm } from "formik";

export const FormMobile = ({ children, className = "", ...others }) => {
  return (
    <form {...others} className={`${styles.form} ${className}`}>
      {children}
    </form>
  );
};

export const W25 = ({ children, className = "" }) => {
  return <div className={`${styles.w25} ${className}`}>{children}</div>;
};

export const W30 = ({ children, className = "" }) => {
  return <div className={`${styles.w03} ${className}`}>{children}</div>;
};

export const W50 = ({ children, className = "" }) => {
  return <div className={`${styles.w05} ${className}`}>{children}</div>;
};

export const W100 = ({ children, className = "" }) => {
  return <div className={`${styles.w1} ${className}`}>{children}</div>;
};
