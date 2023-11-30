import React from "react";
import styles from "./styles.module.scss";
import StepperNav from "../../../layouts/Navbars/StepperNav/StepperNav";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

import { steps } from "../SelectData";
import SideBar1 from "../../../layouts/SideBars/SideBar1/SideBar1";

import mobile_icon from "../../../assets/svgs/phone_o.svg";
import email_icon from "../../../assets/svgs/email_o.svg";
import location_icon from "../../../assets/svgs/location_o.svg";
import user_icon from "../../../assets/svgs/user.svg";

import { menu } from "./data";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import { useNavigate } from "react-router-dom";

import c1 from "../../../assets/images/CA/c1.svg";
import { useSelector } from "react-redux";
import { formatDateToDDMMYYYY } from "../../../functions/Dates";

import { CreateTalentProfile } from "../../../services/Profile.serv";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

function CA_VerifData() {
  const navigare = useNavigate();
  const profile = useSelector((state) => state.profile.talent_profile);

  const CreateTalentProfileMutation = useMutation(CreateTalentProfile, {
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Talent created successfully");
      navigare("/ca_finish");
    },
  });

  const Next = () => {
    const real_profile = { ...profile };
    delete real_profile.confirmPass;
    real_profile.skills = real_profile.skills.map((skill) => ({ skill }));
    console.log(real_profile);
    CreateTalentProfileMutation.mutate(real_profile);
    navigare("/ca_finish");
  };

  const Back = () => {
    navigare("/add_other_things");
  };

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={6} />
      <SideBar1 items={menu} isProfileEdit isAddExist />

      <div className={styles["content"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <Head data={profile} />
        <Description data={profile} />
        <Skills_and_proficencies data={profile} verif />
        <Work_History data={profile} />
        <Education data={profile} />
        <Others data={profile} />

        <div className={styles["btn-container"]}>
          <BtnOrange
            onClick={Back}
            className={`${styles["btn"]} ${styles["btn-black"]}`}
          >
            Back
          </BtnOrange>
          <BtnOrange
            onClick={Next}
            className={`${styles["btn"]} ${styles["btn-orange"]}`}
          >
            Save & next
          </BtnOrange>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}

export const Head = ({ data }) => {
  return (
    <div className={styles["head"]}>
      <h1>
        {data?.firstName} {data?.sureName}
      </h1>
      <h2>{data?.profession}</h2>
      <div className={styles["infos"]}>
        <div className={styles["info"]}>
          <img src={mobile_icon} alt="" className={styles["icon"]} />
          <span>{data?.phone}</span>
        </div>
        <div className={styles["info"]}>
          <img src={email_icon} alt="" className={styles["icon"]} />
          <span>{data?.email}</span>
        </div>
        <div className={styles["info"]}>
          <img src={location_icon} alt="" className={styles["icon"]} />
          <span>
            {data?.city}, {data?.country}
          </span>
        </div>
        {/* <div className={styles["info"]}>
          <img src={user_icon} alt="" className={styles["icon"]} />
          <span>25-03-1999</span>
        </div> */}
      </div>
    </div>
  );
};

export const Description = ({ data }) => {
  return (
    <p
      className={styles["description"]}
      dangerouslySetInnerHTML={{ __html: data.career_description }}
    ></p>
  );
};

export const Skills_and_proficencies = ({ data, verif = false }) => {
  return (
    <div className={styles["Skills_and_proficencies"]}>
      <h3 className={styles["underlined_title"]}>Skills & Proficiencies</h3>
      <div className={styles["skills"]}>
        {data?.skills.map((skill, key) => {
          return (
            <span key={key} className={styles["skill"]}>
              - {verif ? skill : skill.skill}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const Work_History = ({ data }) => {
  return (
    <div className={styles["Work_History"]}>
      <h3 className={styles["underlined_title"]}>Work History</h3>
      <div className={styles["works"]}>
        {data?.jobs.map((job, key) => {
          return (
            <div key={key} className={styles["work"]}>
              <div className={styles["date"]}>
                {formatDateToDDMMYYYY(job.start_date)} –{" "}
                {job.work_here
                  ? "(Present)"
                  : formatDateToDDMMYYYY(job.end_date)}{" "}
                :
              </div>
              <div className={styles["infos"]}>
                <span className={styles["title"]}>
                  {job.job_title} , {job.employ}
                </span>
                <span className={styles["title-2"]}>
                  Roles and responsibilities
                </span>
                <div
                  className={styles["Role_and_Respo"]}
                  dangerouslySetInnerHTML={{ __html: job.job_description }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Education = ({ data }) => {
  console.log(data);
  return (
    <div className={styles["Work_History"]}>
      <h3 className={styles["underlined_title"]}>Education History</h3>
      <div className={styles["works"]}>
        {data?.education.map((educ, key) => {
          return (
            <div key={key} className={styles["work"]}>
              <div className={styles["date"]}>
                {formatDateToDDMMYYYY(educ.grad_start_date)} –{" "}
                {data.work_here
                  ? "(Present)"
                  : formatDateToDDMMYYYY(educ.grad_end_date)}{" "}
                :
              </div>
              <div className={styles["infos"]}>
                <span className={styles["title"]}>
                  {educ.degree}, {educ.field}
                </span>
                <span className={styles["Role_and_Respo"]}>
                  {educ.school_name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Others = ({ data }) => {
  return (
    <div className={`${styles["Work_History"]} ${styles["others"]}`}>
      <h3 className={styles["underlined_title"]}>Other Accomplishments</h3>
      <br />
      <div
        dangerouslySetInnerHTML={{ __html: data?.additional_data }}
        className={styles["others_html"]}
      ></div>
      {/* <div className={styles["works"]}>
        <div className={styles["work"]}>
          <div className={styles["date"]}>Accomplishments :</div>
          <div className={styles["infos"]}>
            <span className={styles["title"]}>Debate Captain</span>
            <span className={styles["title"]}>Scout</span>
          </div>
        </div>

        <div className={styles["work"]}>
          <div className={styles["date"]}>Software :</div>
          <div className={styles["infos"]}>
            <span className={styles["title"]}>MS office</span>
            <span className={styles["title"]}>Adobe Suite</span>
          </div>
        </div>

        <div className={styles["work"]}>
          <div className={styles["date"]}>Languages :</div>
          <div className={styles["infos"]}>
            <span className={styles["title"]}>Spanish</span>
            <span className={styles["title"]}>Swahili</span>
          </div>
        </div>

        <div className={styles["work"]}>
          <div className={styles["date"]}>Interests :</div>
          <div className={styles["infos"]}>
            <span className={styles["title"]}>Hiking</span>
            <span className={styles["title"]}>Art History</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CA_VerifData;
