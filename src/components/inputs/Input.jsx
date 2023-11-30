import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ErrorMessage, useFormikContext } from "formik";

function Input({
  label = "",
  name = "",
  icon = null,
  type = "text",
  placeholder = "",
  className = "",
}) {
  const [type2, settype2] = useState(type);
  const formik = useFormikContext();

  useEffect(() => {
    settype2(type);
  }, [type]);

  const handle_reveal = () => {
    if (type === "password" && type2 === "password") {
      settype2("text");
    } else if (type === "password" && type2 === "text") {
      settype2("password");
    }
  };

  const handle_change = (e) => {
    console.log(e.target.value);
    formik.setFieldValue(name, e.target.value);
  };

  return (
    <div className={`${styles.main} ${className}`}>
      {label && <label>{label}</label>}
      <div className={styles["input"]}>
        <input
          style={icon === null ? { width: "100%" } : { width: "90%" }}
          type={type2}
          name={name}
          placeholder={placeholder}
          onChange={handle_change}
          value={formik.getFieldProps(name).value}
        />
        {icon && (
          <div className={styles["image"]}>
            <img src={icon} alt="" onClick={handle_reveal} />
          </div>
        )}
      </div>
      <ErrorMessage name={name} component="div" className={"error-msg"} />
    </div>
  );
}

export default Input;
