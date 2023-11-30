import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

import email_icon from "../../../assets/svgs/email2.svg";
import Input from "../../../components/inputs/Input";
import Select from "../../../components/inputs/Select";
import { W50, Form, W100 } from "../../../components/Form/Form";
import TextEditor from "../../../components/ReactQuill/TextEditorQuill";
import CheckBox from "../../../components/CheckBox/CheckBox";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import { Formik } from "formik";
import { initialValues, validationSchema } from "./validation";
import { useSelector } from "react-redux";

import { CreateJob } from "../../../services/Jobs.serv";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAllCountries } from "../../../assets/jsons/ThirdAccessor";
import TextArea from "../../../components/inputs/TextArea";
import usePopup from "../../../hooks/usePupup";

import PopuPwithText from "../../Popups/PopupWithText/PopupWithText";
import TextEditorDesc from "../../../components/ReactQuill desc/TextEditorQuill";

function EmpPostJob() {
  const company_id = useSelector((state) => state?.users?.data?._id);
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const [open, handle_open, handle_close] = usePopup();

  const CreateJobMutation = useMutation(CreateJob, {
    onError: (error) => {
      toast.error("can't create job");
    },
    onSuccess: (data) => {
      console.log(data);
      handle_open();
    },
  });

  useEffect(() => {
    setCountries(getAllCountries());
  }, []);

  const handle_submit = (values) => {
    console.log({ ...values, company_id });
    CreateJobMutation.mutate({ ...values, company_id });
    // navigate("/comp_prof_info");
  };

  return (
    <div className={styles["main"]}>
      <UserNavbar />
      <div className={`${styles.content}`}>
        <div className={`${styles.page_title}`}>
          <img src={email_icon} alt="" />
          <h1>Post a job </h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handle_submit}
        >
          {({ handleSubmit }) => (
            <Form className={styles.form} onSubmit={handleSubmit} method="post">
              <W50>
                <Input
                  className={styles.input}
                  label="Job title"
                  icon={null}
                  name="job_title"
                  placeholder="Trainee"
                  onChange={() => {}}
                />
              </W50>

              <W50>
                <Select
                  className={styles.select}
                  label="Workplace type"
                  icon={null}
                  name="work_type"
                  placeholder="e.g. Jones"
                  onChange={() => {}}
                  options={[
                    { name: "On-site", value: "On-site" },
                    { name: "Remote", value: "Remote" },
                    { name: "Hybrid", value: "Hybrid" },
                  ]}
                />
              </W50>

              <W50>
                <Select
                  className={styles.select}
                  label="Job Location"
                  icon={null}
                  name="job_location"
                  placeholder="e.g. Kenya"
                  onChange={() => {}}
                  options={countries}
                />
              </W50>

              <W50>
                <Select
                  className={styles.select}
                  label="Contract type"
                  icon={null}
                  // isWhite
                  name="job_type"
                  placeholder="e.g. Internship"
                  onChange={() => {}}
                  options={[
                    { name: "Internship", value: "Internship" },
                    { name: "Full time", value: "Full time" },
                    { name: "Part time", value: "Part time" },
                    { name: "Trainee", value: "Trainee" },
                    { name: "Apprenticeship", value: "Apprenticeship" },
                  ]}
                />
              </W50>

              <W50>
                <Select
                  className={styles.select}
                  label="Experience required"
                  icon={null}
                  // isWhite
                  name="job_exp"
                  placeholder="1-2 years"
                  onChange={() => {}}
                  options={[
                    { name: "None", value: "None" },
                    { name: "1-2 years", value: "1-2 years" },
                    { name: "3-4 years", value: "3-4 years" },
                  ]}
                />
              </W50>

              <W50>
                <Select
                  className={styles.select}
                  label="Job Area"
                  icon={null}
                  // isWhite
                  name="job_area"
                  placeholder="1-2 years"
                  onChange={() => {}}
                  options={[
                    { name: "Office job", value: "Office job" },
                    { name: "Technical job", value: "Technical job" },
                    { name: "Other", value: "Other" },
                  ]}
                />
              </W50>

              <W50>
                <Select
                  className={styles.select}
                  label="Education Level"
                  icon={null}
                  // isWhite
                  name="job_educ_level"
                  placeholder="High School"
                  onChange={() => {}}
                  options={[
                    { name: "High School", value: "High School" },
                    { name: "Diploma/Cert", value: "Diploma/Cert" },
                    { name: "Bachelors +", value: "Bachelors +" },
                  ]}
                />
              </W50>

              <W50>
                <Input
                  className={styles.input}
                  label="Job Deadline to apply "
                  icon={null}
                  type="date"
                  name="job_deadline_apply"
                  placeholder="25-06-23"
                  onChange={() => {}}
                />
              </W50>



              <W100>
                <div className={styles.desc}>
                  <div className={styles["choose"]}>
                    <p className={`${styles["p"]}`}>Description*</p>

                    <CheckBox
                      label="Cover letter required"
                      isRadio
                      name="with_cover"
                    />
                  </div>
                  <TextEditorDesc
                    name="description_job"
                    placeholder=""
                    value=""
                    onChange={() => {}}
                  />

                  <div className={styles.btns}>
                    <BtnOrange isOutlined className={styles.btn}>
                      Preiview
                    </BtnOrange>
                    <BtnOrange className={styles.btn}>Post Job</BtnOrange>
                  </div>
                </div>
              </W100>
            </Form>
          )}
        </Formik>
      </div>
      <PopuPwithText
        title=""
        text={""}
        handleClose={handle_close}
        with_close={true}
        open={open}
        onClose={() => {
          navigate("/overview");
        }}
      >
        <p className={styles.p_popup}>
          Great Stuff! <br />
          Your job is live.
        </p>
      </PopuPwithText>
      <MainFooter />
    </div>
  );
}

export default EmpPostJob;
