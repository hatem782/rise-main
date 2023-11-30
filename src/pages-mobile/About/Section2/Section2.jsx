import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import c2 from "../../../assets/images/about/c2.png";
import c from "../../../assets/images/about/circle1.svg";
import img2 from "../../../assets/images/about/2.jpg";

function Section2() {
  return (
    <div className={styles["main"]}>
     
      <div className={styles["Right"]}>
        <div className={styles["container"]}>
          {/* <img src={c2} alt="" className={styles["c2"]} /> */}
          <p>
            At Rise, our mission is to transform the landscape of entry-level
            recruitment across Africa. We bridge the gap between young talent,
            employers, and educational institutions, fostering a thriving
            ecosystem where Africa's youth can flourish.
          </p>
        </div>
      </div>
      <div className={styles["Left"]}>
        <img src={img2} alt="" />
      </div>
    </div>
  );
}

export default Section2;
