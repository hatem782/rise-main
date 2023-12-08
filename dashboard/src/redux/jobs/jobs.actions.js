import keys from "./jobs.keys";
import { toast } from "react-hot-toast";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";

const GetAllJobs = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/admin/jobs`, Mquery(query));
      dispatch({
        type: keys.set_jobs,
        value: response.data.jobs,
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const GetJobsByCompanyUd = (query = {}, comp_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/admin/jobs`, Mquery(query));
      let filtered_data = response.data.jobs.filter(
        (job) => job.company_id._id === comp_id
      );
      dispatch({
        type: keys.set_jobs,
        value: filtered_data,
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const DeleteJob = (job, callback, comp_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      console.log(job);
      const response = await axios.delete(`/api/v1/admin/jobs/${job._id}`);
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Job Deleted Successfully`);
      if (comp_id?.length > 0) {
        dispatch(GetJobsByCompanyUd({}, comp_id));
      } else {
        dispatch(GetAllJobs());
      }
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

export { GetAllJobs, DeleteJob, GetJobsByCompanyUd };
