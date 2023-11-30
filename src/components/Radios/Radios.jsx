import React, { useState } from "react";
import styles from "./styles.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import { ErrorMessage, useFormikContext } from "formik";

function Radios(props) {
  const { className = "", options = [], name = "" } = props;
  const [selected, setSelected] = useState("");
  const formik = useFormikContext(name);

  return (
    <div className={`${styles.main} ${className}`}>
      {options.map((opt) => {
        return (
          <Radio
            isRadio
            checked={selected === opt.value}
            label={opt.name}
            onChange={() => {
              setSelected(opt.value);
              formik.setFieldValue(name, opt.value);
            }}
          />
        );
      })}
      <ErrorMessage name={name} component="div" className={"error-msg"} />
    </div>
  );
}

const Radio = ({ label, onChange, checked = false }) => {
  return (
    <div className={styles["check-box"]}>
      <div className={styles["check"]} onClick={onChange}>
        {checked && <CheckIcon className={styles["icon"]} />}
        {/* {check && isRadio && <CircleIcon className={styles["icon"]} />} */}
      </div>
      <span>{label}</span>
    </div>
  );
};

export default Radios;
