import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import TitleUnderLined from "../../components/typos/TitleUnderLined/TitleUnderLined";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import c1 from "../../assets/images/emp_cre_acc_comp/c1.png";
import c2 from "../../assets/images/emp_cre_acc_comp/c2.png";
import arrow from "../../assets/images/emp_cre_acc_comp/flesh.svg";
import Upload from "../../components/inputs/Upload";
import TextArea from "../../components/inputs/TextArea";
import { H1 } from "../../components/typos/H/H";
import { Form, W100, W50 } from "../../components/Form/Form";
import { Formik } from "formik";

import { initialValues, validationSchema } from "./validation2";
import { useDispatch, useSelector } from "react-redux";
import { createCompProfile } from "../../redux/ProfCreat.reducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import PopupWithText from "../Popups/PopupWithText/PopupWithText";
import usePopup from "../../hooks/usePupup";
import { emps_numbers_pars } from "./SelectData";

function EmpCreAccCompProf2() {
  return (
    <div>
      <HomeNavbar />
      <Content />
      <MainFooter />
    </div>
  );
}

const Content = () => {
  const dispatch = useDispatch();
  const data1 = useSelector((state) => state.profile.data1);
  const navigate = useNavigate();
  const [open, handle_open, handle_close] = usePopup();

  useEffect(() => {
    if (data1 === null) {
      // From 1 is missing
      navigate("/emp_cre_acc_comp_prof");
    }
  }, [data1]);

  const handle_submit = (data2) => {
    const actual_data = { ...data1, ...data2 };
    actual_data.telephoneNumber = `${actual_data.telephoneNumber_location} ${actual_data.telephoneNumber}`;
    // actual_data.number = `${emps_numbers_pars[actual_data.number]}`;
    delete actual_data.telephoneNumber_location;
    delete actual_data.passwordConfirmation;
    delete actual_data.accept;
    dispatch(createCompProfile(actual_data)).then((resp) => {
      if (resp.payload.status === 200) {
        toast.success("Compte created successfully");
        handle_open();
      }
    });
  };

  const OnPopupClose = () => {
    navigate("/");
  };

  return (
    <div className={styles["main"]}>
      <TitleUnderLined>Company Profile Info: (Step 2 of 2)</TitleUnderLined>
      <img src={c1} alt="" className={styles["c1"]} />
      <img src={c2} alt="" className={styles["c2"]} />
      <div className={styles["main-content"]}>
        <H1 className={styles.h1}>Add more detail</H1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handle_submit}
        >
          {({ handleSubmit }) => (
            <Form className={styles.form} onSubmit={handleSubmit} method="post">
              <W50 className={styles["w05"]}>
                <Upload
                  label="Logo"
                  label2=" Upload Your Logo "
                  name="cover_photo"
                />
              </W50>

              <W50>
                <Upload
                  label="Cover image"
                  label2="Upload your picture"
                  name="logo_photo"
                />
              </W50>

              <W100>
                <TextArea
                  label="About"
                  icon={null}
                  name="about"
                  placeholder="About"
                  type="password"
                  rows={15}
                />
              </W100>

              <BtnOrange className={styles["next"]}>
                Complete Company Profile
              </BtnOrange>
            </Form>
          )}
        </Formik>
      </div>
      <PopupWithText
        // auto_close
        with_close
        onClose={OnPopupClose}
        open={open}
        handleClose={handle_close}
        title="Thank you!"
        text="We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic. By clicking “Accept,“ you agree to our website's cookie use as described in our Cookie Policy. You can change your cookie settings at any time by clicking “Preferences.”"
      />
    </div>
  );
};

export default EmpCreAccCompProf2;
