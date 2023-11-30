import React from "react";
import styles from "./styles.module.scss";



import user_img from "../../assets/images/enroll/mobile.png";

import c from "../../assets/images/enroll/c.svg";
import c1 from "../../assets/images/enroll/c1_mob.png";
import c2 from "../../assets/images/enroll/c_mob.png" ;
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import MainMobileFooter from "../../layouts/Footers/mobileFooter/MainFooter";
import HomeNavbarMobile from "../../layouts/navbar-mobile/HomeNavbar/HomeNavbar";

function EnrollToRAPMobile() {
  return (
    <div className={styles["main"]}>
      <HomeNavbarMobile />
      <div className={styles["content"]}>
        <div className={styles["info-container"]}>
        <div className={styles["info-box"]}>
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
          <div className={styles["bn-box"]}>

          <BtnOrange className={styles["btn"]}>Rise Now</BtnOrange>
          </div>
          <img src={c1} alt="" className={styles["c2"]} />


        </div>

      </div>
      <img className={styles["img"]} src={user_img} alt="" />

      </div>
      <MainMobileFooter />
    </div>
  );
}

export default EnrollToRAPMobile;
