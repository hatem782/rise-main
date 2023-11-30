import React from "react";
import styles from "./styles.module.scss";

import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import Section1 from "./Section1/Section1";
import Section2 from "./Section2/Section2";
import Section3 from "./Section3/Section3";
import Section4 from "./Section4/Section4";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className={styles["main"]}>
      <HomeNavbar />

      <div className={styles["content"]}>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </div>

      <MainFooter />
    </div>
  );
}

export default About;
