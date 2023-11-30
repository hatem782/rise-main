import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import { H1 } from "../../components/typos/H/H";

import c1 from "../../assets/images/CA/c1.svg";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import { useNavigate } from "react-router-dom";
import LargeInput from "../../components/LargeInput/LargeInput";

import Plus from "../../components/buttons/Plus/Plus";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";
import { steps } from "./SelectData";
import { useDispatch, useSelector } from "react-redux";
import {
  talent_job_position,
  talent_delete_job,
} from "../../redux/ProfCreat.reducer";
import { Year } from "../../functions/Dates";

function WorkSummary() {
  const navigare = useNavigate();
  const jobs = useSelector((state) => state.profile.talent_profile.jobs);
  const dispatch = useDispatch();

  const handle_add = () => {
    dispatch(talent_job_position(jobs.length));
    navigare("/ca_work_history");
  };

  const handle_update = (key) => {
    dispatch(talent_job_position(key));
    navigare("/ca_work_history");
  };

  const handle_delete = (key) => {
    dispatch(talent_delete_job(key));
  };

  const Next = () => {
    navigare("/ca_start_education");
  };

  const Back = () => {
    navigare("/job_description");
  };

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={1} />
      <div className={styles["content"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>Work History summary</H1>

        <div className={styles["form"]}>
          {jobs.map((job, key) => {
            return (
              <LargeInput
                key={key}
                number={key + 1}
                label={`${job.job_title} , ${job.employ} | ${job.city} , ${
                  job.country
                } | ${Year(job.start_date)}-${Year(job.end_date)}`}
                placeholder="Write Something Here"
                onDelete={handle_delete}
                onUpdate={handle_update}
                value={`Job Title : ${job.job_title}
duration : ${job.start_date} to ${job.end_date} 
Country - City : ${job.country} / ${job.city}`}
              />
            );
          })}

          <Plus className={styles["btn-add"]} onClick={handle_add}>
            Add another position
          </Plus>

          <div className={styles["btn-container"]}>
            <BtnOrange
              is_div
              onClick={Back}
              className={`${styles["btn"]} ${styles["btn-black"]}`}
            >
              Back
            </BtnOrange>
            <BtnOrange onClick={Next} className={`${styles["btn"]}`}>
              Next: Education
            </BtnOrange>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default WorkSummary;
