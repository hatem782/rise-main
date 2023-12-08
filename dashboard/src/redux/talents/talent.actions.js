import keys from "./talent.keys";
import { toast } from "react-hot-toast";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";

const GetAllTalents = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/admin/users`, Mquery(query));
      console.log(response);
      dispatch({
        type: keys.set_talents,
        value: response.data.users,
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const DeleteTalentByAdmin = (user, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      console.log(user);
      const response = await axios.delete(`/api/v1/admin/users/${user._id}`);
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Talent Deleted Successfully`);
      dispatch(GetAllTalents());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

export { GetAllTalents, DeleteTalentByAdmin };
