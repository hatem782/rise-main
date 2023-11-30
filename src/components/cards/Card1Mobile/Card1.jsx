import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

function Card1Mobile({
  onClick = () => {},
  className = "",
  title = "",
  desc = "",
  link = "",
  img,
}) {
  return (
    <div className={`${styles["main"]} ${className}`}>
      <div className={styles["img"]}>
        <img src={img} alt="" />
      </div>

      <div className={styles["content"]}>
        <h2>{title}</h2>
        <p>{desc}</p>
        <NavLink className={styles["link"]} to={link}>
          Find More
        </NavLink>
      </div>
    </div>
  );
}

export default Card1Mobile;
