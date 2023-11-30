import React, { useRef } from "react";
import styles from "./styles.module.scss";
import upload from "../../assets/svgs/upload.svg";
import { ErrorMessage, useFormikContext } from "formik";
import axios from "../../utils/axios";
import { useState } from "react";

import { IoCloudDone } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";

const { REACT_APP_API_BACK } = process.env;

function Upload(props) {
  const { label = "", label2 = "", name = "", className = "" } = props;
  const [upState, setUpState] = useState(0); // 0:start / 1:uploading / 2:done

  const formik = useFormikContext();
  const inputFile = useRef(null);

  const handhe_change = async (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setUpState(1);
    await axios
      .post("/api/v1/file/updateUserImage", formData)
      .then((response) => {
        const file_url = `${REACT_APP_API_BACK}/public/images/${response.data}`;
        formik.setFieldValue(name, file_url);
        setUpState(2);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        formik.setFieldError(name, "can't upload file");
        setUpState(2);
      });

    // here we will upload file using mutate and react-query
    // here after the upload we change the value of Field formik
  };

  const handle_lick = () => {
    inputFile.current.click();
  };

  return (
    <div className={`${styles["main-upload"]} ${className}`}>
      <label>{label}</label>
      <div className={styles["upload"]} onClick={handle_lick}>
        {upState === 0 && <img src={upload} alt="" />}
        {upState === 1 && (
          <AiOutlineLoading
            className={`${styles["icon"]} ${styles["turning"]}`}
          />
        )}

        {upState === 2 && <IoCloudDone className={styles["icon"]} />}
        <span>
          {upState === 0 && label2}
          {upState === 1 && "Uploading..."}
          {upState === 2 && "Image Uploaded"}
        </span>
      </div>

      <input ref={inputFile} type="file" id="" onChange={handhe_change} />

      <ErrorMessage name={name} component="div" className={"error-msg"} />
    </div>
  );
}

export default Upload;
