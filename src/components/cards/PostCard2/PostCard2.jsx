import React from "react";
import styles from "./styles.module.scss";

import play_icon from "../../../assets/images/CareerCenter/play.png";

function PostCard2(props) {
  const { data, className } = props;
  const { img = "", title = "", date = "", is_video = false } = data;

  return (
    <div className={` ${styles.main} ${className} }`}>
      <div className={styles["img-container"]}>
        <img src={img} alt={title} />
        {is_video && (
          <img className={styles["play"]} src={play_icon} alt="play" />
        )}
      </div>
      <h3>{title}</h3>
      <span>{date}</span>
    </div>
  );
}

export default PostCard2;
