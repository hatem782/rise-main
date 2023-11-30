import React from "react";
import styles from "./styles.module.scss";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";

import c0 from "../../assets/images/talent/c0.png";
import c5 from "../../assets/images/talent/c5.svg";
import c1 from "../../assets/images/talent/c1.png";
import c2 from "../../assets/images/talent/c2.png";
import c4 from "../../assets/images/talent/c4.png";
import img2 from "../../assets/images/talent/2.png";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";

import imgx1 from "../../assets/images/talent/1.png";

import imgx2 from "../../assets/images/talent/3.png";
import imgx3 from "../../assets/images/talent/4.png";
import imxc4 from "../../assets/images/talent/5.png";
import HomeNavbarMobile from "../../layouts/navbar-mobile/HomeNavbar/HomeNavbar";
import MainMobileFooter from "../../layouts/Footers/mobileFooter/MainFooter";

function TalentMobile() {
  const navigate = useNavigate();

  const GoToCAprofile = () => {
    navigate("/ca_profile");
  };
  
  
  return (
    <div className={styles.main}>
      <HomeNavbarMobile />
      <div className={styles.sections}>
        <div className={styles.section1}>
          <div className={styles["Left"]}>
            <div className={styles["container"]}>
              <h1>
                Find your way <br />
                and get hired
              </h1>
              <p>
                Rise helps you discover the right opportunities<br/> and resources to
                propel your career forward.
              </p>
            </div>
          </div>
          <div className={styles["Right"]}>
            <img src={imgx1} alt="" />
          </div>
        </div>

        <div className={styles.section2}>
          <img src={c0} alt="" className={styles.c0} />
          <img src={c1} alt="" className={styles.c1} />

          <div className={styles.left}>
            <img src={img2} alt="" />
          </div>
        </div>

        <div className={styles.section3}>
          <div className={styles["Left"]}>
            <div className={styles["container"]}>
              <h1>Create your professional profile</h1>
              <p>
                Craft a standout profile showcasing your education, work
                experience, and aspirations. Our platform highlights your unique
                strengths and abilities to potential employers.
              </p>

            </div>
          </div>
          <div className={styles["Right"]}>
            <img src={imgx2} alt="" />
          </div>
          <img src={c5} alt="" className={styles.c5} />

        </div>

        <div className={styles.section4}>
 
          <div className={styles["Left"]}>
            <div className={styles["container"]}> 
              <h1>Discover job opportunities </h1>
              <p>
                Browse curated job listings, internships, and traineeships
                tailored to your skills and interests. Rise AI-driven algorithms
                ensure a personalized experience, increasing your chances of
                success.
              </p>
            </div>
          </div>
          <div className={styles["Right"]}>
            <img src={imgx3} alt="" />
          </div>
        </div>

        <div className={styles.section5}>

          <div className={styles["Left"]}>
            <div className={styles["container"]}>
              <img src={c1} alt="" className={styles["c2"]} />
              <img src={c4} alt="" className={styles.c4} />

              <h1>Develop your skills </h1>
              <p>
                Enhance your employability with personalized resources 
                including workshops, assessments and recommended 
                certifications. Identify and address skill gaps to stay 
                competitive in the job market.
              </p>
            </div>
          </div>
          <div className={styles["Right"]}>
            <img src={imxc4} alt="" />
          </div>
        </div>

        <div className={styles.section6}>
          <h2 className={styles["title"]}>Connect with mentors</h2>
          <p className={styles["description"]}>
            Gain valuable insights and advice from experienced professionals.{" "}
           
            Our proprietary program helps you navigate the challenges and
            opportunities in your career journey.
          </p>

          <BtnOrange onClick={GoToCAprofile} className={styles.btn}>
            Join now
          </BtnOrange>
        </div>
      </div>
      <MainMobileFooter />
    </div>
  );
}

export default TalentMobile;
