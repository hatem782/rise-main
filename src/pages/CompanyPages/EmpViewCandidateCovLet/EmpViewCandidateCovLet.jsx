import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useMutation } from "@tanstack/react-query";
import { GetUserById, UpdateCondidate } from "../../../services/Jobs.serv";
import { CreateNotif } from "../../../services/Notifs";
import { Head } from "../../CreateAccount/CA_VerifData/CA_VerifData";

function EmpViewCandidateCovLet() {
  const condit = useSelector((state) => state.jobs.condit);
  const socket = useSelector((state) => state.users.socket);
  const navigate = useNavigate();
  const divRef = useRef(null);
  const [talent, setTalent] = useState(null);

  const handleDownloadPDF = () => {
    const divToPrint = divRef.current;

    html2canvas(divToPrint).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("document.pdf");
    });
  };

  useEffect(() => {
    if (!condit) {
      navigate("/manage_applicants");
    }
  }, [condit]);

  const GetUserMutation = useMutation(GetUserById, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      setTalent(data);
    },
  });

  const CreateNotifMutation = useMutation(CreateNotif, {
    onError: (error) => {},
    onSuccess: (data) => {},
  });

  const UpdateCondidateMutation = useMutation(UpdateCondidate, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {},
  });

  const SendNotifs = (notification) => {
    // this will send notification to BD
    CreateNotifMutation.mutate(notification);
    // this will send notification to SocketIo
    socket.emit("sendNotification", {
      user_id: condit.candidates[0].id_condidate,
      data: notification,
    });
  };

  const Approve = () => {
    const data = { _id: condit.candidates[0]._id, status: "accepted" };
    UpdateCondidateMutation.mutate(data);
    const dataNotif = {
      receiver: condit.candidates[0].id_condidate,
      description: `Your condidation to job "${condit.job_title}" is approved `,
      job_id: condit._id,
      type: "submit_job",
      createdAt: new Date(),
    };

    SendNotifs(dataNotif);
  };

  const InviteInterview = () => {
    Approve();

    const dataNotif = {
      receiver: condit.candidates[0].id_condidate,
      description: `You have an invitation to interview for the job "${condit.job_title}" , please check your conversation page `,
      job_id: condit._id,
      type: "submit_job",
      createdAt: new Date(),
    };
    SendNotifs(dataNotif);
    navigate(`/emp_writing_to_talent`);
  };

  useEffect(() => {
    GetUserMutation.mutate(condit.candidates[0].id_condidate);
  }, [condit]);

  useEffect(() => {
    console.log(talent);
  }, [talent]);

  return (
    <div className={styles["main"]}>
      <UserNavbar />
      <div className={styles["content"]}>
        {talent && <Head data={talent} />}

        <div
          ref={divRef}
          className={styles["cover-letter"]}
          dangerouslySetInnerHTML={{ __html: condit?.candidates[0].cover_text }}
        />

        <div className={styles["btn-container"]}>
          <BtnOrange
            className={styles["action-btn"]}
            onClick={handleDownloadPDF}
            size="medium"
          >
            Download PDF
          </BtnOrange>
          <BtnOrange
            onClick={InviteInterview}
            className={`${styles["action-btn"]} ${styles["black-btn"]}`}
            size="medium"
          >
            Invite to interview
          </BtnOrange>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default EmpViewCandidateCovLet;
