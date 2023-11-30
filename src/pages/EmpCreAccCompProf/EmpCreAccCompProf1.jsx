import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import TitleUnderLined from "../../components/typos/TitleUnderLined/TitleUnderLined";
import Input from "../../components/inputs/Input";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import c1 from "../../assets/images/emp_cre_acc_comp/c1.png";
import c2 from "../../assets/images/emp_cre_acc_comp/c2.png";
import arrow from "../../assets/images/emp_cre_acc_comp/flesh.svg";

import icon_email from "../../assets/svgs/inputs/email.svg";
import icon_eye from "../../assets/svgs/inputs/eye.svg";

import { useNavigate } from "react-router-dom";
import InputPhone from "../../components/inputs/Phone";
import Select from "../../components/inputs/Select";

import { created_ats, emps_numbers } from "./SelectData";
import { H1 } from "../../components/typos/H/H";

import { Formik } from "formik";
import { Form, W100, W50 } from "../../components/Form/Form";

import { validationSchema, initialValues } from "./validation";
import { useDispatch } from "react-redux";
import { emp_part1 } from "../../redux/ProfCreat.reducer";
import Radios from "../../components/Radios/Radios";
import { useMutation } from "@tanstack/react-query";
import { existMail } from "../../services/Auth.serv";
import { toast } from "react-hot-toast";

import CheckBox from "../../components/CheckBox/CheckBox";

import industry from "../../assets/jsons/industry.json";

import {
  getAllCountries,
  getCitysByCountry,
} from "../../assets/jsons/ThirdAccessor";

import PopupWithText from "../Popups/PopupWithText/PopupWithText";
import usePopup from "../../hooks/usePupup";

function EmpCreAccCompProf1() {
  return (
    <div>
      <HomeNavbar />
      <Content />
      <MainFooter />
    </div>
  );
}
const Content = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);

  const [open, handle_open, handle_close] = usePopup();

  useEffect(() => {
    setCountries(getAllCountries());
  }, []);

  // ENCHAINEMENT DES FONCTION : STEP1 => STEP2 => STEP3

  // STEP2
  const VerifEmailMutation = useMutation(existMail, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      console.log(data);
      if (!data.exist) {
        handle_open();
      } else {
        toast.error("mail already exist");
      }
    },
  });

  // STEP1
  const handle_submit = (values) => {
    dispatch(emp_part1(values));
    VerifEmailMutation.mutate(values.email);
  };

  // STEP3
  const OnPopupClose = () => {
    navigate("/comp_prof_info");
  };

  return (
    <div className={styles["main"]}>
      <TitleUnderLined>Company Profile Info: (Step 1 of 2)</TitleUnderLined>
      <img src={c1} alt="" className={styles["c1"]} />
      <img src={c2} alt="" className={styles["c2"]} />
      <div className={styles["main-content"]}>
        <H1 className={styles.h1}>Register and discover talent</H1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handle_submit}
        >
          {({ handleSubmit, values }) => (
            <Form
              className={styles["form"]}
              onSubmit={handleSubmit}
              method="post"
            >
              <W50>
                <Input
                  label="Company Name"
                  icon={null}
                  name="name"
                  placeholder="e.g.Paul"
                />
              </W50>

              <W50>
                <Radios
                  name="type"
                  options={[
                    { name: "Employer", value: "Employer" },
                    { name: "Recruiter", value: "Recruiter" },
                  ]}
                />
              </W50>

              <W50>
                <Select
                  label="Year Created"
                  name="year"
                  placeholder="e.g. 2005"
                  options={created_ats}
                  editable={false}
                />
              </W50>

              <W50>
                <Select
                  label="Number of employees"
                  name="number"
                  placeholder="e.g.  Below 10, 10-50"
                  options={emps_numbers}
                  editable={false}
                />
              </W50>

              <W50>
                <InputPhone
                  label="Telephone Number"
                  icon={null}
                  name="telephoneNumber"
                  select_name="telephoneNumber_location"
                  placeholder="e.g.  58 217 529"
                />
              </W50>

              <W50>
                <Input
                  label="E-mail Address"
                  icon={icon_email}
                  name="email"
                  // placeholder="e.g. company_name@email.com"
                />
              </W50>

              <W50>
                <Select
                  label="Country"
                  icon={null}
                  name="country"
                  placeholder="e.g. Kenya"
                  options={countries}
                  editable={false}
                />
              </W50>

              <W50>
                <Select
                  label="City"
                  icon={null}
                  name="city"
                  placeholder="e.g. Naiorbi"
                  options={getCitysByCountry(values.country)}
                  editable={false}
                />
              </W50>

              <W50>
                <Input
                  label="Certificate of incorporation  Number."
                  icon={null}
                  name="certification"
                  placeholder="PVT-5jumqa3"
                />
              </W50>

              <W50>
                <Input
                  label="Add company url"
                  icon={null}
                  name="url"
                  placeholder="https//www.company.url"
                />
              </W50>

              <W100>
                <Input
                  label="Company LinkedIn"
                  icon={null}
                  name="urlLinkedIn"
                  placeholder="https //www.linkedin.com"
                />
              </W100>

              <W50>
                <Select
                  label="Industry"
                  icon={null}
                  name="intPresence"
                  placeholder="1.Aerospace and Aviation"
                  options={industry}
                  editable={false}
                />
              </W50>

              <W50>
                <Input
                  label="Head  office Location "
                  icon={null}
                  name="headOffice"
                  placeholder="Dubai, UAE"
                />
              </W50>

              <W50>
                <Input
                  label="Create password"
                  name="password"
                  placeholder=""
                  icon={icon_eye}
                  type="password"
                />
              </W50>

              <W50></W50>

              <W50>
                <Input
                  label="Confirm password"
                  icon={icon_eye}
                  name="passwordConfirmation"
                  placeholder=""
                  type="password"
                />
              </W50>

              <div className={styles["terms"]}>
                <CheckBox name="accept" />
                <span>
                  I agree to the Rise{" "}
                  <span className={styles["orange"]} onClick={(_=>navigate('/privacy.policy'))}>Terms of use</span> and{" "}
                  <span className={styles["orange"]} onClick={(_=>navigate('/privacy.policy'))}>Privacy Policy</span>
                </span>
              </div>

              <BtnOrange className={styles["next"]}>
                Next <img src={arrow} alt="" />
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
        text="An email verification link has been sent to your account. Go to your inbox and verify."
      />
    </div>
  );
};

export default EmpCreAccCompProf1;
