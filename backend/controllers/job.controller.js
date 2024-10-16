const asyncHandler = require("express-async-handler");
const jobService = require("../services/job.service");
const createError = require("http-errors");

// calling get user service

const getJobById = asyncHandler(async (req, res) => {
  let user_id = req.user;
  let job_params = req.params.jobId;
  const job = await jobService.getJobById(user_id, job_params);
  res.status(200).json(job);
});

// calling update user sevcice

const updateJob = asyncHandler(async (req, res) => {
  let user_id = req.user;
  let { job_id } = req.params;
  let job = await jobService.updateJob(user_id, job_id, req.body);
  res.status(200).json(job);
});

// calling update user service

const getJobByName = asyncHandler(async (req, res, next) => {
  let { name } = req.params;

  const job = await jobService.getJobByName(name);

  res.status(200).json(job);
});
// calling update user service

const getAllJob = asyncHandler(async (req, res, next) => {
  const name = req.params.name;

  const job = await jobService.getAllJobs(name);

  res.status(200).json(job);
});

const getCompanyJobs = asyncHandler(async (req, res, next) => {
  try {
    let user = req.user;
    console.log("company", user);
    const job = await jobService.getAllJobsComp(user._id);

    res.status(200).json(job);
  } catch (e) {
    console.log(e);
  }
});

const createJob = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);
  const id = req.user._id;
  const job = await jobService.createJob(id, req.body);

  res.status(200).json({ message: "Job successfully created", job });
});

const deleteJob = asyncHandler(async (req, res, next) => {
  const id = req.user;
  const { job_id } = req.params;
  const job = await jobService.deleteJob(id, job_id);

  res.status(200).json({ message: "Job successfully deleted" });
});

const condidateJob = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  let data = {
    id,
    cover: req.body.cover,
  };
  const job = await jobService.condidateJob(data, req.params.job_id);

  res.status(200).json({ message: "Job successfully deleted" });
});

const UpdateCandidate = asyncHandler(async (req, res, next) => {
  const id = req.params.condidateId;
  const status = req.body.status;

  const condidate = await jobService.UpdateCondidate(id, status);

  res.status(200).json({ message: "Job successfully deleted" });
});

module.exports = {
  getJobById,
  getJobByName,
  getCompanyJobs,
  updateJob,
  createJob,
  deleteJob,
  getAllJob,
  condidateJob,
  UpdateCandidate,
};
