import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import { H1 } from "../../components/typos/H/H";
import Input from "../../components/inputs/Input";
import Select from "../../components/inputs/Select";

import c1 from "../../assets/images/CA/c1.svg";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import { useNavigate } from "react-router-dom";

import { degrees, steps } from "./SelectData";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";
import CheckBox from "../../components/CheckBox/CheckBox";

import { Form, W25, W50 } from "../../components/Form/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { talent_education } from "../../redux/ProfCreat.reducer";
import { FormikHelper } from "../../functions/FormikHelper";

const talentSchema = Yup.object().shape({
  school_name: Yup.string().required("school name is required"),
  school_location: Yup.string().required(),
  degree: Yup.string().required(),
  field: Yup.string().required(),
  grad_start_date: Yup.date().required(),
  grad_end_date: Yup.date().required(),
});

const initialValues = {
  school_name: "",
  school_location: "",
  degree: "",
  field: "",
  grad_start_date: "",
  grad_end_date: "",
};

function Education() {
  const navigare = useNavigate();
  const dispatch = useDispatch();
  const [old_state, setold_state] = useState(null);
  const ref_fn = useRef(null);

  const old_data = useSelector(
    (state) => state.profile.talent_profile.education
  );
  const educ_index = useSelector((state) => state.profile.educ_index);

  const Next = (values) => {
    dispatch(talent_education(values));
    navigare("/education_summary");
  };

  const Back = () => {
    navigare("/ca_start_education");
  };

  useEffect(() => {
    // old_data.length === educ_index  ===> a new element to add
    console.log(old_data);
    if (old_data.length !== educ_index) {
      let educ = old_data[educ_index];
      console.log(educ);
      setold_state({
        school_name: educ.school_name,
        school_location: educ.school_location,
        degree: educ.degree,
        field: educ.field,
        grad_start_date: educ.grad_start_date,
        grad_end_date: educ.grad_end_date,
      });
    }
  }, [old_data]);

  useEffect(() => {
    if (old_state) {
      ref_fn.current.click();
    }
  }, [old_state]);

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={2} />
      <div className={styles["content"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>Tell us about your education</H1>
        <p className={styles["p"]}>
          Include every school, even if you’re still there or didn’t graduate.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={talentSchema}
          onSubmit={Next}
        >
          {({ handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit} method="post">
              <div
                ref={ref_fn}
                onClick={() => {
                  FormikHelper(setFieldValue, old_state);
                }}
              />
              <W50>
                <Input
                  label="School Name"
                  icon={null}
                  name="school_name"
                  placeholder="e.g. Watford"
                />
              </W50>

              <W50>
                <Input
                  label="School location"
                  icon={null}
                  name="school_location"
                  placeholder="e.g. Apple"
                />
              </W50>

              <W50>
                <Select
                  label="Degree"
                  icon={null}
                  name="degree"
                  placeholder="Select"
                  options={degrees}
                />
              </W50>

              <W50></W50>

              <W50>
                <Input
                  label="Field of study "
                  icon={null}
                  name="field"
                  placeholder="e.g. Accounting"
                />
              </W50>

              <W25>
                <Input
                  label="Graduation Start date"
                  icon={null}
                  name="grad_start_date"
                  placeholder="e.g. 05/02/2020"
                  type="date"
                />
              </W25>

              <W25>
                <Input
                  label="Graduation End Date"
                  icon={null}
                  name="grad_end_date"
                  placeholder="e.g. 05/02/2020"
                  type="date"
                />
              </W25>

              <W50></W50>

              {/* <W50>
                <CheckBox label="I currently work there" />
              </W50> */}

              <div className={styles["btn-container"]}>
                <BtnOrange
                  onClick={Back}
                  is_div
                  className={`${styles["btn"]} ${styles["btn-black"]}`}
                >
                  Back
                </BtnOrange>
                <BtnOrange type="submit" className={`${styles["btn"]}`}>
                  Next
                </BtnOrange>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <MainFooter />
    </div>
  );
}

export default Education;
