import React from "react";
import styles from "./styles.module.scss";
import {
  Head,
  Description,
  Skills_and_proficencies,
  Work_History,
  Education,
  Others,
} from "../../CreateAccount/CA_VerifData/CA_VerifData";

import c1 from "../../../assets/images/CA/c1.svg";

function TalentProfile({ data }) {
  return (
    <div className={styles["main"]}>
      <div className={styles["content"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <Head data={data} />
        <Description data={data} />
        <Skills_and_proficencies data={data} />
        <Work_History data={data} />
        <Education data={data} />
        <Others data={data} />
      </div>
    </div>
  );
}

export default TalentProfile;
