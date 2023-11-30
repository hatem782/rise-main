import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  about: Yup.string().required("about is required"),
  cover_photo: Yup.string().optional(),
  logo_photo: Yup.string().optional(),
});

export const initialValues = {
  about: "",
  cover_photo: "",
  logo_photo: "",
};
