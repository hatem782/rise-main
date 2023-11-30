import React from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

import img_loop from "../../../assets/svgs/loops/loop_white.svg";

import exemple_img from "../.././../assets/images/CareerCenter/help2.jpg";

import { CardGroup } from "../MainPage/MainPage";
import { cards1, cards2, cards3 } from "../MainPage/fakeData";
import JobCardMedium from "../../../components/cards/JobCardMedium/JobCardMedium";
import PostCard2 from "../../../components/cards/PostCard2/PostCard2";

import { cards } from "./fakeData";

function SecondaryPageCC() {
  return (
    <div className={styles["main"]}>
      <HomeNavbar />
      <div className={styles["content"]}>
        <MenuAndRech />
        <OneItem />

        <CardGroup
          cards={cards1}
          cards_color="white"
          title="Skill Development"
          color="black"
          desc=""
        />

        <CardGroup
          cards={cards2}
          cards_color="black"
          title="Mentorship Program"
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
          title="Webinars and Events"
          color="black"
          desc=""
          shoow_all
        />

        <div className={styles["job-search-tools"]}>
          <h1>Job Recommended for you</h1>
          <div className={styles["jobs-container"]}>
            {cards.map((data, key) => {
              return (
                <PostCard2 key={key} data={data} className={styles["item"]} />
              );
            })}
          </div>
        </div>

        <div className={styles["jobs"]}>
          <h1>Job Recommended for you</h1>
          <div className={styles["jobs-container"]}>
            {/* <JobCardMedium className={styles["item"]} />
            <JobCardMedium className={styles["item"]} /> */}
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

const MenuAndRech = () => {
  return (
    <div className={styles["Menu-and-rech"]}>
      <div className={styles["Menu"]}>
        <div className={`${styles.item} ${styles.active}`}>
          Career Guidance and Advice
        </div>
        <div className={`${styles.item} `}>Skill Development</div>
        <div className={`${styles.item} `}>Mentorship Program</div>
        <div className={`${styles.item} `}>Webinars and Events</div>
        <div className={`${styles.item} `}>Job Search Tools</div>
      </div>
      <div className={styles["Rech"]}>
        <img src={img_loop} alt="" />
        <input type="text" />
      </div>
    </div>
  );
};

const OneItem = () => {
  return (
    <div className={styles["One-Item"]}>
      <div className={styles["one-item-container"]}>
        <img src={exemple_img} alt="" />
        <div className={styles["infos"]}>
          <h1>POPULAR ARTICLES</h1>

          <span className={styles["title"]}>IDEAS</span>
          <span className={styles["desc"]}>
            What if we (finally) stopped believing in the dream job?
          </span>
          <span className={styles["date"]}>21 Feb, 2022</span>

          <span className={styles["title"]}>PORTRAITS</span>
          <span className={styles["desc"]}>
            « When you see a successful person, it should motivate you. »
          </span>
          <span className={styles["date"]}>10 Feb, 2022</span>

          <span className={styles["title"]}>NETWORKING</span>
          <span className={styles["desc"]}>
            How to create your own professional network?
          </span>
          <span className={styles["date"]}>17 Nov, 2021</span>
        </div>
      </div>

      <div className={styles["more"]}>
        <span className={styles["title"]}>IDEAS</span>
        <span className={styles["desc"]}>
          What if we (finally) stopped believing in the dream job?
        </span>
        <span className={styles["date"]}>21 Feb, 2022</span>
      </div>
    </div>
  );
};

export default SecondaryPageCC;
