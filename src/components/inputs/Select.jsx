import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import select_img from "../../assets/svgs/inputs/select.svg";
import useOutsideEvent from "../../hooks/useOutsideEvent";

import { ErrorMessage } from "formik";

import { useFormikContext, Field } from "formik";

function Select({
  label = "",
  name = "",
  icon = null,
  type = "text",
  placeholder = "",
  options = [],
  className = "",
  isWhite = false,
  editable = false,
  ...others
}) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState({ name: "", value: "" });
  const ref = useRef(null);
  const formik = useFormikContext();
  const [input_text, setinput_text] = useState("");

  useEffect(() => {
    if (options[0]) {
      setSel(options[0]);
    }
  }, [options]);

  useEffect(() => {
    console.log(formik.getFieldProps(name).value);
    setSel(
      options.filter((elem) => elem.value === formik.getFieldProps(name).value)
    );
    setinput_text(formik.getFieldProps(name).value);
  }, [formik.getFieldProps(name).value]);

  const handle_open = () => {
    setOpen(true);
  };

  const handle_close = () => {
    setOpen(false);
  };

  const handle_switch = () => {
    setOpen(!open);
  };

  const handle_select = (val) => {
    handle_close();
    formik.setFieldValue(name, val.value);
  };

  useOutsideEvent(ref, () => {
    setOpen(false);
  });

  return (
    <div
      className={`
      ${styles["main-select"]} 
      ${className} 
      ${isWhite && styles.isWhite}`}
      ref={ref}
    >
      <label>{label}</label>
      <div className={styles["input"]} onClick={handle_open}>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          // onClick={handle_open}
          {...others}
          value={input_text}
          // onChange={(e) => {
          //   setinput_text(e.target.value);
          // }}
          // disabled={!editable}
        />
        <div className={styles["image"]}>
          <img src={select_img} alt="" onClick={handle_switch} />
        </div>
      </div>
      {open && (
        <body className={styles["options"]}>
          {options.map((opt, key) => {
            console.log(opt);
            return (
              <h3
                key={key}
                onClick={() => {
                  handle_select(opt);
                }}
              >
                {opt.name}
              </h3>
            );
          })}
        </body>
      )}
      <ErrorMessage name={name} component="div" className={"error-msg"} />
    </div>
  );
}

export default Select;
