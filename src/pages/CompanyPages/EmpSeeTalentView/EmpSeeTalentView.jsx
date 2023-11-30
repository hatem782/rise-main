import React, { useEffect, useRef, useState } from "react";
import styles2 from "./styles.module.scss";
import styles from "../../UserDashboard/ViewJobsAndInternships/styles.module.scss";

import Select2 from "../../../components/Select2/Select2";
import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";
import UserCard from "../../../components/cards/UserCard/UserCard";

import { jobs } from "../../UserDashboard/ViewJobsAndInternships/fakedata";
import {
  Head,
  Description,
  Education,
  Others,
  Skills_and_proficencies,
  Work_History,
} from "../../CreateAccount/CA_VerifData/CA_VerifData";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import {
  GetJobsByCompany,
  GetUserById,
  UpdateCondidate,
} from "../../../services/Jobs.serv";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateDiscussion } from "../../../services/Mess.serv";
import { useDispatch, useSelector } from "react-redux";
import { CreateNotif } from "../../../services/Notifs";
import { setCondit } from "../../../redux/Jobjs.reducer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function EmpSeeTalentView() {
  const company = useSelector((state) => state.users.data);
  const socket = useSelector((state) => state.users.socket);
  const [all_condidates, set_all_condidates] = useState([]);
  const [one_condidate, setOne_condidate] = useState(null);
  const [condit, setCond] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const divRef = useRef(null);

  const handleDownloadPDF = () => {
    const divToPrint = divRef.current;

    html2canvas(divToPrint).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const doc = new jsPDF();

      doc.addImage(imgData, "PNG", 0, 0, 210, 300);
      doc.save("document.pdf");
    });
  };

  const {
    data: jobs = [],
    isLoading,
    error,
    refetch,
  } = useQuery(["jobs"], GetJobsByCompany);

  const GetUserMutation = useMutation(GetUserById, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      setOne_condidate(data);
    },
  });

  const MakeDiscussionMutation = useMutation(CreateDiscussion, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const UpdateCondidateMutation = useMutation(UpdateCondidate, {
    onError: (error) => {
      // toast.error("wrong email or password");
    },
    onSuccess: (data) => {
      refetch();
    },
  });

  const CreateNotifMutation = useMutation(CreateNotif, {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    const all_cond_jobs = [];

    jobs.forEach((job) => {
      job.candidates.forEach((condidate) => {
        let temp_job = { ...job };
        temp_job.candidates = [condidate];
        all_cond_jobs.push(temp_job);
      });
    });
    set_all_condidates(all_cond_jobs);
  }, [jobs]);

  useEffect(() => {
    if (all_condidates.length !== 0) {
      GetUserMutation.mutate(all_condidates[0].candidates[0].id_condidate);
      setCond(all_condidates[0]);
    }
  }, [all_condidates]);

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
    const queryParams = { companyId: company._id, userId: one_condidate._id };
    MakeDiscussionMutation.mutate(queryParams);

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
    dispatch(setCondit(condit));
  }, [condit]);

  return (
    <div className={styles["main"]}>
      <UserNavbar />
      <div className={`${styles.content} ${styles2.content}`}>
        <div
          className={`${styles.container} ${styles2.container} ${styles2.filter}`}
        >
          <div className={styles["filter"]}>
            <Select2 placeholder="Select Job" className={styles["w1"]} />
            <Select2 placeholder="Education" className={styles["w1"]} />
            <Select2 placeholder="Experience" className={styles["w1"]} />
          </div>
        </div>
      </div>

      <div className={`${styles2.content2}`}>
        <div className={`${styles2.container2} `}>
          <div className={styles2["display"]}>
            <div className={styles2["jobs"]}>
              {all_condidates.map((cond, key) => {
                return (
                  <UserCard
                    key={key}
                    data={cond}
                    onClick={(userr) => {
                      setOne_condidate(userr);
                      console.log(cond);
                      setCond(cond);
                    }}
                  />
                );
              })}
            </div>

            {one_condidate && (
              <div className={styles2["one_job"]} ref={divRef}>
                <Head data={one_condidate} />
                <Description data={one_condidate} />
                <Skills_and_proficencies data={one_condidate} />
                <Work_History data={one_condidate} />
                <Education data={one_condidate} />
                <Others data={one_condidate} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles2["container3"]}>
        <div className={styles2["part1"]}>
          <span className={`${styles2["num-page"]} ${styles2["active"]}`}>
            1
          </span>
          <span className={`${styles2["num-page"]} `}>2</span>
          <span className={`${styles2["num-page"]} `}>3</span>
          <span className={styles2["next-page"]}>Next</span>
        </div>
        <div className={styles2["part2"]}>
          {/* {condit?.with_cover && (
            <h4
              onClick={() => {
                navigate("/emp_view_candidate_cover_letter");
              }}
            >
              View cover letter
            </h4>
          )} */}

          <div className={styles2.buttons}>
            <div>
              {condit?.with_cover && (
                <BtnOrange
                  isOutlined
                  className={`${styles2["action-btn"]} ${styles2["view-cover"]}`}
                  size="medium"
                  onClick={() => {
                    navigate("/emp_view_candidate_cover_letter");
                  }}
                >
                  View cover letter
                </BtnOrange>
              )}
            </div>

            <div>
              <BtnOrange
                className={styles2["action-btn"]}
                size="medium"
                onClick={handleDownloadPDF}
              >
                Download PDF
              </BtnOrange>

              <BtnOrange
                className={`${styles2["action-btn"]} ${styles2["black-btn"]}`}
                size="medium"
                onClick={InviteInterview}
              >
                Invite to interview
              </BtnOrange>
            </div>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
}

export default EmpSeeTalentView;
