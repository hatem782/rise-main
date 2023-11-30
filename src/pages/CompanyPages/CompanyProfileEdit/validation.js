import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string()
    .oneOf(["Employer", "Recruiter"])
    .required("Type is required"),
  year: Yup.number().required("Year is required"), //
  number: Yup.string().required("Number is required"), //
  telephoneNumber: Yup.string().required("Telephone number is required"), //
  telephoneNumber_location: Yup.string().required(
    "Telephone number location is required"
  ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  certification: Yup.string().optional(), //
  url: Yup.string().optional(),
  urlLinkedIn: Yup.string().optional(),
  intPresence: Yup.string().optional(),
  headOffice: Yup.string().optional(),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Conform Password is required"),
  about: Yup.string().required("about is required"),
  cover_photo: Yup.string().optional(),
  logo_photo: Yup.string().optional(),
});

export const initialValues = {
  name: "",
  type: "",
  year: "",
  number: "",
  telephoneNumber: "",
  telephoneNumber_location: "",
  email: "",
  country: "",
  city: "",
  certification: "",
  url: "",
  urlLinkedIn: "",
  intPresence: "",
  headOffice: "",
  password: "",
  passwordConfirmation: "",
  about: "",
  cover_photo: "",
  logo_photo: "",
};

export const validationSchemaUpdate = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string()
    .oneOf(["Employer", "Recruiter"])
    .required("Type is required"),
  year: Yup.number().required("Year is required"), //
  number: Yup.string().required("Number is required"), //
  telephoneNumber: Yup.string().required("Telephone number is required"), //
  telephoneNumber_location: Yup.string().required(
    "Telephone number location is required"
  ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  certification: Yup.string().optional(), //
  url: Yup.string().optional(),
  urlLinkedIn: Yup.string().optional(),
  intPresence: Yup.string().optional(),
  headOffice: Yup.string().optional(),

  about: Yup.string().required("about is required"),
  cover_photo: Yup.string().optional(),
  logo_photo: Yup.string().optional(),
});

export const initialValuesUpdate = {
  name: "",
  type: "",
  year: "",
  number: "",
  telephoneNumber: "",
  telephoneNumber_location: "",
  email: "",
  country: "",
  city: "",
  certification: "",
  url: "",
  urlLinkedIn: "",
  intPresence: "",
  headOffice: "",

  about: "",
  cover_photo: "",
  logo_photo: "",
};
