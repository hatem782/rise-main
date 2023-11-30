import React from "react";
import styles from "./styles.module.scss";
import edit_icon from "../../../assets/svgs/inputs/edit.svg";

import location_icon from "../../../assets/svgs/location_2.svg";
import { formatDateToCustomString } from "../../../functions/Dates";
import { useNavigate } from "react-router-dom";

function JobCardMedium(props) {
  const { onClick = () => {}, className = "", data } = props;
  const { company_id: company } = data;

  const navigate = useNavigate();
  return (
    <div onClick={onClick} className={`${styles["main"]} ${className} `}>
      <div className={styles["title-and-edit"]}>
        <div
          className={styles["title"]}
          onClick={() => navigate("/manage_applicants")}
        >
          <h3>{data?.job_title}</h3>
          <span>{formatDateToCustomString(data?.job_deadline_apply)}</span>
        </div>
        <div className={styles["edit"]}>
          <img src={edit_icon} alt="" />
        </div>
      </div>
      <div className={styles["location"]}>
        <img src={location_icon} alt="" />
        <span>
          {company.country} ({company.city})
        </span>
      </div>
      {/* here you will make just p , all others will disapear, p max lines is 2 lines */}
      <div className={styles["description"]}>
      <div className={styles["p_description"]} dangerouslySetInnerHTML={{__html:data?.description_job}} />
      </div>

      <h4 className={styles["applicants-internship"]}>
        {data?.candidates?.length || 0} applicants | {data?.job_type}
      </h4>
    </div>
  );
}

export default JobCardMedium;
