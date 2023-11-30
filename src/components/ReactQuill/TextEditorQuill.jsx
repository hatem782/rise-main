import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./toolBar";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

import { ErrorMessage, useFormikContext } from "formik";

export const TextEditor = (props) => {
  const {
    name = "",
    value = "",
    placeholder = "",
    onChange = () => {},
    style = {},
    className = "",
    boxClassName = "",
  } = props;
  const formik = useFormikContext();

  const handleChange = (new_value) => {
    console.log(new_value);
    onChange({ target: { name, value: new_value } });
    formik.setFieldValue(name, new_value);
  };

  return (
    <div className={styles["text-editor"]}>
      <ReactQuill
        theme="snow"
        className={`${styles["ql-editor"]} ${className}`}
        style={style}
        value={formik.getFieldProps(name).value}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules(name)}
        formats={formats}
      />
      <EditorToolbar name={name} />

      <ErrorMessage name={name} component="div" className={"error-msg"} />
    </div>
  );
};

export default TextEditor;
