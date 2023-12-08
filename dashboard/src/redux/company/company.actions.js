import keys from "./company.keys";
import { toast } from "react-hot-toast";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";
import { init_manager } from "./company.reducer";

const GetAllCompanies = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/company/getAllCompany`,
        Mquery(query)
      );
      console.log(response.data);
      dispatch({
        type: keys.setComps,
        value: response.data,
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const DeleteCompany = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.delete(
        `/api/v1/company/deleteCompany/${data._id}`
      );
      console.log(response);
      dispatch(GetAllCompanies());
      toast.success("Company Deleted Successfully");
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

export { GetAllCompanies, DeleteCompany };
