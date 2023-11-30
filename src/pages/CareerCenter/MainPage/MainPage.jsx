import React from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

import main_img from "../../../assets/images/CareerCenter/main.jpg";
import enroll_img from "../../../assets/images/CareerCenter/enroll_section.jpg";
import PostCard from "../../../components/cards/PostCard/PostCard";

import { cards1, cards2, cards3 } from "./fakeData";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import DefaultNavbar from "../../../layouts/Navbars/DropdownNavbar/DropDownNavbar";

function MainPage() {
  return (
    <div className={styles["main"]}>
      <DefaultNavbar />
      <div className={styles["content"]}>
        <div className={styles["section-1"]}>
          <img src={main_img} alt="" />
          <div className={styles["content-text"]}>
            <h1>
              Resources and Guidance <br /> for a Successful Career
            </h1>
            <p>
              Access a wealth of career development tools and resources to help
              you <br /> navigate your professional journey.
            </p>
          </div>
        </div>

        <CardGroup
          cards={cards1}
          cards_color="white"
          title="Career Guidance and Advice"
          color="orange"
          desc=""
        />

        <CardGroup
          cards={cards2}
          cards_color="black"
          title="Career Guidance and Advice"
          color="white"
          desc="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also"
        />

        <CardGroup
          cards={cards3}
          cards_color="white"
          title="Career Guidance and Advice"
          color="black"
          desc=""
        />

        <EnrollNow />
      </div>
      <MainFooter />
    </div>
  );
}

export const CardGroup = ({
  title = "",
  desc = "",
  cards = [],
  color = "white",
  cards_color = "black",
  shoow_all = false,
}) => {
  return (
    <div className={`${styles[color]} ${styles.card_container}`}>
      <div className={styles.head_container}>
        <h2 className={styles.title}>{title}</h2>
        {shoow_all && (
          <BtnOrange isOutlined className={styles.btn}>
            See all
          </BtnOrange>
        )}
      </div>

      {!desc && (
        <>
          <br />
        </>
      )}

      {desc && <p className={styles.description}>{desc}</p>}
      <div className={styles.cards}>
        {cards.map((data, key) => {
          return (
            <PostCard
              key={key}
              className={styles.card}
              color={cards_color}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
};

export const EnrollNow = () => {
  return (
    <div className={styles.start_enrolling}>
      <img src={enroll_img} alt="" />
      <div className={styles.enroll_content}>
        <div className={styles.infos}>
          <h1>
            Join our career development program to gain valuable insights and
            <br /> guidance tohelp you make informed decisions about your career
            path.
          </h1>
          <BtnOrange className={styles.btn}>Enroll now</BtnOrange>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
