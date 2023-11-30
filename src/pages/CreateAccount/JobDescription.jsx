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
import { talent_jobs_desc } from "../../redux/ProfCreat.reducer";

import { FormikHelper } from "../../functions/FormikHelper";
import { toast } from "react-hot-toast";

const talentSchema = Yup.object().shape({
  job_description: Yup.string().required("job description is a required field"),
});

const initialValues = {
  job_description: `<ul><li>Processed travel expenses and reimbursements for executive team and senior management group.</li><li>Organized and coordinated conferences and monthly meetings.</li><li>Answered high volume of phone calls and email inquiries.</li><li>Screened calls and emails and initiated actions to respond or direct messages for managers.</li><li>Conducted research and analysed data to provide detailed reports on various business topics.</li><li>Used advanced software to prepare documents, reports, and presentations.</li></ul>`,
};

function JobDescription() {
  const navigare = useNavigate();
  const dispatch = useDispatch();
  const [old_state, setold_state] = useState(null);
  const ref_fn = useRef(null);
  const [nb_changes, setnb_changes] = useState(0);

  const old_data = useSelector((state) => state.profile.talent_profile.jobs);
  const job_index = useSelector((state) => state.profile.job_index);

  useEffect(() => {
    // old_data.length === job_index  ===> a new element to add
    if (old_data.length !== job_index) {
      let job = old_data[job_index];
      if (job?.job_description?.length > 0) {
        setold_state({
          job_description: job.job_description,
        });
      }
    }
  }, [old_data]);

  useEffect(() => {
    if (old_state) {
      ref_fn.current.click();
    }
  }, [old_state]);

  const Next = (values) => {
    console.log(values);
    if (nb_changes < 2 && !old_state) {
      // the user ddidn't change the text
      toast.error("Write something about yourself the same as the example");
      return;
    }
    dispatch(talent_jobs_desc(values));
    navigare("/work_summary");
  };

  const Back = () => {
    navigare("/ca_work_history");
  };

  return (
    <div className={styles["main"]}>
      <StepperNav steps={steps} current={1} />
      <div className={`${styles["content"]} ${styles["quill"]}`}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H1 className={styles["h1"]}>Nice, let’s add a job description</H1>
        <p className={styles["p"]}>
          Job title | Employer | start date - end date
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
              <TextEditor
                name="job_description"
                placeholder="Write something about your job"
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

export default JobDescription;
