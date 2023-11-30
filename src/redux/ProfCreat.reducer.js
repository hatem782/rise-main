import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as ProfServices from "../services/Profile.serv";

export const createCompProfile = createAsyncThunk(
  "company/createProfile",
  async (data) => {
    return await ProfServices.CreateCompProfile(data);
  }
);

export const prof_cre_slice = createSlice({
  name: "prof_cre_slice",
  initialState: {
    data1: null,
    error: null,
    success: false,
    type: "talent", // talent or emp

    job_index: 0,
    educ_index: 0,

    talent_profile: {
      firstName: "", // talent_general
      sureName: "", // talent_general
      profession: "", // talent_general
      city: "", // talent_general
      country: "", // talent_general
      postal_code: "", // talent_general
      phone: "", // talent_general
      email: "", // talent_general
      password: "", // talent_general
      confirmPass: "", // talent_general
      jobs: [],
      education: [],
      skills: [],
      career_description: "", // summary_career
      additional_data: "", // additional
    },
  },
  reducers: {
    emp_part1: (state, action) => {
      state.data1 = action.payload;
      state.type = "emp";
    },

    talent_general: (state, action) => {
      state.talent_profile = { ...state.talent_profile, ...action.payload };
    },

    talent_career_description: (state, action) => {
      state.talent_profile.career_description = action.payload;
    },

    talent_additional_data: (state, action) => {
      state.talent_profile.additional_data = action.payload;
    },

    talent_jobs: (state, action) => {
      state.talent_profile.jobs[state.job_index] = {
        ...state.talent_profile.jobs[state.job_index],
        ...action.payload,
      };
    },

    talent_job_position: (state, action) => {
      state.job_index = action.payload;
    },

    talent_delete_job: (state, action) => {
      state.talent_profile.jobs = state.talent_profile.jobs.filter(
        (_, index) => index !== action.payload
      );
    },

    talent_jobs_desc: (state, action) => {
      state.talent_profile.jobs[state.job_index] = {
        ...state.talent_profile.jobs[state.job_index],
        ...action.payload,
      };
    },

    talent_education: (state, action) => {
      state.talent_profile.education[state.educ_index] = {
        ...state.talent_profile.education[state.educ_index],
        ...action.payload,
      };
    },

    talent_educ_position: (state, action) => {
      state.educ_index = action.payload;
    },

    talent_delete_educ: (state, action) => {
      state.talent_profile.education = state.talent_profile.education.filter(
        (_, index) => index !== action.payload
      );
    },

    talent_skills: (state, action) => {
      state.talent_profile.skills = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ####################### createCompProfile #######################
    builder
      .addCase(createCompProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCompProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // ####################### createCompProfile #######################
  },
});

export const {
  emp_part1,
  emp_part2,
  talent_general,
  talent_career_description,
  talent_additional_data,
  talent_jobs,
  talent_education,
  talent_skills,
  talent_jobs_desc,
  talent_job_position,
  talent_delete_job,
  talent_educ_position,
  talent_delete_educ,
} = prof_cre_slice.actions;

export default prof_cre_slice.reducer;
