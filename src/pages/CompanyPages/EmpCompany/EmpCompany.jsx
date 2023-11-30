import React, { useEffect } from "react";
import styles from "./styles.module.scss";

import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

import img_icon from "../../../assets/svgs/img.svg";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import plus_thin from "../../../assets/svgs/plus_thin.svg";
import JobCardMedium from "../../../components/cards/JobCardMedium/JobCardMedium";

import edit_icon from "../../../assets/svgs/inputs/edit.svg";

import location_icon from "../../../assets/svgs/location_2.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GetJobsByCompany } from "../../../services/Jobs.serv";
import { useQuery } from "@tanstack/react-query";

function EmpCompany() {
  const { data } = useSelector((state) => state.users);
  const navig = useNavigate();

  const {
    data: jobs = [],
    isLoading,
    error,
  } = useQuery(["jobs"], GetJobsByCompany);

  const goto_website = () => {
    window.open(data?.url, "_blank");
  };

  const goto_postjob = () => {
    navig("/emp_post_job");
  };

  return (
    <div className={styles["main"]}>
      <UserNavbar />
      <div className={styles["content"]}>
        <div className={styles["header"]}>
          <img src={data?.logo_photo} alt="" className={styles["cover"]} />
          <div className={styles["select-img"]}>
            <img src={img_icon} alt="" />
          </div>
          <div className={styles["white-container"]}>
            <div className={styles["company-container"]}>
              <div className={styles["logo-container"]}>
                <img src={data?.cover_photo} alt="" />
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
          <div className={styles["description-container"]}>
            <div className={styles["description"]}>
              <div className={styles["img-tag"]}>
                <img
                  src={edit_icon}
                  alt="edit"
                  className={styles["edit-icon"]}
                />
              </div>
              <h2 className={styles["part-title"]}>Welcome</h2>
              <p>{data?.about}</p>

              <div className={styles["stats"]}>
                <div className={styles["stat"]}>
                  <span className={styles["number"]}>{data?.year}</span>
                  <span className={styles["title"]}>Creation year</span>
                </div>

                <div className={styles["stat"]}>
                  <span className={styles["number"]}>{data?.number}</span>
                  <span className={styles["title"]}>Number of employees</span>
                </div>

                <div className={styles["stat"]}>
                  <span className={styles["number"]}>-- countries</span>
                  <span className={styles["title"]}>
                    International presence
                  </span>
                </div>
              </div>
            </div>

            <div className={styles["part2-container"]}>
              <BtnOrange className={styles["btn"]} onClick={goto_postjob}>
                <img src={plus_thin} alt="" />
                Post a new job
              </BtnOrange>

              <div className={styles["head-office"]}>
                <img
                  src={edit_icon}
                  alt="edit"
                  className={styles["edit-icon"]}
                />
                <h3>Head Office</h3>

                <div className={styles["location"]}>
                  <img src={location_icon} alt="" />
                  <span>
                    {data?.country} ({data?.city})
                  </span>
                </div>
              </div>
            </div>
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

export default EmpCompany;
