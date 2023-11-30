import React from "react";
import styles from "./styles.module.scss";

import location_icon from "../../../assets/svgs/location_2.svg";
import { useDispatch } from "react-redux";
import { setOneJob } from "../../../redux/Jobjs.reducer";

function JobCard({
  className = "",
  data,
  dispatcher = false,
  selected = false,
}) {
  const { company_id: company } = data;

  const dispatch = useDispatch();

  const onClick = (job) => {
    if (dispatcher) {
      dispatch(setOneJob(job));
    }
  };

  return (
    <div
      className={`${styles["main"]} ${className} ${
        selected && styles.selected
      }`}
      onClick={() => {
        onClick(data);
      }}
    >
      {company.logo_photo ? (
        <div className={styles["image-icon"]}>
          <img src={company.logo_photo} alt="" />
        </div>
      ) : (
        <div className={styles["name-icon"]}>{company?.name[0]}</div>
      )}

      <div className={styles["infos"]}>
        <h2 className={styles["title-job"]}>{data?.job_title}</h2>
        <span className={styles["comp-name"]}>{company?.name}</span>
        <span className={styles["places"]}>
          <img src={location_icon} alt="location" />

          <span>
            {/* {company.country}, {company.city} */}
            {data.job_location}
          </span>
        </span>
      </div>
    </div>
  );
}

export default JobCard;
