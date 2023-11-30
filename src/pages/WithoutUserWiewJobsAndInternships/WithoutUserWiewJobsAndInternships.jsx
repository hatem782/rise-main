import React from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import NoUserJobsAndInternships from "../UserDashboard/ViewJobsAndInternships/NoUserJobsAndInternships";

function WithoutUserWiewJobsAndInternships() {
  return (
    <div className={styles.main}>
      <HomeNavbar />
      <NoUserJobsAndInternships />

      <MainFooter />
    </div>
  );
}

export default WithoutUserWiewJobsAndInternships;
