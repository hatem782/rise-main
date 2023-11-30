import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import { H1 } from "../../components/typos/H/H";
import Input from "../../components/inputs/Input";

import c1 from "../../assets/images/CA/c1.svg";
import Plus from "../../components/buttons/Plus/Plus";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import { useNavigate } from "react-router-dom";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";

import { steps } from "./SelectData";

import { Form, W100, W25, W50 } from "../../components/Form/Form";
import { Formik } from "formik";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { talent_general } from "../../redux/ProfCreat.reducer";
import { useMutation } from "@tanstack/react-query";
import { existMail } from "../../services/Auth.serv";
import { toast } from "react-hot-toast";
import { FormikHelper } from "../../functions/FormikHelper";
import {
  getAllCountries,
  getCitysByCountry,
} from "../../assets/jsons/ThirdAccessor";

import Select from "../../components/inputs/Select";

const talentSchema = Yup.object().shape({
  firstName: Yup.string().required(), //
  sureName: Yup.string().required(), //
  profession: Yup.string().required(), //
  city: Yup.string().required(), //
  country: Yup.string().required(), //
  postal_code: Yup.string().required(), //
  phone: Yup.string().required(), //
  email: Yup.string().email().required(), //
  password: Yup.string().required(),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Conform Password is required"),
});

const initialValues = {
  firstName: "", //
  sureName: "", //
  profession: "", //
  city: "", //
  country: "", //
  postal_code: "", //
  phone: "", //
  email: "", //
  password: "", //
  confirmPass: "", //
};

function CA_Profile() {
  const navigare = useNavigate();
  const dispatch = useDispatch();
  const [old_state, setold_state] = useState(null);
  const [countries, setCountries] = useState([]);
  const ref_fn = useRef(null);

  const old_data = useSelector((state) => state.profile.talent_profile);

  const VerifEmailMutation = useMutation(existMail, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      console.log(data);
      if (!data.exist) {
        navigare("/ca_start_history");
      } else {
        toast.error("mail already exist");
      }
    },
  });

  const Next = (values) => {
    dispatch(talent_general(values));
    VerifEmailMutation.mutate(values.email);
  };

  useEffect(() => {
    if (old_data.email) {
      setold_state({
        firstName: old_data.firstName, //
        sureName: old_data.sureName, //
        profession: old_data.profession, //
        city: old_data.city, //
        country: old_data.country, //
        postal_code: old_data.postal_code, //
        phone: old_data.phone, //
        email: old_data.email, //
        password: old_data.password, //
        confirmPass: old_data.confirmPass, //
      });
    }
  }, [old_data]);

  useEffect(() => {
    if (old_state) {
      ref_fn.current.click();
    }
  }, [old_state]);

  useEffect(() => {
    setCountries(getAllCountries());
  }, []);

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={0} />
      <div className={styles["content"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>
          What is the best way for employers to contact you ?
        </H1>
        <p className={styles["p"]}>
          We suggest you include a phone number and email address.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={talentSchema}
          onSubmit={Next}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit} method="post">
              <div
                style={{ display: "none" }}
                ref={ref_fn}
                onClick={() => {
                  FormikHelper(setFieldValue, old_state);
                }}
              />

              <W50 className={styles["w05"]}>
                <Input
                  label="First Name"
                  icon={null}
                  name="firstName"
                  placeholder="e.g.Paul"
                />
              </W50>

              <W50>
                <Input
                  label="Surname"
                  icon={null}
                  name="sureName"
                  placeholder="e.g. Jones"
                />
              </W50>

              <W100>
                <Input
                  label="Profession"
                  icon={null}
                  name="profession"
                  placeholder="e.g. Sales Representative"
                />
              </W100>

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

              <W25>
                <Select
                  label="City"
                  icon={null}
                  name="city"
                  placeholder="e.g. Naiorbi"
                  options={getCitysByCountry(values.country)}
                  editable={false}
                />
              </W25>

              <W25>
                <Input
                  label="Postal Code "
                  icon={null}
                  name="postal_code"
                  placeholder="e.g. 00100"
                />
              </W25>

              <W50>
                <Input
                  label="Phone"
                  icon={null}
                  name="phone"
                  placeholder="e.g. +254722000000"
                />
              </W50>

              <W50>
                <Input
                  label="Email"
                  icon={null}
                  name="email"
                  placeholder="e.g. pauljones@jones.com"
                />
              </W50>

              <W50>
                <Input
                  type="password"
                  label="Password"
                  icon={null}
                  name="password"
                  placeholder=""
                />
              </W50>

              <W50>
                <Input
                  type="password"
                  label="Confirm Password"
                  icon={null}
                  name="confirmPass"
                  placeholder=""
                />
              </W50>

              <Plus>Add Social links</Plus>

              <div className={styles["btn-container"]}>
                <div />
                <BtnOrange type="submit">Next : Work history</BtnOrange>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <MainFooter />
    </div>
  );
}

export default CA_Profile;
