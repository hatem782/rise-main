import React, { useState } from "react";
import styles from "./styles.module.scss";
import MenuIcon from "../../../assets/svgs/sidebar/humberger.svg";
import Plus from "../../../components/buttons/Plus/Plus";

function SideBar1({
  items = [],
  isProfileEdit = false,
  isAddExist = false,
  onChange = () => {},
}) {
  const [open, setopen] = useState(false);
  return (
    <div className={`${styles["main"]} `}>
      <div className={`${styles["container"]} ${open && styles["opened"]}`}>
        <div className={styles["Item-Menu"]}>
          <img
            src={MenuIcon}
            alt="icon"
            onClick={() => {
              setopen(!open);
            }}
          />
        </div>

        {isProfileEdit && <h3>PROFILE EDIT</h3>}

        <div className={styles["Items"]}>
          {items.map((item, key) => {
            return (
              <div
                key={key}
                className={styles["Item"]}
                onClick={() => {
                  onChange(item.value);
                }}
              >
                <div className={styles["icon-container"]}>
                  <img src={item.icon} alt="icon" className={styles["icon"]} />
                </div>
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>

        {isAddExist && <hr className={styles["hr"]} />}

        {isAddExist && (
          <Plus color="white" className={styles["plus"]}>
            Add one More
          </Plus>
        )}
      </div>
    </div>
  );
}

export default SideBar1;
