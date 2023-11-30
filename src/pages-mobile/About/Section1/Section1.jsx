import React from "react";
import styles from "./styles.module.scss";
import img from "../../../assets/images/about/1.jpg";

import c1 from "../../../assets/images/about/circle1.svg";
import c2 from "../../../assets/images/about/circle2.svg";

function Section1() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.infos}>
          <div className={styles.container}>
            <h1>
              Elevating Africa’s<br /> next  generation
            </h1>
            <p>By unlocking potential and creating opportunities</p>

            <div className={styles.img}>
              <img src={img} alt="" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Section1;
