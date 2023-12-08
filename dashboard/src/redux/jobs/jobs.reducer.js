import keys from "./jobs.keys";

export const init_job = {
  _id: "",
  job_title: "",
  work_type: "",
  job_location: "",
  job_type: "",
  job_deadline_apply: "",
  with_cover: false,
  description_job: "",
  status: "",
  company_id: "",
  small_desc_job: "",
  updatedAt: "",
  candidates: [],
};

export const InitialState = {
  payload: false,
  jobs: [],
  job: { ...init_job },
};

export const JobReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.set_job:
      return { ...state, job: action.value, payload: false };
    case keys.payload:
      return { ...state, payload: action.value };
    case keys.set_jobs:
      return { ...state, jobs: action.value, payload: false };
    default:
      return state;
  }
};
