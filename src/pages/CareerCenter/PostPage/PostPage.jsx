import React from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

import post_img from "../../../assets/images/CareerCenter/help.jpg";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import user_img from "../../../assets/images/CareerCenter/user_exmp.png";

function PostPage() {
  return (
    <div className={styles["main"]}>
      <HomeNavbar />
      <div className={styles["content"]}>
        <div className={styles["head"]}>
          <h3>IDEAS</h3>
          <h2>Is finding your professional path a science?</h2>
          <p>
            Building a professional path that suits you is not a matter of
            chance or pure luck. It can be learned and is <br /> even a science.
            Interview with Auguste Dumouilla, researcher in guidance psychology.
          </p>
          <span>21 Feb, 2022</span>
          <div className={styles["img"]}>
            <img src={post_img} alt="" />
          </div>
        </div>

        <div className={styles["body"]}>
          {/* <h2>Take stock, morning and evening</h2> */}
          <p>
            How to make the right choices? That’s the question we ask yourself
            regarding our professional path. Good news is, it’s also a question
            that scientists explore. For more than a century, researchers in
            guidance psychology study and analyse the topic, imagine news models
            et develop experiments to help us find our way. That’s Auguste
            Dumouilla’s job as a researcher
          </p>
          <h2>
            You are a doctor and researcher in guidance psychology, what is it
            about?
          </h2>
          <p>
            Auguste Dumouilla: Being a researcher in psychology means that I
            read and integrate as much scientific literature as possible that is
            closely or remotely related to counselling psychology. Based on this
            theoretical expertise, I then construct protocols to answer a
            question that research has not yet answered. This is the core of the
            work of a researcher in psychology.
          </p>
          <p>
            At JobTeaser, my task is to create guidance products, train people
            in the use of these products, produce popularised content, set up
            research protocols and build the counterpart to counselling
            assistance on the recruitment side.
          </p>

          <h2>
            So, counselling is a subject of scientific study. How would you
            define it scientifically?
          </h2>

          <p>
            A.D.: The most current theoretical model in guidance is called Life
            Design. It is defined as “enabling the individual to become aware of
            his or her personal characteristics and to develop them to choose
            his/her studies and professional activities in all circumstances of
            life”. Basically, what we need to remember in this model is that the
            dream job is a myth.
          </p>

          <div className={styles["author"]}>
            <img src={user_img} alt="" />
            <div className={styles["infos"]}>
              <span className={styles["name"]}>Alice Huot</span>
              <span className={styles["post"]}>Editor in Chief</span>
            </div>
          </div>

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

export default PostPage;
