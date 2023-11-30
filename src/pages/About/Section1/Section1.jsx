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
          <img src={c1} alt="" className={styles.c1} />
          <img src={c2} alt="" className={styles.c2} />
          <div className={styles.container}>
            <h1>
              Elevating <br /> Africa’s next <br /> generation
            </h1>
            <p>By unlocking potential and creating opportunities</p>
          </div>
        </div>
        <div className={styles.img}>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Section1;
