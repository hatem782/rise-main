import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const LinksSlice = createSlice({
  name: "Link",
  initialState: {
    privacy_policy_section: "",
  },
  reducers: {
    toModernSalary: (state, action) => {
      state.privacy_policy_section = "modern_salary";
    },
    toPrivacyPolicy: (state, action) => {
      state.privacy_policy_section = "privacy_policy";
    },
    toTermsCondition: (state, action) => {
      state.privacy_policy_section = "terms_conditions";
    },
  },
  extraReducers: {},
});

export const { toModernSalary, toPrivacyPolicy, toTermsCondition } =
  LinksSlice.actions;

export default LinksSlice.reducer;
