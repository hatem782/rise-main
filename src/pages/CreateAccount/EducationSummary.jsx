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
  talent_delete_educ,
  talent_educ_position,
} from "../../redux/ProfCreat.reducer";
import { Year } from "../../functions/Dates";

function EducationSummary() {
  const navigare = useNavigate();
  const educations = useSelector(
    (state) => state.profile.talent_profile.education
  );
  const dispatch = useDispatch();

  const handle_add = () => {
    dispatch(talent_educ_position(educations.length));
    navigare("/ca_education");
  };

  const handle_update = (key) => {
    dispatch(talent_educ_position(key));
    navigare("/ca_education");
  };

  const handle_delete = (key) => {
    dispatch(talent_delete_educ(key));
  };

  const Next = () => {
    navigare("/ca_start_skills");
  };

  const Back = () => {
    navigare("/ca_education");
  };

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={2} />
      <div className={styles["content"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>Education summary</H1>

        <div className={styles["form"]}>
          {educations.map((educ, key) => {
            return (
              <LargeInput
                key={key}
                number={key + 1}
                label={`${educ.degree} | ${Year(educ.grad_start_date)} - ${Year(
                  educ.grad_end_date
                )} | ${educ.school_name}`}
                placeholder="Write Something Here"
                onDelete={handle_delete}
                onUpdate={handle_update}
                value={`Degree Title : ${educ.degree}
duration : ${educ.grad_start_date} to ${educ.grad_end_date} 
school name - location : ${educ.school_location} / ${educ.school_location}
field : ${educ.field}
                `}
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
              Next: Summary
            </BtnOrange>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default EducationSummary;
