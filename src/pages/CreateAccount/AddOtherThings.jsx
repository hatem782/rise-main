import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import { H1, H2 } from "../../components/typos/H/H";

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
import { talent_additional_data } from "../../redux/ProfCreat.reducer";
import { FormikHelper } from "../../functions/FormikHelper";
import { toast } from "react-hot-toast";

const talentSchema = Yup.object().shape({
  additional_data: Yup.string().required(""),
});

const initialValues = {
  additional_data: `
  <p><strong>Accomplishments</strong></p><ul><li>lrem ipsum kdjfkajdja98jnmnknamdnjahdmfak mlndfjlknanla</li><li>lorem ipsum</li></ul><p><br></p><p><strong>Certifications</strong></p><ul><li>lrem ipsum kdjfkajdja98jnmnknamdnjahdmfak mlndfjlknanla</li><li>lorem ipsum</li></ul><p><br></p><p><strong>Software</strong></p><ul><li>lrem ipsum kdjfkajdja98jnmnknamdnjahdmfak mlndfjlknanla</li><li>lorem ipsum</li></ul><p><br></p><p><strong>Language</strong></p><ul><li>lrem ipsum kdjfkajdja98jnmnknamdnjahdmfak mlndfjlknanla</li><li>lorem ipsum</li></ul><p><br></p><p><strong>Interests</strong></p><ul><li>lrem ipsum kdjfkajdja98jnmnknamdnjahdmfak mlndfjlknanla</li><li>lorem ipsum</li></ul>`,
};

function AddOtherThings() {
  const navigare = useNavigate();
  const dispatch = useDispatch();
  const [old_state, setold_state] = useState(null);
  const ref_fn = useRef(null);
  const old_data = useSelector((state) => state.profile.talent_profile);

  const [nb_changes, setnb_changes] = useState(0);

  const Next = (values) => {
    console.log(values);
    if (nb_changes < 2 && !old_state) {
      // the user ddidn't change the text
      toast.error("Write something about yourself the same as the example");
      return;
    }
    dispatch(talent_additional_data(values.additional_data));
    navigare("/verif_data");
  };

  const Back = () => {
    navigare("/summary_career");
  };

  useEffect(() => {
    if (old_data.additional_data) {
      setold_state({
        additional_data: old_data.additional_data, //
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
      <StepperNav steps={steps} current={5} />
      <div className={`${styles["content"]} ${styles["quill"]}`}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>Do you have anything else to add?</H1>
        <H2 className={styles["h2"]}>This section is optional</H2>
        <p className={styles["p"]}>
          Employers scan skills for relevant keywords.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={talentSchema}
          onSubmit={Next}
        >
          {({ handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={handleSubmit}
              method="post"
              className={styles.form_quill}
            >
              <div
                ref={ref_fn}
                onClick={() => {
                  FormikHelper(setFieldValue, old_state);
                }}
              />
              <h3>Description*</h3>

              <TextEditor
                name="additional_data"
                placeholder="Write something about your"
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

export default AddOtherThings;
