import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import c0 from "../../../assets/images/home_page/c0.png";
import c1 from "../../../assets/images/home_page/c1.png";
import usePopup from "../../../hooks/usePupup";

import women_img from "../../../assets/images/home_page/img1.png";
import LoginPopup from "../../../pages/Popups/LoginPopup/LoginPopup";

function Section1() {
  const [P_login, O_login, C_login] = usePopup();

  return (
    <div className={styles["main"]}>
      <div className={styles["Left"]}>
        <div className={styles["container"]}>
          <img src={c0} alt="" className={styles["c0"]} />
          <h1>
            The #1 way <br /> entry-level <br /> people get hired
          </h1>
          <div className={styles["Right"]}>
            <img src={women_img} alt="" />
          </div>
          <p>
            Unlock your potential with Africa's premier platform<br/> for 
            entry-level talent recruitment and career<br/> development.
          </p>
          <div className={styles['btn-or-box']}>
            <BtnOrange className={styles["btn"]} onClick={O_login}>
              Discover Opportunities
            </BtnOrange>
          </div>
        </div>
      </div>
    

      {P_login && <LoginPopup handleClose={C_login} open={P_login} />}
    </div>
  );
}

export default Section1;
