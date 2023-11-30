import React from "react";
import { Quill } from "react-quill";
import { sizes } from "./data";
import styles from "./styles.module.css";
import "./styles2.scss";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
var fontSizeStyle = Quill.import("attributors/style/size");
fontSizeStyle.whitelist = sizes;
Quill.register(fontSizeStyle, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = (name) => {
  return {
    toolbar: {
      
      container: `#toolbar-${name}`,
      handlers: {
        undo: undoChange,
        redo: redoChange,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    clipboard: {
      matchVisual: false,
    },
  };
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = ({ name }) => (
  <div id={`toolbar-${name}`}>
    <div className="ql-toolbar">
     <span className="ql-formats">
 
      <select className="ql-size">
        {sizes.map((size, key) => (
          <option key={key} value={size}>
            {size}
          </option>
        ))}
      </select>

    </span> 

      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>

      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        {/* <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" /> */}
      </span>

      <span className="ql-formats">
        <button className="ql-strike" />
      </span>

      {/* <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span> */}

      {/* <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span> */}

      {/* <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span> */}

      {/* <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span> */}

      <span className={styles["ql-divider"]}></span>

      <span className="ql-formats">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
      </span>
    </div>
  </div>
);

export default QuillToolbar;
