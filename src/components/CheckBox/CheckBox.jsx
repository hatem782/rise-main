import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";

import { ErrorMessage, useFormikContext } from "formik";
import { useMediaQuery } from "react-responsive";

function CheckBox(props) {
  const {
    label,
    value = false,
    name = "",
    onChange = () => {},
    isRadio,
    className = "",
  } = props;

  const formik = useFormikContext();
  const [check, setcheck] = useState(value);

  useEffect(() => {
    setcheck(value);
  }, [value]);

  useEffect(() => {
    setcheck(formik.getFieldProps(name).value);
  }, [formik.getFieldProps(name).value]);

  const handle_check = () => {
    formik.setFieldValue(name, !formik.getFieldProps(name).value);
    onChange({ target: { value: check, name } });
  };
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <div>
      <div
        className={
          isMobile
            ? `${styles["check-box-mobile"]} ${className}`
            : `${styles["check-box"]} ${className}`
        }
      >
        <div className={styles["check"]} onClick={handle_check}>
          {check && !isRadio && <CheckIcon className={styles["icon"]} />}
          {check && isRadio && <CircleIcon className={styles["icon"]} />}
        </div>
        <span>{label}</span>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className={`error-msg ${styles.message_error}`}
      />
    </div>
  );
}

export default CheckBox;
