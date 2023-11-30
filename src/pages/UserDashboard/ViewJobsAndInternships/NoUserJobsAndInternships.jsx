import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import Select2 from "../../../components/Select2/Select2";
import JobCard from "../../../components/cards/JobCard/JobCard";

import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";

import location_img from "../../../assets/svgs/location_2.svg";

import { useQuery } from "@tanstack/react-query";
import { GetJobs } from "../../../services/Jobs.serv";
import { useDispatch, useSelector } from "react-redux";
import { setOneJob } from "../../../redux/Jobjs.reducer";
import {
  calculateDateDifference,
  formatDateToCustomString,
  DateCompareByText,
} from "../../../functions/Dates";
import { useNavigate } from "react-router-dom";
import { divideArrayIntoSubarrays, Eq1or2 } from "../../../functions/Arrays";
import usePopup from "../../../hooks/usePupup";

import industry from "../../../assets/jsons/industry.json";

function NoUserJobsAndInternships() {
  const dispatch = useDispatch();
  const [paginated_jobs, setPaginated_jobs] = useState([]);
  const [page_number, set_page_number] = useState(0);

  const sections = [
    { title: "Job description", Component: <JobDescription /> },
    { title: "Company", Component: <Job_Company /> },
  ];
  const [section, setSection] = useState(sections[0]);
  const navigate = useNavigate();

  const one_job = useSelector((state) => state.jobs.one_job);

  const {
    data: jobs = [],
    isLoading,
    error,
    refetch,
  } = useQuery(["jobs"], GetJobs);

  // ###################################### Pagination ######################################

  // filters

  const [filter_values, set_filter_values] = useState({
    jobcompanies: ["All jobs"],
    jobArea: ["All jobs", "Office job", "Technical job", "Other"],
    jobPostedDate: ["Anytime"],
    jobtypes: [
      "All jobs",
      "Internship",
      "Full time",
      "Part time",
      "Trainee",
      "Apprenticeship",
    ],
    workstype: ["All jobs", "On-site", "Remote", "Hybrid"],
  });

  const [filter_selects, set_filter_selects] = useState({
    jobcompanies: "All jobs",
    jobArea: "All jobs",
    jobPostedDate: "Anytime",
    jobtypes: "All jobs",
    workstype: "All jobs",
  });
  const [P_login, O_login, C_login] = usePopup();

  useEffect(() => {
    let jobcompanies = ["All jobs"];
    let workstype = ["All jobs"];

    jobs.forEach((jb) => {
      jobcompanies.push(jb.company_id.name.toLowerCase());
      workstype.push(jb.work_type.toLowerCase());
    });

    set_filter_values({
      jobcompanies: Array.from(new Set(jobcompanies)),
      jobtypes: [
        "All jobs",
        "Internship",
        "Full time",
        "Part time",
        "Trainee",
        "Apprenticeship",
      ],
      workstype: Array.from(new Set(workstype)),
      jobArea: ["All jobs", "Office job", "Technical job", "Other"],
    });
  }, [jobs]);

  const handle_filter_change = (e) => {
    set_filter_selects({ ...filter_selects, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let filtered_jobs = jobs.filter((jb) => {
      let is_jobcompanies = Eq1or2(
        filter_selects.jobcompanies,
        "All jobs",
        jb.company_id.name
      );
      let is_jobArea = Eq1or2(
        filter_selects.jobArea,
        "All jobs",
        jb?.job_area || ""
      );
      let is_jobPostedDate = DateCompareByText(
        jb.createdAt,
        filter_selects.jobPostedDate
      );

      let is_jobtypes = Eq1or2(
        filter_selects.jobtypes,
        "All jobs",
        jb.job_type
      );

      let is_workstype = Eq1or2(
        filter_selects.workstype,
        "All jobs",
        jb.company_id.intPresence
      );

      return (
        is_jobcompanies &&
        is_jobArea &&
        is_jobPostedDate &&
        is_jobtypes &&
        is_workstype
      );
    });

    let res1 = divideArrayIntoSubarrays(filtered_jobs, 7);
    setPaginated_jobs(res1);
  }, [filter_selects, jobs]);

  useEffect(() => {
    console.log(filter_selects);
  }, [filter_selects]);

  const next = () => {
    if (page_number < paginated_jobs.length - 1) {
      set_page_number(page_number + 1);
    }
  };

  // ###################################### Notification ######################################

  useEffect(() => {
    if (jobs.length) {
      dispatch(setOneJob(jobs[0]));
    }
  }, [jobs]);

  return (
    <div className={styles["main"]}>
      <div className={`${styles["content"]} ${styles["centered"]}`}>
        <div className={styles["container"]}>
          <div className={styles["filter"]}>
            <Select2
              placeholder="Date posted"
              className={styles["w1"]}
              select_default={false}
              name="jobPostedDate"
              options={[
                {
                  name: "Anytime",
                  value: "Anytime",
                },
                {
                  name: "Past 24 hours",
                  value: "Past 24 hours",
                },
                {
                  name: "Past week",
                  value: "Past week",
                },
                {
                  name: "Past month",
                  value: "Past month",
                },
              ]}
              onChange={handle_filter_change}
            />
            <Select2
              placeholder="Job Area"
              className={styles["w1"]}
              select_default={false}
              name="jobArea"
              options={[
                {
                  name: "All jobs",
                  value: "All jobs",
                },
                {
                  name: "Office job",
                  value: "Office job",
                },
                {
                  name: "Technical job",
                  value: "Technical job",
                },
                {
                  name: "Other",
                  value: "Other",
                },
              ]}
              onChange={handle_filter_change}
            />

            <Select2
              placeholder="Job Type"
              className={styles["w1"]}
              select_default={false}
              name="jobtypes"
              options={[
                { name: "All jobs", value: "All jobs" },
                { name: "Internship", value: "Internship" },
                { name: "Full time", value: "Full time" },
                { name: "Part time", value: "Part time" },
                { name: "Trainee", value: "Trainee" },
                { name: "Apprenticeship", value: "Apprenticeship" },
              ]}
              onChange={handle_filter_change}
            />

            <Select2
              placeholder="On site/remote"
              className={styles["w1"]}
              select_default={false}
              name="workstype"
              options={[
                { name: "All jobs", value: "All jobs" },
                { name: "On-site", value: "On-site" },
                { name: "Remote", value: "Remote" },
                { name: "Hybrid", value: "Hybrid" },
              ]}
              onChange={handle_filter_change}
            />
            <Select2
              placeholder="Industry"
              className={styles["w1"]}
              select_default={false}
              name="workstype"
              options={[{ name: "All jobs", value: "All jobs" }, ...industry]}
              onChange={handle_filter_change}
            />
          </div>

          <div className={styles["display"]}>
            <div className={styles["jobs"]}>
              {paginated_jobs &&
                paginated_jobs[page_number]?.map((job, key) => {
                  return (
                    <JobCard
                      key={key}
                      selected={job._id === one_job._id}
                      data={job}
                      dispatcher
                    />
                  );
                })}
            </div>

            {one_job && (
              <div className={styles["one_job"]}>
                <h1 className={styles["title"]}>{one_job.job_title}</h1>
                <p className={styles["locations"]}>
                  {one_job.company_id.name} , {one_job.company_id.country} ,{" "}
                  {one_job.company_id.city}
                </p>

                <div className={styles["between"]}>
                  <BtnOrange onClick={O_login} className={styles["action-btn"]}>
                    Apply
                  </BtnOrange>

                  <div>
                    <p className={styles["location"]}>
                      {one_job.with_cover && "Require cover letter !"}
                    </p>
                    <p className={styles["date"]}>
                      Closing:{" "}
                      {formatDateToCustomString(one_job.job_deadline_apply)}
                    </p>
                    <p className={styles["date"]}>
                      {calculateDateDifference(one_job.job_deadline_apply)} days
                      remaining
                    </p>
                    <p className={styles["date"]}>
                      Published: {formatDateToCustomString(one_job.createdAt)}(
                      {calculateDateDifference(one_job.createdAt)} days ago)
                    </p>
                  </div>
                </div>

                <div className={styles["sections"]}>
                  {sections.map((sec, key) => {
                    return (
                      <span
                        key={key}
                        className={
                          section.title === sec.title ? styles["active"] : ""
                        }
                        onClick={() => setSection(sec)}
                      >
                        {sec.title}
                      </span>
                    );
                  })}
                </div>

                {section.Component}
              </div>
            )}
          </div>
        </div>
        <div className={styles["container2"]}>
          <div className={styles["part1"]}>
            {paginated_jobs &&
              paginated_jobs.map((_, key) => {
                return (
                  <span
                    className={`${styles["num-page"]} ${
                      key === page_number ? styles["active"] : ""
                    }`}
                    onClick={() => {
                      set_page_number(key);
                    }}
                  >
                    {key + 1}
                  </span>
                );
              })}
            {/*             
            <span className={`${styles["num-page"]} `}>2</span>
            <span className={`${styles["num-page"]} `}>3</span> */}
            <span className={styles["next-page"]} onClick={next}>
              Next
            </span>
          </div>
          <div className={styles["part2"]}>
            <BtnOrange onClick={O_login} className={styles["action-btn"]}>
              Apply
            </BtnOrange>
          </div>
        </div>
      </div>
    </div>
  );
}

const JobDescription = () => {
  const one_job = useSelector((state) => state.jobs.one_job);

  return (
    <div
      className={styles["job-description"]}
      dangerouslySetInnerHTML={{ __html: one_job.description_job }}
    ></div>
  );
};

const Job_Company = () => {
  const { data: jobs = [], isLoading, error } = useQuery(["jobs"], GetJobs);

  const data = useSelector((state) => state.jobs.one_job.company_id);

  const goto_website = () => {
    window.open(data.url, "_blank");
  };

  return (
    <div className={styles["job-company"]}>
      <div className={styles["head"]}>
        <img src={data.cover_photo} alt="" className={styles["cover"]} />
        <div className={styles["company-logo"]}>
          <img src={data.logo_photo} alt="" />
        </div>
      </div>

      <div className={styles["sub-head"]}>
        <BtnOrange isOutlined className={styles["btn"]} onClick={goto_website}>
          Website
        </BtnOrange>

        <h2>Head office</h2>
        <span>
          <img src={location_img} alt="" />
          {data.country} ({data.city})
        </span>
      </div>

      <div className={styles["body"]}>
        <h2 className={styles["part-title"]}>Welcome</h2>
        <p>{data.about}</p>

        <div className={styles["stats"]}>
          <div className={styles["stat"]}>
            <span className={styles["number"]}>{data.year}</span>
            <span className={styles["title"]}>Creation year</span>
          </div>

          <div className={styles["stat"]}>
            <span className={styles["number"]}>{data.number}</span>
            <span className={styles["title"]}>Number of employees</span>
          </div>

          <div className={styles["stat"]}>
            <span className={styles["number"]}>
              {Number(data.intPresence) || 0} countries
            </span>
            <span className={styles["title"]}>International presence</span>
          </div>
        </div>

        <h2 className={styles["part-title"]}>Active jobs</h2>

        <div className={styles["jobs2"]}>
          {jobs.map((job, key) => {
            return (
              <div key={key} className={styles["job"]}>
                <JobCard data={job} className={styles["job-card"]} dispatcher />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NoUserJobsAndInternships;
