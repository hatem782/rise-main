import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import logo from "../../../assets/svgs/logo1.svg";
import burger from "../../../assets/svgs/navbar/humberger.svg";
import user_icon from "../../../assets/svgs/navbar/user.svg";
import tel_icon from "../../../assets/images/home_page/tel.svg";
import emp_icon from "../../../assets/images/home_page/emp.svg";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "@mui/material";
import usePopup from "../../../hooks/usePupup";
import LoginPopup from "../../../pages/Popups/LoginPopup/LoginPopup";

function HomeNavbarMobile() {
  const navigate = useNavigate();
  const [P_login, O_login, C_login] = usePopup();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [current, setCurrent] = useState("");
  const location = useLocation();

  const { isCompany, isTalent } = useSelector((state) => state.users);

  const handleClick = (event) => {
    // navigate("/overview");
    // navigate("/user_dashboard");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={styles["main"]}>
      <div className={styles["navbar"]}>
        <NavLink to="/">
          <img className={styles["logo"]} src={logo} alt="" />
        </NavLink>
        <div className={styles['navbar-box']}>
      
    
      <div className={styles['login-text']}>
        <p>Login</p>
      </div>
        <div className={styles["image-box"]}> 
          <img src={burger} alt="burger" className={styles["burger-nav"]}/>
        </div>
      </div>
    </div>
 
    </div>
  );
}

export default HomeNavbarMobile;

/*{!isCompany && !isTalent && (
          <div className={`${styles["links"]} ${styles["links2"]}`}>
            {/* <span
            className={`
            ${styles["link"]} 
            ${current === "/career_center" ? styles["current"] : ""}`}
          >
            <NavLink to="/career_center">Career Center</NavLink>
          </span> }

            <span className={styles["link"]} onClick={handleClick}>
              <img src={user_icon} alt="" /> Sign Up
            </span>

            <span className={styles["link"]} onClick={O_login}>
              Log In
            </span>

            <span className={styles["post-job"]}>Post a Job</span>
          </div>
        )}

        {isCompany && (
          <div className={`${styles["links"]} ${styles["links2"]}`}>
            <span
              className={styles["link"]}
              onClick={() => navigate("/overview")}
            >
              <img src={user_icon} alt="" /> My Company
            </span>

            <span className={styles["post-job"]}>Post a Job</span>
          </div>
        )}

        {isTalent && (
          <div className={styles["links"]}>
            <span
              className={styles["link"]}
              onClick={() => navigate("/user_dashboard")}
            >
              <img src={user_icon} alt="" /> My Dashboard
            </span>
          </div>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{ list: styles.menu }}
        disableScrollLock={true}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 40,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div
          className={`${styles["linkDef"]} ${styles["linkDef-underlined"]}`}
          onClick={() => navigate("/ca_profile")}
        >
          <img src={tel_icon} alt="" />
          <span>Talents</span>
        </div>
        <div
          className={styles["linkDef"]}
          onClick={() => navigate("/emp_cre_acc_comp_prof")}
        >
          <img src={emp_icon} alt="" />
          <span>Employers</span>
        </div>
      </Menu>
      <LoginPopup handleClose={C_login} open={P_login} />*/