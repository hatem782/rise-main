import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import { H1 } from "../../components/typos/H/H";
import InputWithRates from "../../components/inputs/InputWithRates";

import c1 from "../../assets/images/CA/c1.svg";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import { useNavigate } from "react-router-dom";
import Plus from "../../components/buttons/Plus/Plus";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";
import { steps } from "./SelectData";

import { FieldArray, Formik } from "formik";
import { Form } from "../../components/Form/Form";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { talent_skills } from "../../redux/ProfCreat.reducer";
import { FormikHelper } from "../../functions/FormikHelper";

const talentSchema = Yup.object().shape({
  skills: Yup.array()
    .of(Yup.string().required("skill is required"))
    .min(1, "At least one skill is required")
    .required("Skills array is required"),
});

const initialValues = {
  skills: [""],
};

function CA_Skills() {
  const navigare = useNavigate();
  const dispatch = useDispatch();
  const [old_state, setold_state] = useState(null);
  const ref_fn = useRef(null);

  const old_data = useSelector((state) => state.profile.talent_profile);

  console.log(old_data);

  const Next = (values) => {
    console.log(values);
    dispatch(talent_skills(values.skills));
    navigare("/summary_career");
  };

  const Back = () => {
    navigare("/ca_start_skills");
  };

  useEffect(() => {
    console.log(old_data);
    if (old_data.skills.length) {
      setold_state({
        skills: old_data.skills, //
      });
    }
  }, [old_data]);

  useEffect(() => {
    if (old_state) {
      ref_fn.current.click();
    }
  }, [old_state]);

  return (
    <div className={`${styles["main"]} ${styles["main-skills"]}`}>
      <StepperNav steps={steps} current={3} />
      <div className={styles["content"]}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>
          What skills would you like to highlight?
        </H1>
        <br />
        <br />
        <p className={styles["p"]}>Highlight your relevant skills</p>

        <Formik
          initialValues={initialValues}
          validationSchema={talentSchema}
          onSubmit={Next}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit} method="post" className={styles.form}>
              <div
                ref={ref_fn}
                onClick={() => {
                  FormikHelper(setFieldValue, old_state);
                }}
              />
              <div className={styles["title"]}> Skills </div>

              <FieldArray name="skills">
                {({ push, remove }) => (
                  <>
                    {values.skills.map((_, key) => {
                      return (
                        <div key={key} className={styles["w03"]}>
                          <InputWithRates
                            icon={null}
                            name={`skills[${key}]`}
                            placeholder="e.g. Written communication"
                            onDelete={remove}
                            // onRateChange={handle_rate_change}
                            // value={item}
                            // index={key}
                          />
                        </div>
                      );
                    })}
                    <div className={styles["at-end"]}>
                      <Plus onClick={() => push("")}>Add One More</Plus>
                    </div>
                  </>
                )}
              </FieldArray>

              <div className={styles["btn-container"]}>
                <BtnOrange
                  onClick={Back}
                  is_div
                  className={`${styles["btn"]} ${styles["btn-black"]}`}
                >
                  Back
                </BtnOrange>
                <BtnOrange className={`${styles["btn"]}`}>
                  Next: Summary
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

export default CA_Skills;
