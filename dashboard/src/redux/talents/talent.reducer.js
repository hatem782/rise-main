import keys from "./talent.keys";

export const init_talent = {
  role: "USER",
  _id: "",
  firstName: "",
  sureName: "",
  profession: "",
  city: "",
  country: "",
  postal_code: "",
  phone: "",
  email: "",
  career_description: "",
  additional_data: "",
  createdAt: new Date(),
};

export const InitialState = {
  payload: false,
  talents: [],
  talent: { ...init_talent },
};

export const TalentReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.set_talent:
      return { ...state, talent: action.value, payload: false };
    case keys.payload:
      return { ...state, payload: action.value };
    case keys.set_talents:
      return { ...state, talents: action.value, payload: false };
    default:
      return state;
  }
};
