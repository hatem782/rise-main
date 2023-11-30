export const FormikHelper = (setFieldValue, values) => {
  let fields = Object.keys(values);
  fields.forEach((field) => {
    setFieldValue(field, values[field]);
  });
};
