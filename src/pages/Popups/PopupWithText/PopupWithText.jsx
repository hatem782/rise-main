import React from "react";
import styles from "./styles.module.scss";
import logo from "../../../assets/svgs/logo1.svg";
import Dialog from "../../../components/popup/Popup";

import { GrClose } from "react-icons/gr";

const PopupWithText = (props) => {
  const {
    title = "",
    text = "",
    handleClose,
    with_close = false,
    children = null,
    centered = false,
  } = props;

  return (
    <Dialog {...props}>
      <div className={styles["thank-main"]}>
        {with_close && (
          <GrClose className={styles.icon} onClick={handleClose} />
        )}
        <img
          className={`${styles["logo"]} ${centered ? styles.centered : ""}`}
          src={logo}
          alt=""
        />
        {children}
        <h1 className={styles["title"]}>{title}</h1>
        {text && (
          <p
            className={
              styles[text.split(" ").length > 20 ? "justify" : "center"]
            }
          >
            {text}
          </p>
        )}
      </div>
    </Dialog>
  );
};

export default PopupWithText;
