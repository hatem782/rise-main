import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import logo from "../../../assets/svgs/logo1.svg";
import mail_icon from "../../../assets/svgs/navbar/mail.svg";
import ring_icon from "../../../assets/svgs/navbar/ring.svg";

import Menu from "@mui/material/Menu";

import settings_icon from "../../../assets/svgs/navbar/settings.svg";
import wallet_icon from "../../../assets/svgs/navbar/wallet.svg";
import questions_icon from "../../../assets/svgs/navbar/questions.svg";
import logout_icon from "../../../assets/svgs/navbar/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/User.reducer";
import { useMutation } from "@tanstack/react-query";
import { GetNotifs } from "../../../services/Notifs";
import { formatDateToDDMMYYYY } from "../../../functions/Dates";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShowOnlyTwo } from "../../../functions/Strings";

function UserNavbar() {
  const { isCompany, isTalent, data } = useSelector((state) => state.users);
  const socket = useSelector((state) => state.users.socket);
  const [current, setCurrent] = useState("");

  const [notifs, setNotifs] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorNT, setAnchorNT] = React.useState(null);
  const openNT = Boolean(anchorNT);
  const handleClickNT = (event) => {
    setAnchorNT(event.currentTarget);
  };
  const handleCloseNT = () => {
    setAnchorNT(null);
  };

  const logout_handler = () => {
    dispatch(logout());
  };

  const navigate = useNavigate();

  const MakeDiscussionMutation = useMutation(GetNotifs, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      setNotifs(data?.notifications);
    },
  });

  useEffect(() => {
    MakeDiscussionMutation.mutate();
  }, []);

  useEffect(() => {
    if (socket && data) {
      socket.emit("join-notifs", data?._id);
    }
  }, [socket, data]);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        console.log("notifs", data);
        setNotifs((prevNotifs) => [data?.data, ...prevNotifs]);
      });
    }
  }, [socket]);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
    <div className={styles["main"]}>
      <div className={styles["navbar"]}>
        <NavLink to="/">
          <img className={styles["logo"]} src={logo} alt="" />
        </NavLink>

        {isCompany && (
          <div className={styles["mid-links"]}>
            <span
              className={`
            ${styles["mid-link"]} 
            ${current === "/overview" ? styles["current"] : ""}`}
            >
              <NavLink to="/overview">Overview</NavLink>
            </span>

            <span
              className={`
            ${styles["mid-link"]} 
            ${current === "/company_jobs" ? styles["current"] : ""}`}
            >
              <NavLink to="/company_jobs">Jobs</NavLink>
            </span>

            <span
              className={`
            ${styles["mid-link"]} 
            ${current === "/manage_applicants" ? styles["current"] : ""}
            `}
            >
              <NavLink to="/manage_applicants">Manage Applicants</NavLink>
            </span>
          </div>
        )}

        <div className={styles["links"]}>
          {isCompany && (
            <div
              className={styles["icon"]}
              onClick={() => navigate("/emp_writing_to_talent")}
            >
              <img src={mail_icon} alt="" />
              <span>0</span>
            </div>
          )}
          {isTalent && (
            <div
              className={styles["icon"]}
              onClick={() => navigate("/reply_to_emp")}
            >
              <img src={mail_icon} alt="" />
              <span>0</span>
            </div>
          )}

          <div className={styles["icon"]} onClick={handleClickNT}>
            <img src={ring_icon} alt="" />
            <span>{notifs.length}</span>
          </div>

          {isTalent && (
            <div className={styles["user"]} onClick={handleClick}>
              {isCompany && ShowOnlyTwo(data?.name)}
              {isTalent && ShowOnlyTwo(`${data?.firstName} ${data?.sureName}`)}
            </div>
          )}

          {isCompany && (
            <div className={styles["company"]} onClick={handleClick}>
              <img src={data?.logo_photo} alt="" />
            </div>
          )}

          {notifs.length !== 0 && (
            <Menu
              anchorEl={anchorNT}
              open={openNT}
              onClose={handleCloseNT}
              // disableScrollLock={true}
              classes={{ list: styles.menu }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                elevation: 0,
                style: {
                  width: 400,
                },
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
                    right: 10,
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
              {notifs.reverse().map((notif, key) => {
                return (
                  <div key={key} className={styles["notif"]}>
                    <span>{notif.description}</span>
                    <span className={styles["date"]}>
                      {formatDateToDDMMYYYY(notif.createdAt)}
                    </span>
                  </div>
                );
              })}
            </Menu>
          )}

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
                  right: 20,
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
              className={styles["link"]}
              onClick={() => {
                navigate("/edit_company_profile");
              }}
            >
              <img src={settings_icon} alt="" />
              <span>Account Settings</span>
            </div>
            {isCompany && (
              <div
                className={styles["link"]}
                onClick={() => navigate("/pricing_and_billing")}
              >
                <img src={wallet_icon} alt="" />
                <span>Pricing, Payment & Billings</span>
              </div>
            )}

            <div className={styles["link"]} onClick={() => navigate("/fqa")}>
              <img src={questions_icon} alt="" />
              <span>FAQs</span>
            </div>
            <div className={styles["link"]} onClick={logout_handler}>
              <img src={logout_icon} alt="" />
              <span>Sign Out</span>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;
