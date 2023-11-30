import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import c0 from "../../../assets/images/home_page/c0.png";
import c1 from "../../../assets/images/home_page/c1.png";
import usePopup from "../../../hooks/usePupup";
import LoginPopup from "../../Popups/LoginPopup/LoginPopup";

import women_img from "../../../assets/images/home_page/img1.png";

function Section1() {
  const [P_login, O_login, C_login] = usePopup();

  return (
    <div className={styles["main"]}>
      <div className={styles["Left"]}>
        <div className={styles["container"]}>
          <img src={c0} alt="" className={styles["c0"]} />
          <img src={c1} alt="" className={styles["c1"]} />
          <h1>
            The #1 way <br /> entry-level <br /> people get hired
          </h1>
          <p>
            Unlock your potential with Africa's premier platform for <br />{" "}
            entry-level talent recruitment and career development.
          </p>

          <BtnOrange className={styles["btn"]} onClick={O_login}>
            Discover Opportunities
          </BtnOrange>
        </div>
      </div>
      <div className={styles["Right"]}>
        <img src={women_img} alt="" />
      </div>

      {P_login && <LoginPopup handleClose={C_login} open={P_login} />}
    </div>
  );
}

export default Section1;
