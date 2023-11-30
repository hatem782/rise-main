import React from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";

import smile_img from "../../assets/images/contact/smile.svg";
import email_img from "../../assets/images/contact/email.svg";
import user_img from "../../assets/images/contact/user.svg";

import { Form, W100, W50 } from "../../components/Form/Form";
import Input from "../../components/inputs/Input";
import TextArea from "../../components/inputs/TextArea";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import c1 from "../../assets/images/contact/c1.svg";
import c2 from "../../assets/images/contact/c2.svg";

import { Formik } from "formik";
import * as Yup from "yup";
import HomeNavbarMobile from "../../layouts/navbar-mobile/HomeNavbar/HomeNavbar";
import MainMobileFooter from "../../layouts/Footers/mobileFooter/MainFooter";

const contactShema = Yup.object().shape({
  firstName: Yup.string().required(), //
  sureName: Yup.string().required(), //
  email: Yup.string().email().required(), //
  message: Yup.string().required(),
});

const initialValues = {
  firstName: "", //
  sureName: "", //
  email: "", //
  message: "", //
};

function ContactUsMobile() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className={styles["main"]}>
      <HomeNavbarMobile />
      <div className={styles["content"]}>
      <div className={styles["contact-part"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <img src={c2} className={styles["c2"]} alt="" />

        <div className={styles["head"]}>
          <h1>Hello</h1>
          <img src={smile_img} alt="" />
        </div>
        <p className={styles["desc"]}>
          At Rise, we're all about empowering you. We'd be happy to hear more
          about your requirements and respond to any inquiries you might
          have. Send us a message, and we'll work together to identify
          the ideal solution for you.
          <a href="team@beenrising.com">team@beenrising.com</a>
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={contactShema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} method="post" className={styles.form}>
              <W50>
                <Input
                  className={styles.input}
                  label="First Name"
                  name="firstName"
                  placeholder="First Name"
                  icon={user_img}
                />
              </W50>

              <W50>
                <Input
                  className={styles.input}
                  label="Last Name"
                  icon={user_img}
                  name="sureName"
                  placeholder="Last Name"
                />
              </W50>

              <W100>
                <Input
                  className={styles.input}
                  label="Adresse e-mail"
                  icon={email_img}
                  name="email"
                  placeholder="Adresse e-mail"
                />
              </W100>

              <W100>
                <TextArea
                  className={styles.input}
                  label="Message"
                  icon={null}
                  name="message"
                  placeholder="Message"
                  rows={10}
                />
              </W100>

              <W100>
                <BtnOrange type="submit" className={styles.btn}>
                  Send
                </BtnOrange>
              </W100>
            </Form>
          )}
        </Formik>
      </div>
      </div>
      <MainMobileFooter />
    </div>
  );
}

export default ContactUsMobile;
