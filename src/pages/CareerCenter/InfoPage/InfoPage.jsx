import React from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

import play_icon from "../../../assets/images/CareerCenter/play.png";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

function InfoPage() {
  return (
    <div className={styles["main"]}>
      <HomeNavbar />
      <div className={styles["content"]}>
        <div className={styles["head"]}>
          <div className={styles["img"]}>
            <img src={play_icon} alt="" />
          </div>
          <h2>Interview preparation checklists</h2>
          <p>
            Building a professional path that suits you is not a matter of
            chance or pure luck. It can be learned and is <br /> even a science.
            Interview with Auguste Dumouilla, researcher in guidance psychology.
          </p>
          <span>21 Feb, 2022</span>
        </div>

        <div className={styles["body"]}>
          <h2>Take stock, morning and evening</h2>
          <p>
            Scientists have proven that people who judge themselves negatively
            are more likely to procrastinate. So to avoid always putting
            everything off until tomorrow, the first step is to boost your
            morale and counter negative ideas about yourself.
          </p>
          <p>
            The first exercise is therefore very simple. It's about taking stock
            of yourself. Every morning, before you start the day, write down
            three things you appreciate about yourself. It could be anything
            from your dancing skills to your financial prowess or your loyalty
            to your loved ones. It’s up to you.
          </p>
          <p>
            To go a little further, also take a little time for reflection in
            the evening. This time, list three things you accomplished during
            the day. It may be going to work by bike more than by metro, or
            having finally found the courage to call your bank. Again, it's up
            to you. But keep in mind that there is nothing too small or
            insignificant
          </p>

          <h2>Take stock, morning and evening</h2>

          <p>
            There's nothing more demotivating than feeling like you're failing.
            Except that to succeed, the definition of the objectives that we set
            for ourselves is crucial. The SMART method is therefore a way to
            boost your motivation by ensuring that you set the right goals.
            According to this methodology, a goal should always be:
          </p>

          <ul>
            <li>Specific</li>
            <li>Measurable</li>
            <li>Ambitious</li>
            <li>Realistic</li>
            <li>Time-bound</li>
          </ul>

          <div className={styles["buttons-group"]}>
            <BtnOrange isOutlined className={styles.btn}>
              Know yourself
            </BtnOrange>
            <BtnOrange isOutlined className={styles.btn}>
              Opportunities
            </BtnOrange>
            <BtnOrange isOutlined className={styles.btn}>
              Great a job
            </BtnOrange>
          </div>
        </div>

        <div className={styles["footer"]}>
          <div className={styles["review"]}>
            <h3>Did this article help you?</h3>
            <div className={styles["buttons-group"]}>
              <BtnOrange isOutlined className={styles.btn}>
                Yes
              </BtnOrange>
              <BtnOrange isOutlined className={styles.btn}>
                No
              </BtnOrange>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default InfoPage;
