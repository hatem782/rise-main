import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";

import email_img from "../../assets/images/contact/email.svg";
import user_img from "../../assets/images/contact/user.svg";

import { Form, W100, W50 } from "../../components/Form/Form";
import Input from "../../components/inputs/Input";
import TextArea from "../../components/inputs/TextArea";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import c from "../../assets/images/enroll/c.svg";
import c2 from "../../assets/images/enroll/c2.svg";

import { Formik } from "formik";
import * as Yup from "yup";

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

function FQA() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
},[])

  return (
    <div className={styles["main"]}>
      <HomeNavbar />
      <div className={styles["content"]}>
        <img src={c} alt="" className={styles["c1"]} />
        <img src={c2} alt="" className={styles["c2"]} />

        <div className={styles["info-part"]}>
          <h2>Frequently asked questions</h2>
          <h3>1. Q: How do I create an account on Rise?</h3>
          <p>
            A: To create an account, click on the "Sign Up" button on our
            homepage and follow the prompts. You will be asked to provide some
            basic information, including your name, email address, and a
            password. After completing the registration process, you'll have
            access to the features and resources available on our platform.
          </p>

          <h3>2. Q: How much does it cost to use Rise?</h3>
          <p>
            A: The platform is free for talent. Rise offers a range of
            subscription plans to cater to the unique needs of employers. We
            provide free access to basic features, while premium plans unlock
            additional tools and resources to enhance your experience. Detailed
            pricing information can be found on our website's pricing page.
          </p>

          <h3>3. Q: How does Rise ensure the quality of job listings?</h3>
          <p>
            A: At Rise, we are committed to maintaining high-quality job
            listings on our platform. We carefully review and verify each job
            posting to ensure that it meets our strict standards. Our team works
            closely with employers to maintain up-to-date and accurate
            information.
          </p>

          <h3>4. Q: What types of assessments does Rise offer?</h3>
          <p>
            A: Rise provides a variety of assessments to help users understand
            their strengths, weaknesses, and areas for growth. These assessments
            cover essential skills, such as problem-solving, communication, and
            teamwork, as well as industry-specific knowledge and abilities.
          </p>

          <h3>5. Q: How do I apply for jobs or internships on Rise?</h3>
          <p>
            A: To apply for jobs or internships, sign up and create profile,
            browse the available listings on our platform, and click the "Apply"
            button for the opportunities that interest you. You may be asked to
            provide additional information or documents, such as a resume or
            cover letter, during the application process.
          </p>

          <h3>6. Q: How does the mentorship program work?</h3>
          <p>
            A: Rise's mentorship program offers connections employers and
            experienced professionals. The program aims to support your
            professional growth and development.
          </p>

          <h3>7. Q: Can I use Rise on my mobile device?</h3>
          <p>
            A: Absolutely! Rise is designed to be responsive and
            mobile-friendly, ensuring a seamless experience across devices. You
            can access our platform and all its features from your smartphone or
            tablet. However, for an optimal experience we advise the use of
            computers or tablets.
          </p>

          <h3>8. Q: How do I update my profile information on Rise?</h3>
          <p>
            A: To update your profile information, log in to your Rise account
            and navigate to the "Profile Overview" section of your dashboard.
            From there, you can edit or update your personal and professional
            details as needed.
          </p>

          <h3>9. Q: How do I manage my notification preferences on Rise?</h3>
          <p>
            A: To manage your notification preferences, log in to your Rise
            account, and visit the "Settings and Privacy" section. Here, you can
            customize your preferences, including email notifications and alerts
            related to job opportunities, messages, and platform updates.’
          </p>

          <h3>
            10. Q: I have a question that isn't answered here. How can I contact
            Rise support?
          </h3>
          <p>
            A: If you have a question or concern that isn't addressed in our
            FAQs, please don't hesitate to reach out to our support team. You
            can contact us through the "Say Hello" page on our website. We're
            always here to help!
          </p>

          <br />
          <br />
          <h2>Contact us if you have any further questions</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={contactShema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, setFieldValue }) => (
              <Form
                onSubmit={handleSubmit}
                className={styles.form}
                method="post"
              >
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
      <MainFooter />
    </div>
  );
}

export default FQA;

/*










*/
