import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import { H1 } from "../../components/typos/H/H";
import Input from "../../components/inputs/Input";
import Select from "../../components/inputs/Select";

import c1 from "../../assets/images/CA/c1.svg";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import { useNavigate } from "react-router-dom";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";
import { steps } from "./SelectData";
import CheckBox from "../../components/CheckBox/CheckBox";

import { Formik } from "formik";
import { Form, W50 } from "../../components/Form/Form";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { talent_jobs } from "../../redux/ProfCreat.reducer";

import { FormikHelper } from "../../functions/FormikHelper";
import {
  getAllCountries,
  getCitysByCountry,
} from "../../assets/jsons/ThirdAccessor";
import Radios from "../../components/Radios/Radios";

const talentSchema = Yup.object().shape({
  job_title: Yup.string().required(),
  employ: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
  start_date: Yup.date().required(),
  end_date: Yup.date().required(),
  // job_description: Yup.string().required(),
  work_here: Yup.boolean().optional(),
});

const initialValues = {
  job_title: "",
  employ: "",
  city: "",
  country: "",
  start_date: new Date(),
  end_date: new Date(),
  // job_description: "",
  work_here: false,
};

function WrokHistory() {
  const navigare = useNavigate();
  const dispatch = useDispatch();
  const [old_state, setold_state] = useState(null);
  const [countries, setCountries] = useState([]);
  const ref_fn = useRef(null);

  const old_data = useSelector((state) => state.profile.talent_profile.jobs);
  const job_index = useSelector((state) => state.profile.job_index);

  const Next = (values) => {
    dispatch(talent_jobs(values));
    navigare("/job_description");
  };

  const Back = () => {
    navigare("/ca_start_history");
  };

  useEffect(() => {
    setCountries(getAllCountries());
  }, []);

  useEffect(() => {
    // old_data.length === job_index  ===> a new element to add
    console.log(old_data);
    if (old_data.length !== job_index) {
      let job = old_data[job_index];
      console.log(job);
      setold_state({
        job_title: job.job_title,
        employ: job.employ,
        city: job.city,
        country: job.country,
        start_date: job.start_date,
        end_date: job.end_date,
        // job_description: "",
        work_here: job.work_here,
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
      <StepperNav steps={steps} current={1} />
      <div className={styles["content"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>Tell us about your most recent job</H1>
        <p className={styles["p"]}>We will start there and move backward</p>

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
              <W50>
                <Input
                  label="Job Title"
                  icon={null}
                  name="job_title"
                  placeholder="e.g. Sales Representative"
                />
              </W50>

              <W50>
                <Input
                  label="Employer"
                  icon={null}
                  name="employ"
                  placeholder="e.g. Apple"
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
                  label="Start Date"
                  icon={null}
                  name="start_date"
                  placeholder="e.g. 05/02/2018"
                  type="date"
                />
              </W50>

              <W50>
                <Input
                  label="End Date"
                  icon={null}
                  name="end_date"
                  placeholder="e.g. 05/02/2020"
                  type="date"
                />
              </W50>

              <W50></W50>

              <W50>
                <CheckBox label="I currently work there" name="work_here" />
              </W50>

              <div className={styles["btn-container"]}>
                <BtnOrange
                  is_div
                  onClick={Back}
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

export default WrokHistory;
