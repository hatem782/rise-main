import React from "react";
import styles from "./styles.module.scss";

function PostCard(props) {
  const { data, className, color = "black" } = props;
  const { img = "", title = "", desc = "", date = "" } = data;

  const isBlack = color === "black";
  const isWhite = color === "white";

  return (
    <div
      className={`
      ${styles.main} 
      ${className} 
      ${isBlack && styles.black}  
      ${isWhite && styles.white}`}
    >
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>{desc}</p>
      <span>{date}</span>
    </div>
  );
}

export default PostCard;
