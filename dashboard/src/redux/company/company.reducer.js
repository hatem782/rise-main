import keys from "./company.keys";

export const init_univ = {
  OrganMere: "",
  address: "",
  cover: "",
  createdAt: "",
  description: "",
  long_desc: "",
  _id: "",
  logo: "",
  nom: "",
  fullName: "",
  pays: "",
  qrCode: "",
  tel: "",
};

export const init_manager = {
  _id: "",
  role: "",
  email: "",
  verified: false,
  suspended: false,
  parcoursScolaire: [],
  requestDelete: false,
  experienceProfessionnelle: [],
  createdAt: new Date(),
};

export const InitialState = {
  payload: false,
  companies: [],
  formations: [],
  demands: [],
  manager: { ...init_manager },
  managers: [],
  selected_univ: { ...init_univ },
};

export const CompanyReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.setComps:
      return { ...state, companies: action.value, payload: false };
    case keys.payload:
      return { ...state, payload: action.value };
    case keys.setFormas:
      return { ...state, formations: action.value, payload: false };
    case keys.setDemands:
      return { ...state, demands: action.value, payload: false };
    case keys.setManager:
      return { ...state, manager: action.value, payload: false };
    case keys.set_allManagers:
      return { ...state, managers: action.value, payload: false };
    case keys.setSelUniv:
      return { ...state, selected_univ: action.value, payload: false };
    default:
      return state;
  }
};
