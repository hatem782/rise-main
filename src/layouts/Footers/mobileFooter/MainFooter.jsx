import React from "react";
import styles from "./styles.module.scss";

import logo from "../../../assets/images/footer/logo.svg";
import fb from "../../../assets/images/footer/fb.svg";
import linkedin from "../../../assets/images/footer/in.svg";
import insta from "../../../assets/images/footer/insta.svg";
import tik from "../../../assets/images/footer/tik.svg";
import twit from "../../../assets/images/footer/twit.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  toModernSalary,
  toPrivacyPolicy,
  toTermsCondition,
} from "../../../redux/Links.reducer";

const links = [
  { icon: linkedin, link: "" },
  { icon: tik, link: "" },
  { icon: twit, link: "" },
  { icon: fb, link: "" },
  { icon: insta, link: "" },
];

function MainMobileFooter() {
  const dispatch = useDispatch();

  const toModernSalaryFn = () => {
    dispatch(toModernSalary());
  };
  const toPrivacyPolicyFn = () => {
    dispatch(toPrivacyPolicy());
  };
  const toTermsConditionFn = () => {
    dispatch(toTermsCondition());
  };

  return (
    <div className={styles["main"]}>
      <div className={styles["TopSide"]}>
   

        <div className={styles["part2"]}>
        <div className={styles["w-50-footer"]}>

          <div className={styles["group"]}>
            <h2>Company</h2>
            <span>
              <NavLink to="/about">About</NavLink>
            </span>
            <span>
              <NavLink to="/contact_us">Say hello</NavLink>
            </span>
            <span>
              <NavLink to="/fqa">FAQs</NavLink>
            </span>
            <span>
              <NavLink onClick={toTermsConditionFn} to="/privacy.policy">
                Terms and conditions
              </NavLink>
            </span>
            <span>
              <NavLink onClick={toPrivacyPolicyFn} to="/privacy.policy">
                Privacy Policy
              </NavLink>
            </span>
            <span>
              <NavLink onClick={toModernSalaryFn} to="/privacy.policy">
                Modern slavery statement
              </NavLink>
            </span>
          </div>
        </div>
          <div className={styles["w-50-footer"]}>
          <div className={styles["group"]}>
              <h2>
                <NavLink to="/employers">Employers</NavLink>
              </h2>
              <span>
                <NavLink to="/emp_cre_acc_comp_prof">Sign up</NavLink>
              </span>
              <span>
                <NavLink to="/contact_us">Say hello</NavLink>
              </span>
            </div>
            <div className={styles["group"]}>
              <h2 className={styles['h2-nopadd']}>
                <NavLink to="/talent">Jobseekers</NavLink>
              </h2>
              <span>
                <NavLink to="/ca_profile">Sign up</NavLink>
              </span>
              <span>
                <NavLink to="/jobs_internship">Jobs & Internships</NavLink>
              </span>
              <span>
                <NavLink to="/enroll.rap">Enroll to RAP</NavLink>
              </span>
            </div>

          
          </div>
        </div>
      </div>
      <div className={styles["part1"]}>
          <img src={logo} alt="" className={styles["logo"]} />
          <div className={styles["rxs"]}>
            {links.map((item, key) => {
              return (
                <div key={key} className={styles["rx"]}>
                  <img src={item.icon} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      <div className={styles["part3"]}>
        <h2>
          ©Copyright 2023 Rise Talent Accelerator Ltd.<br/> All rights reserved
        </h2>
      </div>
    </div>
  );
}

export default MainMobileFooter;
