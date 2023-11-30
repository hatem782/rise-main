import React from "react";

import styles from "./styles.module.scss";
import { calculateDateDifference } from "../../../functions/Dates";

function UserMail(props) {
  // type : talent / company
  const {
    className,
    data,
    isTalent = false,
    time = new Date(),
    onClick = () => {},
  } = props;

  return (
    <div className={`${styles["main"]} ${className}`} onClick={onClick}>
      <div className={`${styles["user-img"]} ${!isTalent && styles.user_img}`}>
        {isTalent && data?.firstName[0] + data.sureName[0]}
        {!isTalent && <img src={data?.logo_photo} alt="" />}
      </div>
      <div className={styles["user-infos"]}>
        <div className={styles["name-time"]}>
          <span className={styles["name"]}>
            {data?.firstName} {data?.sureName} {data?.name}
          </span>
          <span className={styles["time"]}>
            {calculateDateDifference(time) === 0
              ? "Today"
              : `${calculateDateDifference(time)} days`}
          </span>
        </div>
        <span className={styles["title"]}>JOB TITLE</span>
        <span className={styles["Subject"]}>
          Subject : Invitation to an interview
        </span>
      </div>
    </div>
  );
}

export default UserMail;
