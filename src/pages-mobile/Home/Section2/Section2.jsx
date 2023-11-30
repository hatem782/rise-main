import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import c0 from "../../../assets/images/home_page/c0.png";
import img2 from "../../../assets/images/home_page/img2.png";
import usePopup from "../../../hooks/usePupup";
import LoginPopup from "../../../pages/Popups/LoginPopup/LoginPopup";

function Section2() {
  const [P_login, O_login, C_login] = usePopup();
  return (
    <div className={styles["main"]}>
      <div className={styles["c2-box"]}>
        <img src={c0} alt="" className={styles["c0"]} />
      </div>

      <div className={styles["Left"]}>
        <img src={img2} alt="" />
      </div>
      <div className={styles["Right"]}>
        <div className={styles["container"]}>
          <h1>Launch your career on Rise</h1>
          <p>
            Explore a vast range of job openings, internships, and traineeships
            tailored to your skills and interests. Rise is designed to match you
            with the perfect opportunities to kickstart your career journey.
          </p>
          <div className={styles['btn-or-box']}>
            <BtnOrange size="medium" onClick={O_login} className={styles["btn"]}>
              Join Rise today
            </BtnOrange>
          </div>
          
        </div>
      </div>
      {P_login && <LoginPopup handleClose={C_login} open={P_login} />}
    </div>
  );
}

export default Section2;
