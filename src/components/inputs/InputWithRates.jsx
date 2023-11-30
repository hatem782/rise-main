import React from "react";
import Input from "./Input";

import styles from "./styles.module.scss";
import trash from "../../assets/svgs/inputs/delete.svg";
import star_filled from "../../assets/svgs/start_filled.svg";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InputSkills from "./inputSkills";

function InputWithRates(props) {
  let Stars = [0, 1, 2, 3, 4];

  const {
    onRateChange = () => {},
    onChange = () => {},
    onDelete = () => {},
    index = 0,
  } = props;
  return (
    <div className={styles["input-rate"]}>
      <div className={styles["input-rate-input"]}>
        <div className={styles["input-input"]}>
          <InputSkills {...props} />
        </div>
        <div className={styles["input-image"]}>
          <img
            src={trash}
            alt=""
            className={styles["trash"]}
            onClick={() => {
              onDelete(index);
            }}
          />
        </div>
      </div>
      <div className={styles["input-rate-rates"]}>
        {/* {Stars.map((star, key) => {
          return value.rates <= star ? (
            <StarBorderIcon
              key={key}
              alt="rate"
              className={styles["star"]}
              onClick={() => onRateChange(index, key + 1)}
            />
          ) : (
            <StarIcon
              key={key}
              alt="rate"
              className={styles["star"]}
              onClick={() => onRateChange(index, key + 1)}
            />
          );
        })} */}

        {[0, 0, 0, 0, 0].map((star, key) => {
          return (
            <img
              src={star_filled}
              key={key}
              alt="rate"
              className={styles["star"]}
              // onClick={() => onRateChange(index, key + 1)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default InputWithRates;
