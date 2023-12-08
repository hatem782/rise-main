import keys from "./user.keys";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
import axios from "../../custom/axios";
import { InitialState } from "./user.reducer";

const ActionLogin = (user, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      // to get response from back
      const response = await axios.post(`/api/v1/auth/loginAdmin`, {
        ...user,
      });

      // to get user and token objects
      console.log(response);

      const real_user = response?.data?.data?.response;

      const real_toke = response?.data?.data?.token;

      // to set the token and reftoken in storage
      localStorage.setItem("accessToken", real_toke);
      toast.success(
        `Good Morning ${real_user.firstName} ${real_user.sureName}`
      );
      // every thing is ok here
      dispatch({
        type: keys.all,
        value: {
          payload: false,
          is_connected: true,
          user: real_user,
        },
      });
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
      console.log(error?.response);
      toast.error(error?.response?.data?.message);
    }
  };
};

const GetUserByToken = (callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/user/getUser`);
      console.log(response);

      dispatch({
        type: keys.all,
        value: {
          payload: false,
          is_connected: true,
          user: response.data.user,
        },
      });
      // toast.success(`Good Morning ${real_user.firstName} ${real_user.lastName}`);
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
      callback();
      console.log(error?.response);
      // toast.error(error?.response?.data?.message);
    }
  };
};

const Disconnect = () => {
  return (dispatch) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({
      type: keys.all,
      value: {
        ...InitialState,
      },
    });
  };
};

export { ActionLogin, GetUserByToken, Disconnect };
