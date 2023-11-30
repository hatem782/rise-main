import React from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";

import TextArea from "../../components/inputs/TextArea";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import { Formik } from "formik";
import * as Yup from "yup";
import c3 from "../../assets/images/enroll/c3.svg";
import { Form, W100 } from "../../components/Form/Form";
import { toast } from "react-hot-toast";
import { height } from "@mui/system";
const contactShema = Yup.object().shape({
//
  message: Yup.string().required(),
});

const initialValues = {

  message: "", //
};

function EnrollToRAP_SendMobile() {
  const handleSubmit = (values) => {
    toast.success('We have receivied your message, Thank you !')
  }; 
  return (
    <div className={styles["main"]}>
      <HomeNavbar />
      <div className={styles["content"]}>
        <img src={c3} alt="" className={styles["c3"]} />
        <div className={styles["info-container"]}>
          <h1>
            Hello & <br /> Welcome
          </h1>

          <p>In 500 words tell us what excites you about the program</p>
          <Formik
          initialValues={initialValues}
          validationSchema={contactShema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} method="post" className={styles.form}>
                <W100>
                  <div className={styles["height-area"]}>
                    <TextArea
                      className={styles.input}
                      label="Message"
                      icon={null}
                      name="message"
                      placeholder="Message"
                      rows={10}
                    />
                  </div>
              </W100>
              </Form>
          )}
              </Formik>
        
          <div className={styles["btn-container"]}>
            <BtnOrange type="submit">Rise Now</BtnOrange>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default EnrollToRAP_SendMobile;
