import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import select_img from "../../assets/svgs/inputs/select.svg";
import useOutsideEvent from "../../hooks/useOutsideEvent";

function Select2({
  label = "",
  name = "",
  value = "",
  onChange = () => {},
  icon = null,
  type = "text",
  placeholder = "",
  options = [],
  className = "",
  select_default = true,
}) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState({ name: "", value: "" });
  const ref = useRef(null);

  useEffect(() => {
    if (options[0] && select_default) {
      setSel(options[0]);
    }
  }, [options]);

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
    setSel(val);
    onChange({ target: { value: val.value, name } });
  };

  useOutsideEvent(ref, () => {
    setOpen(false);
  });

  return (
    <div className={`${styles["main-select"]} ${className} `} ref={ref}>
      <div className={styles["input"]} onClick={handle_switch}>
        <input
          type="text"
          name={name}
          value={sel.name}
          placeholder={placeholder}
        />
        <div className={styles["image"]}>
          <img src={select_img} alt="" />
        </div>
      </div>
      {open && (
        <div className={styles["options"]}>
          {options.map((opt, key) => {
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
        </div>
      )}
    </div>
  );
}

export default Select2;
