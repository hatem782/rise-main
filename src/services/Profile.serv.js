import axios from "../utils/axios";

export const CreateCompProfile = (data) => {
  return axios.post("/api/v1/auth/registerCompany", { ...data });
};

export const CreateTalentProfile = (data) => {
  return axios.post("/api/v1/auth/registerTalent", { ...data });
};

export const UpdateCompanyProfile = (data) => {
  let sub_data = { ...data };
  delete sub_data._id;
  return axios.put(`/api/v1/company/updateCompany/${data._id}`, {
    ...sub_data,
  });
};
export const UpdateCompanyProfilePawssword = (data) => {
  let sub_data = { ...data };
  return axios.put(`/api/v1/company/updatePassword`, {
    ...sub_data,
  });
};

