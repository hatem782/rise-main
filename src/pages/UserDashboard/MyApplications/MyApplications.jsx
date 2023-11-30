import React from "react";
import styles from "./styles.module.scss";
import JobCard from "../../../components/cards/JobCard/JobCard";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import { useSelector } from "react-redux";
import { GetJobs } from "../../../services/Jobs.serv";
import { useQuery } from "@tanstack/react-query";
import {
  dateDiffInDays,
  formatDateToDDMMYYYYDot,
} from "../../../functions/Dates";

function MyApplications() {
  const talent_id = useSelector((state) => state.users.data._id);

  const {
    data: jobs = [],
    isLoading,
    error,
    refetch,
  } = useQuery(["jobs"], GetJobs);

  const JobState = {
    refused: "Closed",
    accepted: "Submitted",
    pending: "In review",
  };

  const GetState = (status, createdAt) => {
    if (status === "pending") {
      if (dateDiffInDays(createdAt, new Date()) > 90) {
        return "refused";
      } else {
        return "pending";
      }
    } else {
      return "accepted";
    }
  };

  return (
    <div className={styles["main"]}>
      <div className={styles["content"]}>
        <div className={styles["container"]}>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th className={styles["th-jobs"]}>Company</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs
                .filter((job) => {
                  return (
                    job.candidates?.find(
                      (cd) => cd.id_condidate === talent_id
                    ) !== undefined
                  );
                })
                .map((job, key) => {
                  let { status, createdAt } = job.candidates?.find(
                    (cd) => cd.id_condidate === talent_id
                  );
                  return (
                    <tr key={key}>
                      <td className={styles["td-job"]}>
                        <JobCard data={job} className={styles["job-card"]} />
                      </td>
                      <td className={styles["date"]}>
                        {formatDateToDDMMYYYYDot(createdAt)}
                      </td>
                      <td>
                        <BtnOrange
                          isOutlined
                          className={` ${styles["btn"]} ${
                            styles[GetState(status, createdAt)]
                          } `}
                        >
                          {JobState[GetState(status, createdAt)]}
                        </BtnOrange>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyApplications;
