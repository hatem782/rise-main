import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import c2 from "../../../assets/images/about/c3.svg";
import c from "../../../assets/images/about/circle1.svg";
import img3 from "../../../assets/images/about/3.jpg";

function Section3() {
  return (
    <div className={styles["main"]}>
      <div className={styles["Right"]}>
        <div className={styles["container"]}>
          <div>
            <p>
              Our platform offers personalized support for job seekers through job
              listings, mentorship, skill development, and career guidance.
            </p>

            <p>
              We give companies access to a large pool of enthusiastic people,
              guaranteeing you find the ideal match for your business. Let's work
              together to empower Africa's youth and create a better future for
              the continent.
            </p>
          </div>
        </div>
      </div>
      <div className={styles["Left"]}>
        <img src={img3} alt="" />
      </div>
    </div>
  );
}

export default Section3;
