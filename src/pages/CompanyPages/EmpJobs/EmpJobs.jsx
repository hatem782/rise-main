import React from "react";
import styles from "./styles.module.scss";

import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";
import cover_img from "../../../assets/images/company_bg2.png";

import img_icon from "../../../assets/svgs/img.svg";
import company_img from "../../../assets/images/logo_company2.svg";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import plus_thin from "../../../assets/svgs/plus_thin.svg";
import JobCardMedium from "../../../components/cards/JobCardMedium/JobCardMedium";
import { GetJobsByCompany } from "../../../services/Jobs.serv";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EmpJobs() {
  const navig = useNavigate();
  const { data } = useSelector((state) => state.users);

  const {
    data: jobs = [],
    isLoading,
    error,
  } = useQuery(["jobs"], GetJobsByCompany);

  const goto_postjob = () => {
    navig("/emp_post_job");
  };

  const goto_website = () => {
    window.open(data?.url, "_blank");
  };

  return (
    <div className={styles["main"]}>
      <UserNavbar />
      <div className={styles["content"]}>
        <div className={styles["header"]}>
          <img src={data?.cover_photo} alt="" className={styles["cover"]} />
          <div className={styles["select-img"]}>
            <img src={img_icon} alt="" />
          </div>
          <div className={styles["white-container"]}>
            <div className={styles["company-container"]}>
              <div className={styles["logo-container"]}>
                <img src={data?.logo_photo} alt="" />
              </div>

              <p>{data?.name}</p>
            </div>

            <BtnOrange
              isOutlined
              className={styles["btn"]}
              onClick={goto_website}
            >
              Website
            </BtnOrange>
          </div>
        </div>

        <div className={styles["body"]}>
          <div className={styles["btn-container"]}>
            <BtnOrange className={styles["btn"]} onClick={goto_postjob}>
              <img src={plus_thin} alt="" />
              Post a new job
            </BtnOrange>
          </div>

          <div className={styles["jobs"]}>
            <h4 className={styles["title"]}>
              <span>{jobs.length}</span> Active jobs
            </h4>

            <div className={styles["jobs-items"]}>
              {jobs.map((job, key) => {
                return (
                  <JobCardMedium
                    data={job}
                    key={key}
                    className={styles["item"]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default EmpJobs;
