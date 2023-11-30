import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const JobjsSlice = createSlice({
  name: "Jobjs",
  initialState: {
    one_job: null,
    jobs: [],
    condit: null,
  },
  reducers: {
    setOneJob: (state, action) => {
      state.one_job = action.payload;
    },

    setJobs: (state, action) => {
      state.jobs = action.payload;
    },

    setCondit: (state, action) => {
      state.condit = action.payload;
    },
  },
  extraReducers: {},
});

export const { setOneJob, setJobs, setCondit } = JobjsSlice.actions;

export default JobjsSlice.reducer;
