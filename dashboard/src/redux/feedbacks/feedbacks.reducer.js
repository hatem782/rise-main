import keys from "./feedbacks.keys";

export const init_feedbacks = {
  id: "",
  starsNumber: 1,
  comment: "",
  seen: "",
  User: { firstName: "", sureName: "", email: "", phone: "", _id: "" },
  createdAt: new Date(),
};

let fakedata = [
  {
    id: "1",
    starsNumber: 1,
    comment:
      " lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    seen: "",
    User: {
      firstName: "firstName",
      sureName: "sureName",
      email: "email",
      phone: "phone",
      _id: "1",
    },
    createdAt: new Date(),
  },
  {
    id: "2",
    starsNumber: 2,
    comment: "comment2",
    seen: "",
    User: {
      firstName: "firstName2",
      sureName: "sureName2",
      email: "email2",
      phone: "phone2",
      _id: "2",
    },
    createdAt: new Date(),
  },
  {
    id: "3",
    starsNumber: 3,
    comment: "comment3",
    seen: "",
    User: {
      firstName: "firstName3",
      sureName: "sureName3",
      email: "email3",
      phone: "phone3",
      _id: "3",
    },
    createdAt: new Date(),
  },
];

export const InitialState = {
  payload: false,
  feedbacks: [...fakedata],
  feedback: { ...init_feedbacks },
};

export const feedbacksReducer = (state = { ...InitialState }, action) => {
  switch (action.type) {
    case keys.all:
      return { ...action.value };
    case keys.set_feedbacks:
      return { ...state, feedbacks: action.value, payload: false };
    case keys.set_feedback:
      return { ...state, feedback: action.value, payload: false };
    case keys.payload:
      return { ...state, payload: action.value };
    default:
      return state;
  }
};
