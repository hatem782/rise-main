import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import c1 from "../../../assets/images/emp_cre_acc_comp/c1.png";
import c2 from "../../../assets/images/emp_cre_acc_comp/c2.png";
import Upload from "../../../components/inputs/Upload";
import TextArea from "../../../components/inputs/TextArea";
import { H1 } from "../../../components/typos/H/H";
import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";

import { Form, W100, W50 } from "../../../components/Form/Form";
import Input from "../../../components/inputs/Input";
import Select from "../../../components/inputs/Select";
import { useMutation } from "@tanstack/react-query";
import { created_ats, emps_numbers, emps_numbers_pars } from "./fakedata";

import icon_email from "../../../assets/svgs/inputs/email.svg";
import icon_eye from "../../../assets/svgs/inputs/eye.svg";
import InputPhone from "../../../components/inputs/Phone";
import { useNavigate } from "react-router-dom";

import { ErrorMessage, Field,Formik } from "formik";
import { validationSchema, initialValues, validationSchemaUpdate, initialValuesUpdate } from "./validation";

import { useDispatch, useSelector } from "react-redux";
import { FormikHelper } from "../../../functions/FormikHelper";
import industry from "../../../assets/jsons/industry.json";

import {
  getAllCountries,
  getCitysByCountry,
} from "../../../assets/jsons/ThirdAccessor";
import { UpdateCompanyProfile, UpdateCompanyProfilePawssword } from "../../../services/Profile.serv";
import * as Yup from "yup";

function CompanyProfileEdit() {
  return (
    <div>
      <UserNavbar />
      <Content />
      <MainFooter />
    </div>
  );
}
const talentSchema = Yup.object().shape({
    password: Yup.string().required(),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Conform Password is required"),
  });

  const initialValuesPwd = {

    password: "", //
    passwordConfirmation: "", //
  };

