import React from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import c1 from "../../assets/images/enroll/c1_mob.png";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import { Formik } from "formik";
import * as Yup from "yup";
import c3 from "../../assets/images/enroll/c3.svg";
import c1Mb from "../../assets/images/enroll/c1-mb.svg";
import { Form, W100 } from "../../components/Form/Form";
import HomeNavbarMobile from "../../layouts/navbar-mobile/HomeNavbar/HomeNavbar";
import MainMobileFooter from "../../layouts/Footers/mobileFooter/MainFooter";
import { FormMobile } from "../../components/Form-mobile/Form";
import TextAreaMobile from "../../components/inputs-mobile/TextArea";
import user_img from "../../assets/images/enroll/mobile.png";

const contactShema = Yup.object().shape({
//
  message: Yup.string().required(),
});

const initialValues = {

  message: "", //
};

function EnrollToRAP_SendMobile() {
  const handleSubmit = (values) => {
    console.log(values);
  }; 
  return (
    <div className={styles["main"]}>
      <HomeNavbarMobile />
      <div className={styles["content"]}>
        <div className={styles["info-container"]}>
        <div className={styles['container-main']}>
          <h1>
            Hello & <br /> Welcome
          </h1>

          <Formik
          initialValues={initialValues}
          validationSchema={contactShema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <FormMobile onSubmit={handleSubmit} method="post" className={styles.formmFormMobilemobile}>
                <W100>
                <TextAreaMobile
                  className={styles.input}
                  label="Message"
                  icon={null}
                  name="message"
                  placeholder="Message"
                  rows={10}
                  noLabel={true}
                />
              </W100>
              </FormMobile>
          )}
              </Formik>
        
          <div className={styles["btn-container"]}>
            <BtnOrange size="medium-mb-100" >Rise Now</BtnOrange>
          </div>
          <img src={c1} alt="" className={styles["c2"]} />
          <img src={c1Mb} alt="" className={styles["c1"]} />

        </div>
        </div>
          <img className={styles["img"]} src={user_img} alt="" />

      </div>
      <MainMobileFooter />
    </div>
  );
}

export default EnrollToRAP_SendMobile;
