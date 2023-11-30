import axios from "../utils/axios";

export async function CreateJob(data) {
  const res = await axios.post("/api/v1/job/createJob", { ...data });
  return res.data;
}

export async function GetJobsByCompany() {
  const res = await axios.get("/api/v1/job/getCompanyJobs");
  return res.data;
}

export async function GetJobs() {
  const res = await axios.get("/api/v1/job/getAllJob");
  return res.data;
}

export async function Candidate(job) {
  let { _id, cover = null } = job;
  const res = await axios.put(`/api/v1/job/condidate/${_id}`, { cover });
  return res.data;
}

export async function UpdateCondidate(data) {
  const { _id, status } = data;
  const res = await axios.put(`/api/v1/job/condidate_update/${_id}`, {
    status,
  });
  return res.data;
}

export async function GetUserById(id) {
  const res = await axios.get(`/api/v1/user/getUserById/${id}`);
  return res.data;
}
