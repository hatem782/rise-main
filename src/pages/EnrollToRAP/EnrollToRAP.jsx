import React from "react";
import styles from "./styles.module.scss";

import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";

import user_img from "../../assets/images/enroll/1.png";

import c from "../../assets/images/enroll/c.svg";
import c1 from "../../assets/images/enroll/c1.svg";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import { useNavigate } from "react-router-dom";

function EnrollToRAP() {
  const navigate = useNavigate();

  const RiseNow = () => {
    navigate("/enroll.rap.send");
  };

  return (
    <div className={styles["main"]}>
      <HomeNavbar />
      <div className={styles["content"]}>
        <div className={styles["info-container"]}>
          <img src={c} alt="" className={styles["c"]} />
          <img src={c1} alt="" className={styles["c1"]} />
          <h1>
            Hello & <br /> Welcome
          </h1>

          <p>
            The Rise Apprenticeship Program (RAP) is open to recent graduates
            and young job seekers looking to improve their skills and
            desirability to employers further. We help entry-level job seekers
            build meaningful careers through our intensive mentorship.
          </p>

          <p>
            RAP is looking for people who are passionate, have strong minds, and
            are willing to learn and take risks to succeed. The program gives
            participants hands-on training, mentoring, and coaching to help them
            get ready for the careers they want.
          </p>

          <p>
            Candidates who complete the program have a100% match success rate
            within two months. To be eligible, candidates must have at least a
            bachelor’s degree obtained from 2019 onwards, with a full profile on
            the Rise platform, and have completed our standard aptitude
            assessment.
          </p>

          <h2>Eligibility, requirement, and cost</h2>

          <span>· At least a higher diploma or bachelor’s degree</span>
          <span>· Completed aptitude assessment on Rise</span>
          <span>· Ability to attend in-person sessions once a week</span>
          <span>· Access to the internet</span>
          <span>· Access to smartphone or computer</span>
          <span>· Pay Ksh 9,658 in two equal installments</span>
          <span>· Two months duration</span>

          <br />
          <br />

          <p>
            We offer merit-based scholarships to candidates from particularly
            disadvantaged backgrounds. Scholarship considerations are assessed
            case-by-case to candidates who meet our complete requirements.
          </p>

          <BtnOrange className={styles["btn"]} onClick={RiseNow}>
            Rise Now
          </BtnOrange>
        </div>

        <img className={styles["img"]} src={user_img} alt="" />
      </div>
      <MainFooter />
    </div>
  );
}

export default EnrollToRAP;
