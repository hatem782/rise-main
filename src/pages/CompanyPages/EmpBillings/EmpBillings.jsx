import React from "react";
import styles from "./styles.module.scss";
import { H1 } from "../../../components/typos/H/H";
import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

function EmpBillings() {
  return (
    <div className={styles["main"]}>
      <UserNavbar />
      <div className={styles["content"]}>
        <H1 className={styles["h1"]}>Pricing, Payments & Billing</H1>

        <div className={styles["stepper"]}>
          <div className={styles["head"]}>
            <span className={styles["active"]}>Pricing</span>
            <span>Payments methods</span>
            <span>Invoices</span>
          </div>
          <div className={styles["body"]}>
            <p>
              We are currently in the giving spirit! Enjoy our services at no
              cost while we work on our upcoming pricing plans.
            </p>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default EmpBillings;
