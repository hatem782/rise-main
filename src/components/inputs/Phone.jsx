import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import icon_phone from "../../assets/svgs/inputs/phone.svg";
import down1 from "../../assets/svgs/inputs/down1.svg";
import useOutsideEvent from "../../hooks/useOutsideEvent";
import { ErrorMessage, Field } from "formik";

import { useFormikContext } from "formik";
import ReactCountryFlag from "react-country-flag";

import phones from "../../assets/jsons/phone.countries.json";

function InputPhone({
  label = "",
  name = "",
  select_name = "",
  placeholder = "",
  className = "",
  val_updt_location = "",
  ...others
}) {
  const [show, setshow] = useState(false);
  const [sel_val, set_sel_val] = useState(phones[24]);
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
        `${phones[24].code} ${phones[24].dial_code}`
      );
    }
  }, [formik]);

  useEffect(() => {
    if (val_updt_location !== "") {
      set_sel_val(
        phones.find(({ dial_code }) => dial_code == val_updt_location)
      );
    }
  }, [val_updt_location]);

  useEffect(() => {
    console.log(phones);
  }, []);

  return (
    <div className={`${styles["main-phone"]} ${className}`}>
      <label>{label}</label>
      <div className={styles["input"]}>
        <div className={styles["country"]} ref={ref}>
          <div className={styles["showed"]} onClick={handle_show}>
            <span>
              {/* {formik.getFieldProps(select_name).value.split(" ")[1] || "+000"} */}
              <ReactCountryFlag
                countryCode={sel_val.code}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title={sel_val.code}
                style={{
                  marginRight: "",
                  borderRadius: "1px",
                  height: "auto",
                  width: "24px",
                  height: "16px",
                }}
              />
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
                    <ReactCountryFlag
                      countryCode={item.code}
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                      title={item.code}
                      style={{
                        marginRight: "",
                        borderRadius: "1px",
                        height: "auto",
                        width: "24px",
                        height: "16px",
                      }}
                    />{" "}
                    {` ${item.code}`}
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
