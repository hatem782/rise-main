import React from "react";
import styles from "./styles.module.scss";

import img from "../../../../assets/images/employee/head.jpg";

import Button from "../../../../components/buttons/BtnOrange/BtnOrange";

function Section1() {
  return (
    <div className={styles["main"]}>
      <img src={img} alt="" />
      <div className={styles.content}>
        <h1>
          Discover top <br /> entry-level talent <br /> with ease
        </h1>
        <p>
          Partner with Rise to access a pool of the best <br /> young prospects
          the market has to offer.
        </p>
        <Button size={"medium-mb"} className={styles.btn}>Start hiring </Button>
      </div>
    </div>
  );
}

export default Section1;
