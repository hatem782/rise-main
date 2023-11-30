import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import { H1 } from "../../components/typos/H/H";

import c1 from "../../assets/images/CA/c1.svg";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";

import { useNavigate } from "react-router-dom";
import TextEditor from "../../components/ReactQuill/TextEditorQuill";
import StepperNav from "../../layouts/Navbars/StepperNav/StepperNav";
import { steps } from "./SelectData";

import { Formik } from "formik";
import { Form } from "../../components/Form/Form";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { talent_career_description } from "../../redux/ProfCreat.reducer";
import { FormikHelper } from "../../functions/FormikHelper";
import { toast } from "react-hot-toast";

const talentSchema = Yup.object().shape({
  career_description: Yup.string().required(
    "career description is a required field"
  ),
});

const initialValues = {
  career_description:
    "<p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles,</p>",
};

function SummaryCareerObj() {
  const navigare = useNavigate();
  const dispatch = useDispatch();
  const [old_state, setold_state] = useState(null);
  const [nb_changes, setnb_changes] = useState(0);
  const ref_fn = useRef(null);
  const old_data = useSelector((state) => state.profile.talent_profile);

  const Next = (values) => {
    console.log(values);
    if (nb_changes < 2 && !old_state) {
      // the user ddidn't change the text
      toast.error("Write something about yourself the same as the example");
      return;
    }
    dispatch(talent_career_description(values.career_description));
    navigare("/add_other_things");
  };

  const Back = () => {
    navigare("/ca_skills");
  };

  useEffect(() => {
    if (old_data.career_description) {
      setold_state({
        career_description: old_data.career_description, //
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
      <StepperNav steps={steps} current={4} />
      <div className={`${styles["content"]} ${styles["quill"]}`}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>
          Write a summary of your career objectives
        </H1>

        <Formik
          initialValues={initialValues}
          validationSchema={talentSchema}
          onSubmit={Next}
        >
          {({ handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={handleSubmit}
              className={styles.form_quill}
              method="post"
            >
              <div
                ref={ref_fn}
                onClick={() => {
                  FormikHelper(setFieldValue, old_state);
                }}
              />
              <TextEditor
                name="career_description"
                placeholder="Write something about your career"
                className={styles.quill_editor}
                onChange={() => {
                  setnb_changes(nb_changes + 1);
                }}
              />

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

export default SummaryCareerObj;
