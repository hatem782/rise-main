import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import user_img from "../../../assets/images/examples/user5.svg";

import location_icon from "../../../assets/svgs/location_2.svg";
import { calculateDateDifference } from "../../../functions/Dates";
import { useMutation } from "@tanstack/react-query";
import { GetUserById } from "../../../services/Jobs.serv";

function UserCard({ className, data = { isRead: false }, onClick = () => {} }) {
  const { isRead = false } = data;

  const [user, setUser] = useState(null);

  const GetUserMutatiob = useMutation(GetUserById, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });

  useEffect(() => {
    GetUserMutatiob.mutate(data?.candidates[0].id_condidate);
  }, [data]);

  return (
    <div
      onClick={() => {
        onClick(user);
      }}
      className={`
      ${styles["main"]} ${className} 
      ${!isRead && styles["is-read"]}`}
    >
      <span className={styles["black-dot"]} />
      {/* <div className={styles["name-icon"]}>
        <img src={user_img} alt="" />
      </div> */}

      <div className={styles["name-icon"]}>{user?.sureName[0]}</div>
      <div className={styles["infos"]}>
        <h2 className={styles["title-job"]}>{data?.job_title}</h2>
        <span className={styles["comp-name"]}>
          Talent : {user?.firstName} {user?.sureName}
        </span>
        <span className={styles["places"]}>
          <img src={location_icon} alt="location" />

          <span>
            {user?.city} {user?.country}
          </span>
        </span>
        <span className={styles["time-apply"]}>
          Aplied {calculateDateDifference(data?.candidates[0].createdAt)} days
          ago
        </span>
      </div>
    </div>
  );
}

export default UserCard;
