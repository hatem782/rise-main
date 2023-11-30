import React from "react";
import styles from "./styles.module.scss";
import UserNavbar from "../../layouts/Navbars/UserNavbar/UserNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import SideBar1 from "../../layouts/SideBars/SideBar1/SideBar1";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { menu } from "./sidebar.data";

import TalentProfile from "./TalentProfile/TalentProfile";
import ViewJobsAndInternships from "./ViewJobsAndInternships/ViewJobsAndInternships";
import MyApplications from "./MyApplications/MyApplications";
import { useSelector } from "react-redux";
import ReplyToEmployer from "./ReplyToEmployer/ReplyToEmployer";

function UserDashboard() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.users.data);

  const nav_change = (link) => {
    navigate(link);
  };
  return (
    <div className={styles["main"]}>
      <UserNavbar />
      <SideBar1 items={menu} onChange={nav_change} />

      <Routes>
        <Route element={<TalentProfile data={profile} />} path="/profile" />
        <Route element={<MyApplications />} path="/my_applications" />
        <Route
          element={<ViewJobsAndInternships />}
          path="/job_and_internships"
        />
        <Route element={<ReplyToEmployer />} path="/reply_to_emp" />
        <Route element={<Navigate to="/user_dashboard/profile" />} path="/*" />
      </Routes>

      <MainFooter />
    </div>
  );
}

export default UserDashboard;
