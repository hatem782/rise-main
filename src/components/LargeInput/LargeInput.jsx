import React from "react";
import styles from "./styles.module.scss";

import edit_icon from "../../assets/svgs/inputs/edit.svg";
import delete_icon from "../../assets/svgs/inputs/delete.svg";
import TextareaAutosize from "@mui/base/TextareaAutosize";

function LargeInput({
  label = "",
  name = "",
  value = "",
  onChange = () => {},
  icon = null,
  type = "text",
  placeholder = "",
  number = 1,
  onDelete = () => {},
  onUpdate = () => {},
}) {
  return (
    <div className={styles["main"]}>
      <span className={styles["number"]}>{number}</span>
      <span className={styles["actions"]}>
        <img
          src={edit_icon}
          alt=""
          onClick={() => {
            onUpdate(number - 1);
          }}
        />
        <img
          src={delete_icon}
          alt=""
          onClick={() => {
            onDelete(number - 1);
          }}
        />
      </span>
      <h2 className={styles["label"]}>{label}</h2>
      <TextareaAutosize
        name={name}
        value={value}
        className={styles["input"]}
        onChange={(event) => {
          onChange(number - 1, event.target.value);
        }}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}

export default LargeInput;
