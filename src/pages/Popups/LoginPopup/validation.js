import * as Yup from "yup";

export const initialValues_Login = {
  email: "",
  password: "",
};

export const reset_Login = {
  email: "",
};

export const validationSchema_Login = Yup.object().shape({
  email: Yup.string()
    .required("Email or phone number is required")
    .test(
      "email-or-phone",
      "Invalid input. Please enter a valid email or phone number.",
      (value) => {
        if (Yup.string().email().isValidSync(value)) {
          return true;
        }

        if (
          Yup.string()
            .matches(/^\d+$/, "Phone number is not valid")
            .isValidSync(value)
        ) {
          return true;
        }

        return false;
      }
    ),
  password: Yup.string().required("Password is required"),
});

export const validationSchema_Email = Yup.object().shape({
  email: Yup.string()
    .required("Email or phone number is required")

});

// const emailRegex = /^[a-z0-9]+(?:[.-][a-z0-9]+)*@(?!\.|\-)[a-z]+(?:\.[a-z]+)*$/;
