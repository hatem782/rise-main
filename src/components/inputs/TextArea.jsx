import React from "react";
import styles from "./styles.module.scss";
import { useFormikContext, ErrorMessage } from "formik";

function TextArea(props) {
  const {
    label = "",
    name = "",
    icon = null,
    type = "text",
    placeholder = "",
    rows = 5,
    className = "",
  } = props;
  const formik = useFormikContext();

  const handle_change = (e) => {
    formik.setFieldValue(name, e.target.value);
  };

  return (
    <div className={`${styles["main-textarea"]} ${className}`}>
      <label>{label}</label>
      <div className={styles["input"]}>
        <textarea
          type={type}
          name={name}
          onChange={handle_change}
          placeholder={placeholder}
          rows={rows}
          value={formik.getFieldProps(name).value}
        />
      </div>
      <ErrorMessage name={name} component="div" className={"error-msg"} />
    </div>
  );
}

export default TextArea;
