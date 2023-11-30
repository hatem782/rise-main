import React from "react";
import styles from "../../CreateAccount/styles.module.scss";
import styles2 from "./styles.module.scss";

import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";
import { H2 } from "../../../components/typos/H/H";

import c1 from "../../../assets/images/CA/c1.svg";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import { useNavigate } from "react-router-dom";
import TextEditor from "../../../components/ReactQuill/TextEditorQuill";
import CheckBox from "../../../components/CheckBox/CheckBox";
import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";

import { Formik } from "formik";
import { Form } from "../../../components/Form/Form";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Candidate } from "../../../services/Jobs.serv";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { CreateNotif } from "../../../services/Notifs";
import usePopup from "../../../hooks/usePupup";
import PopupWithText from "../../Popups/PopupWithText/PopupWithText";
import { useEffect } from "react";

const coverLetterSchema = Yup.object().shape({
  cover: Yup.string().required("Cover letter is required"),
});

const initialValues = {
  cover:
    "<p>[Recipient's Name]</p><p>[Recipient's Job Title]</p><p>[Rafiki Bank]</p><p>[Bank Address]</p><p>[City, State, ZIP]</p><p><br></p><p>Dear [Recipient's Name],</p><p><br></p><p>I am writing to apply for the position of Cashier at Rafiki Bank, as advertised on your website. With a strong passion for the banking industry and a keen eye for detail, I am confident that my qualifications and skills align perfectly with the requirements outlined in the job description.</p><p><br></p><p>I am writing to apply for the position of Cashier at Rafiki Bank, as advertised on your website. With a strong passion for the banking industry and a keen eye for detail, I am confident that my qualifications and skills align perfectly with the requirements outlined in the job description.</p><p><br></p><p>Thank you for considering my application.</p><p>Sincerely,</p><p><br></p><p>[Your Name]</p>",
};

function CandidateApply() {
  const navigare = useNavigate();
  const one_job = useSelector((state) => state.jobs.one_job);
  const talent_id = useSelector((state) => state.users.data._id);
  const talent = useSelector((state) => state.users.data);
  const socket = useSelector((state) => state.users.socket);

  const [open1, handle_opne1, handle_close1] = usePopup();
  const [open2, handle_opne2, handle_close2] = usePopup();

  useEffect(() => {
    handle_opne1();
  }, []);

  const CreateNotifMutation = useMutation(CreateNotif, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const SendNotifs = (dataNotif) => {
    // this will send notification to BD
    CreateNotifMutation.mutate(dataNotif);
    // this will send notification to SocketIo
    socket.emit("sendNotification", {
      user_id: dataNotif.receiver,
      data: dataNotif,
    });
  };

  const CandidateMutate = useMutation(Candidate, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Job Application Sent");

      const dataNotifToTalent = {
        receiver: talent_id,
        description: `You applied for the job "${one_job.job_title}"`,
        job_id: one_job._id,
        type: "submit_job",
        createdAt: new Date(),
      };

      const dataNotifToCompany = {
        receiver: one_job.company_id._id,
        description: `A talent "${talent.firstName} ${talent.sureName}" applied to the job "${one_job.job_title}"`,
        job_id: one_job._id,
        type: "submit_job",
        createdAt: new Date(),
      };

      SendNotifs(dataNotifToTalent);
      SendNotifs(dataNotifToCompany);
      handle_opne2();
    },
  });

  const handle_sibmit = (values) => {
    console.log(one_job);
    delete values.is_required;
    console.log(values);
    let newJob = { ...one_job, ...values };
    console.log(newJob);
    CandidateMutate.mutate(newJob);
  };

  return (
    <div className={styles["main"]}>
      <UserNavbar />
      <div className={`${styles["content"]} ${styles2["content"]}`}>
        <img src={c1} className={styles["c1"]} alt="" />
        <H2 className={`${styles["h2"]} ${styles2["h2"]}`}>
          Your resume is already attached. Add a dazzling cover letter to your
          application.
        </H2>

        <Formik
          initialValues={initialValues}
          validationSchema={coverLetterSchema}
          onSubmit={handle_sibmit}
        >
          {({ handleSubmit, setFieldValue, setFieldError }) => (
            <Form
              onSubmit={handleSubmit}
              className={`${styles.form} ${styles2.form}`}
              method="post"
            >
              <div className={styles2["choose"]}>
                <p className={`${styles["p"]} ${styles2["p"]}`}>Compose</p>

                <div className={styles2.cover_type}>
                  <CheckBox
                    label="Optional"
                    className={styles2["checkbox"]}
                    name="is_required"
                    isRadio
                  />

                  <CheckBox
                    label="Required"
                    className={styles2["checkbox"]}
                    name="is_required"
                    isRadio
                    value={true}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <div className={`${styles.form} ${styles2.form}`}>
                <TextEditor
                  name="cover"
                  placeholder=""
                  className={styles2.quill}
                />

                <div
                  className={`${styles["btn-container"]} ${styles2["btn-container"]}`}
                >
                  <div />
                  <BtnOrange
                    type="submit"
                    size="medium"
                    className={`${styles.btn} ${styles2.btn}`}
                  >
                    Submit Application
                  </BtnOrange>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <PopupWithText
        title=""
        text={""}
        handleClose={handle_close1}
        with_close={true}
        open={open1}
        centered={true}
      >
        <p className={styles2.message1}>
          This employer wants you to <br /> smooth talk them a little. <br />
          Add dazzling cover letter to <br /> your application.
        </p>
      </PopupWithText>

      <PopupWithText
        title=""
        text={""}
        handleClose={handle_close2}
        with_close={true}
        open={open2}
        centered={true}
        onClose={() => {
          navigare("/user_dashboard/my_applications");
        }}
      >
        <p className={styles2.message2}>
          Bang! <br />
          You're done with this <br /> application.
        </p>
      </PopupWithText>

      <MainFooter />
    </div>
  );
}

export default CandidateApply;