const Content = () => {
  const [form, setForm] = useState({ ...initialValues });
  const comp_data = useSelector((state) => state.users.data) || initialValues;
  const ref_fn = useRef(null);

  const UpdateMutation = useMutation(UpdateCompanyProfile, {
    onError: (error) => {},
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();
    },
  });
  const UpdateMutationPassword = useMutation(UpdateCompanyProfilePawssword, {
    onError: (error) => {},
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();
    },
  });
  const handle_submit_pwd= (values) => {
    UpdateMutationPassword.mutate(values);
  };

  
  const handle_submit = (values) => {
    let actual_data = { ...values, _id: comp_data._id };
    actual_data.telephoneNumber = `${actual_data.telephoneNumber_location} ${actual_data.telephoneNumber}`;
    delete actual_data.telephoneNumber_location;
    delete actual_data.password;
    delete actual_data.passwordConfirmation;
    console.log(actual_data);
    UpdateMutation.mutate(actual_data);
  };

  useEffect(() => {
    let [reg, code, number] = comp_data?.telephoneNumber.split(" ");

    setForm({
      name: comp_data?.name,
      type: comp_data?.type,
      year: comp_data?.year,
      number: comp_data?.number,
      telephoneNumber: number,
      telephoneNumber_location: `${reg} ${code}`,
      email: comp_data?.email,
      country: comp_data?.country,
      city: comp_data?.city,
      certification: comp_data?.certification,
      url: comp_data?.url,
      urlLinkedIn: comp_data?.urlLinkedIn,
      intPresence: comp_data?.intPresence,
      headOffice: comp_data?.headOffice,
      // password: "",
      // passwordConfirmation: "",
      about: comp_data?.about,
      cover_photo: comp_data?.cover_photo,
      logo_photo: comp_data?.logo_photo,
    });
  }, [comp_data]);

  useEffect(() => {
    if (form) {
      console.log(form);
      ref_fn.current.click();
    }
  }, [form]);

  return (
    <div className={styles["main"]}>
      <img src={c1} alt="" className={styles["c1"]} />
      <img src={c2} alt="" className={styles["c2"]} />
      <div className={styles["main-content"]}>
        <H1 className={styles.h1}>Account Edit </H1>
        <Formik
          initialValues={initialValuesUpdate}
          validationSchema={validationSchemaUpdate}
          onSubmit={handle_submit}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form className={styles["form"]} onSubmit={handleSubmit}>
              <div
                style={{ display: "none" }}
                ref={ref_fn}
                onClick={() => {
                  FormikHelper(setFieldValue, form);
                }}
              />
              <W50>
                <Input
                  className={styles.input}
                  label="Company Name"
                  icon={null}
                  name="name"
                  placeholder="e.g.Paul"
                />
              </W50>

              <W50 />

              <W50>
                <Upload
                  label="Logo"
                  label2=" Upload Your Logo "
                  name="logo_photo"
                  className={styles.upload}
                />
              </W50>

              <W50>
                <Upload
                  label="Cover image"
                  label2="Upload your picture"
                  name="cover_photo"
                  className={styles.upload}
                />
              </W50>

              <W100>
                <TextArea
                  className={styles.input}
                  label="About"
                  icon={null}
                  name="about"
                  placeholder="About"
                  rows={15}
                />
              </W100>

              <W50>
                <Select
                  className={styles.input}
                  label="Year Created"
                  name="year"
                  placeholder="e.g. 2005"
                  options={created_ats}
                />
              </W50>

              <W50>
                <Select
                  className={styles.input}
                  label="Number of employees"
                  name="number"
                  placeholder="e.g.  Below 10, 10-50"
                  options={emps_numbers}
                />
              </W50>

              <W50>
                <InputPhone
                  label="Telephone Number"
                  icon={null}
                  name="telephoneNumber"
                  select_name="telephoneNumber_location"
                  placeholder="e.g.  00 000 000"
                  val_updt_location={
                    form.telephoneNumber_location.split(" ")[1]
                  }
                />
              </W50>

              <W50>
                <Input
                  className={styles.input}
                  label="E-mail Address"
                  icon={icon_email}
                  name="email"
                  placeholder="e.g. company_name@email.com"
                />
              </W50>

              <W50>
                <Select
                  label="Country"
                  icon={null}
                  name="country"
                  placeholder="e.g. Kenya"
                  options={getAllCountries()}
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
                  className={styles.input}
                  label="Certificate of incorporation  Number."
                  icon={null}
                  name="certification"
                  placeholder="PVT-5jumqa3"
                />
              </W50>

              <W50>
                <Input
                  className={styles.input}
                  label="Add company url"
                  icon={null}
                  name="url"
                  placeholder="https //www.company.url"
                />
              </W50>

              <W100>
                <Input
                  className={styles.input}
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
                  className={styles.input}
                  label="Head  office Location "
                  icon={null}
                  name="headOffice"
                  placeholder="Dubai, UAE"
                />
              </W50>



              <BtnOrange className={styles["next"]} type="submit">  Save changes</BtnOrange>
            </Form>
          )}
        </Formik>
      </div>
      <div className={styles["main-content"]}>
        <H1 className={styles.h1}>Password Edit </H1>
        <Formik
            initialValues={initialValuesPwd}
            validationSchema={talentSchema}
            onSubmit={handle_submit_pwd}
            >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className={styles["form"]}>
               <W50>
                <Input
                  className={styles.input}
                  label="Create password"
                  name="password"
                  placeholder=""
                  icon={icon_eye}
                  type="password"
                />
              </W50>

              <W50 />

                <W50>
                <Input
                  className={styles.input}
                  label="Confirm password"
                  icon={icon_eye}
                  name="passwordConfirmation"
                  placeholder=""
                  type="password"
                />
              </W50>

                <BtnOrange type="submit" className={styles["next"]}> Continue </BtnOrange>
                </Form>
            )}
            </Formik>
      </div>
    </div>
  );
};

export default CompanyProfileEdit;
