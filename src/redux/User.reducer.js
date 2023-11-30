import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "User",
  initialState: {
    isCompany: false,
    isTalent: false,
    socket: null,
    data: null,
  },
  reducers: {
    setTalent: (state, action) => {
      state.isTalent = true;
      state.isCompany = false;
      state.data = action.payload;
    },

    setCompany: (state, action) => {
      state.isCompany = true;
      state.isTalent = false;
      state.data = action.payload;
    },

    setSocket: (state, action) => {
      state.socket = action.payload;
    },

    logout: (state) => {
      state.socket = false;
      state.isTalent = false;
      state.data = null;
      localStorage.removeItem("rise_token");
      window.location.reload();
    },
  },
  extraReducers: {},
});

export const { setTalent, setCompany, logout, setSocket } = usersSlice.actions;

export default usersSlice.reducer;
