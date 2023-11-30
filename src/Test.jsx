import { Field, Formik } from "formik";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const initialValues = {
  firstName: "",
  lastName: "",
  age: "",
};

function Test() {
  const ref = useRef(null);
  const [state, setState] = useState(initialValues);

  const handle_submit = (values) => {
    console.log(values);
  };

  const FormikHelper = (setFieldValue, values) => {
    let fields = Object.keys(values); // ["firstName","lastName","age"]
    fields.forEach((field) => {
      setFieldValue(field, values[field]);
    });
  };

  const TestChangeStateromApi = () => {
    setState({ firstName: "hatem", lastName: "ben echikh", age: "24" });
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.click();
    }
  }, [state]);

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handle_submit}>
        {({ handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} method="post">
            <div
              ref={ref}
              onClick={() => {
                FormikHelper(setFieldValue, state);
              }}
            />

            <Field name="firstName" placeholder="firstName" />
            <Field name="lastName" placeholder="lastName" />
            <Field name="age" placeholder="age" />

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>

      <button onClick={TestChangeStateromApi}> Change Values </button>
    </div>
  );
}

export default Test;
