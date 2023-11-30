import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import icon_phone from "../../assets/svgs/inputs/phone.svg";
import down1 from "../../assets/svgs/inputs/down1.svg";
import useOutsideEvent from "../../hooks/useOutsideEvent";
import { ErrorMessage, Field } from "formik";

import { useFormikContext } from "formik";

import phones from "../../assets/jsons/phone.countries.json";

function InputPhone({
  label = "",
  name = "",
  select_name = "",
  placeholder = "",
  className = "",
  ...others
}) {
  const [show, setshow] = useState(false);
  const [sel_val, set_sel_val] = useState(phones[110]);
  const ref = useRef(null);
  const formik = useFormikContext();

  // const { setFieldValue } = form;

  useOutsideEvent(ref, () => {
    setshow(false);
  });

  const handle_show = () => {
    setshow(!show);
  };

  const handle_choose = (value) => {
    setshow(false);
    formik.setFieldValue(select_name, value);
  };

  useEffect(() => {
    if (formik.getFieldProps(select_name).value === "") {
      formik.setFieldValue(
        select_name,
        `${phones[110].code} ${phones[110].dial_code}`
      );
    }
  }, [formik]);

  return (
    <div className={`${styles["main-phone"]} ${className}`}>
      <label>{label}</label>
      <div className={styles["input"]}>
        <div className={styles["country"]} ref={ref}>
          <div className={styles["showed"]} onClick={handle_show}>
            <span>
              {/* {formik.getFieldProps(select_name).value.split(" ")[1] || "+000"} */}
              {sel_val.code}
            </span>
            <img src={down1} alt="" />
          </div>
          {show && (
            <div className={styles["hided"]}>
              {phones.map((item, key) => {
                return (
                  <span
                    className={
                      item.code === sel_val.code ? styles.selected_number : ""
                    }
                    key={key}
                    onClick={() => {
                      handle_choose(`${item.code} ${item.dial_code}`);
                      set_sel_val(item);
                    }}
                  >
                    {`${item.code} ${item.dial_code}`}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <Field name={name} placeholder={placeholder} {...others} />
        <div className={styles["image"]}>
          <img src={icon_phone} alt="" />
        </div>
      </div>
      <ErrorMessage
        name={select_name}
        component="div"
        className={"error-msg"}
      />
      <ErrorMessage name={name} component="div" className={"error-msg"} />
    </div>
  );
}

export default InputPhone;
