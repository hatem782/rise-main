import React from "react";
import styles from "./styles.module.scss";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";
import Section1 from "./Sections/Section1/Section1";
import Section2 from "./Sections/Section2/Section2";
import Section3 from "./Sections/Section3/Section3";
import Section4 from "./Sections/Section4/Section4";
import Section5 from "./Sections/Section5/Section5";
import HomeNavbar from "../../../layouts/Navbars/HomeNavbar/HomeNavbar";

function Employers() {
  return (
    <div className={styles.main}>
      <HomeNavbar />
      <div className={styles.content}>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
      <MainFooter />
    </div>
  );
}

export default Employers;
