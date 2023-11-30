import React from "react";
import styles from "./styles.module.scss";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import Card1 from "../../../components/cards/Card1/Card1";

import img1 from "../../../assets/images/home_page/talent.png";
import img2 from "../../../assets/images/home_page/employers.png";
import usePopup from "../../../hooks/usePupup";
import LoginPopup from "../../../pages/Popups/LoginPopup/LoginPopup";
import Card1Mobile from "../../../components/cards/Card1Mobile/Card1";

function Section5() {
  const [P_login, O_login, C_login] = usePopup();
  return (
    <div className={styles["main"]}>
      <h2 className={styles["title"]}>Learn from industry experts</h2>
      <p className={styles["description"]}>
        Benefit from our mentorship program and gain valuable insights from
        experienced professionals in  your field. Access our comprehensive
        career center to make informed decisions about  your career path.
      </p>
      <div className={styles['btn-or-box']}>
      
      <BtnOrange size="medium" className={styles["btn"]} onClick={O_login}>
        Sign Up
      </BtnOrange>
      </div>

      <div ize="medium" className={styles["cards-container"]}>
        <Card1Mobile
          className={styles["card"]}
          title="Talent ?"
          desc={
            <div>
              Recruit the best students and  recent graduates from today
            </div>
          }
          link="/emp_cre_acc_comp_prof"
          img={img1}
        />

        <Card1Mobile
          className={styles["card"]}
          title="Employers ?"
          desc={
            <div>
              Find best company  for yourself
            </div>
          }
          link="/ca_profile"
          img={img2}
        />
      </div>
      {P_login && <LoginPopup handleClose={C_login} open={P_login} />}
    </div>
  );
}

export default Section5;
