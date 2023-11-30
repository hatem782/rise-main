import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  job_title: Yup.string().required(),
  work_type: Yup.string().required(),
  job_location: Yup.string().required(),
  job_type: Yup.string().required(),

  job_exp: Yup.string().required(),
  job_area: Yup.string().required(),
  job_educ_level: Yup.string().required(),

  job_deadline_apply: Yup.date().required(),
  with_cover: Yup.boolean().required(),
  description_job: Yup.string().required(),
  //   company_id: Yup.string().required(),
  candidates: Yup.array(),
});

export const initialValues = {
  job_title: "",
  work_type: "",
  job_location: "",
  job_type: "",

  job_exp: "",
  job_area: "",
  job_educ_level: "",

  job_deadline_apply: "",
  with_cover: false,
  description_job: "",
  //   company_id: "xyz123",
  candidates: [],
};
