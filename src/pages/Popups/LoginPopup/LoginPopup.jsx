import React, { useEffect, useState } from "react";
import Dialog from "../../../components/popup/Popup";
import styles from "./styles.module.scss";

import logo from "../../../assets/svgs/logo1.svg";
import google_icon from "../../../assets/svgs/login/google.svg";
import { useMutation } from "@tanstack/react-query";
import Button from "../../../components/buttons/BtnOrange/BtnOrange";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { initialValues_Login, reset_Login, validationSchema_Email, validationSchema_Login } from "./validation";
import { LoginCompany, LoginTalent, VerifEmail } from "../../../services/Auth.serv";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCompany, setTalent } from "../../../redux/User.reducer";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPopup(props) {
  const [state, setState] = useState("SignIn");
  const { handleClose } = props;

  useEffect(()=>{
    setState("SignIn")
  },[handleClose])

  return (
    <Dialog {...props}>
      {state === "SignIn" && (
        <SignIn setState={setState} handleClose={handleClose} />
      )}
      {state === "SignUp2" && (
        <SignUp2 setState={setState} handleClose={handleClose} />
      )}
      {state === "thank" && (
        <ThankYou setState={setState} handleClose={handleClose} />
      )}
        {state === "reset" && (
        <ResetPassword setState={setState} handleClose={handleClose} />
      )}
    </Dialog>
  );
}

const SignIn = ({ setState, handleClose }) => {
  const dispatch = useDispatch();
  const [errorLogin, setErrorLogin] = useState(false);
  const [msg, setmsg] = useState(false);
  const navigate = useNavigate();

  const LoginCompanyMutation = useMutation(LoginCompany, {
    onError: (error) => {
      setErrorLogin(true);
      console.log(error.response);
      if(error.response.status==403)
      setmsg('Account not yet activated');
      else
      setmsg("Email or password are incorrect !")
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("rise_token", data.data.token);
      toast.success(`Welcome ${data.data.response.name}`);
      dispatch(setCompany(data.data.response));
      setErrorLogin(false);
      navigate("/overview");
      handleClose();  
    },
  });

  const LoginTalentMutation = useMutation(LoginTalent, {
    onError: (error) => {
      setErrorLogin(true);
      console.log(error.response);

      if(error.response.status==403)
      setmsg('Account not yet activated');
      else
      setmsg("Email or password are incorrect !")

    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("rise_token", data.data.token);
      toast.success(
        `Welcome ${data.data.response.firstName} ${data.data.response.sureName}`
      );
      setErrorLogin(false);
      dispatch(setTalent(data.data.response));
      navigate("/user_dashboard");
      handleClose();
    },
  });

  const location = useLocation();

  const handle_submit = (values) => {
    setErrorLogin(false);
    LoginCompanyMutation.mutate(values);
    LoginTalentMutation.mutate(values);
  };

  const handleRedirect = () => {
    if (location.pathname == "/employers") navigate("/emp_cre_acc_comp_prof");
    else if (location.pathname == "/talent") navigate("/ca_profile");
    else navigate("/emp_cre_acc_comp_prof");
  };

  return (
    <div>
      <div className={styles["main"]}>
        <h1 className={styles["title"]}>Sign in to</h1>
        <img className={styles["logo"]} src={logo} alt="" />

        <button className={styles["google-btn"]}>
          <img src={google_icon} alt="" />
          <span>Continue with google</span>
        </button>

        <div className={styles["under-lined"]}>
          <span>OR</span>
        </div>

        <Formik
          initialValues={initialValues_Login}
          validationSchema={validationSchema_Login}
          onSubmit={handle_submit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className={styles["input"]}>
                <Field
                  type="text"
                  placeholder="Email / Username"
                  name="email"
                />
                <ErrorMessage
                  name={"email"}
                  component="div"
                  className={"error-msg"}
                />
              </div>

              <div className={styles["input"]}>
                <Field type="password" placeholder="Password" name="password" />
                <ErrorMessage
                  name={"password"}
                  component="div"
                  className={"error-msg"}
                />
              </div>

              <Button className={styles["btn"]}> Continue </Button>
            </Form>
          )}
        </Formik>
        {errorLogin && (
          <div className="error-msg ">{msg}</div>
        )}
        <div className={styles["remeber-forget"]}>
          <div>
            <input type="checkbox" /> Remeber Me
          </div>
          <div onClick={() => setState("reset")} style={{cursor:"pointer"}}>Forgot Password?</div>
        </div>
      </div>
      <div className={styles["footer"]}>
        <h2>
          Not a member yet ?<span onClick={handleRedirect}> Join Now </span>
        </h2>
      </div>
    </div>
  );
};

const ResetPassword = ({ setState,handleClose }) => {

  const [errorLogin,setErrorLogin] = useState()
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const LoginTalentMutation = useMutation(VerifEmail, {
    onError: (error) => {
      setErrorLogin(true)    },
    onSuccess: (data) => {
      toast.success(
        `A verification Email was sent to your inbox`
      );

      navigate("/");
      handleClose();
    },
  });

  function handle_submit(values){
    LoginTalentMutation.mutate(values);

  }

  return (
    <div>
      <div className={styles["main"]}>
        <h1 className={styles["title"]}>Reset your password</h1>
        <img className={styles["logo"]} src={logo} alt="" />


        <Formik
          initialValues={reset_Login}
          validationSchema={validationSchema_Email}
          onSubmit={handle_submit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className={styles["input"]}>
                <Field
                  type="text"
                  placeholder=" Enter your Email "
                  name="email"
                />
                <ErrorMessage
                  name={"email"}
                  component="div"
                  className={"error-msg"}
                />
 {errorLogin && (
          <div className="error-msg ">Sorry, your Email is not found.</div>
        )}              </div>
              <Button className={styles["btn"]}> Continue </Button>

            </Form>
          )}
          </Formik>



      </div>
      <div className={styles["footer"]}>
        <h2>
          Already a member ?
          <span onClick={() => setState("SignIn")}> Sign In </span>
        </h2>
      </div>
    </div>
  );
};

const SignUp2 = ({ setState }) => {
  return (
    <div>
      <div className={styles["main"]}>
        <p className={styles["description"]}>
          Discover Your Future Career with Rise. <br />
          Explore numerous fresh job prospects added each <br /> week. Benefit
          from tailored job suggestions, <br /> instant job notifications, and
          comprehensive <br /> career assistance.
        </p>

        <button className={styles["google-btn"]}>
          <img src={google_icon} alt="" />
          <span>Continue with google</span>
        </button>

        <div className={styles["under-lined"]}>
          <span>OR</span>
        </div>

        <div className={styles["input"]}>
          <input type="text" placeholder="Email / Username" />
        </div>

        <div className={styles["input"]}>
          <input type="password" placeholder="Create Password" />
        </div>

        <div className={styles["input"]}>
          <input type="password" placeholder="Confirm Password" />
        </div>

        <Button className={styles["btn"]}> Continue </Button>

        <div className={styles["agree-mails"]}>
          By joining I agree to receive emails from <span> Rise </span>
        </div>
      </div>
      <div className={styles["footer"]}>
        <h2>
          Already a member ?
          <span onClick={() => setState("SignIn")}> Sign In </span>
        </h2>
      </div>
    </div>
  );
};

const ThankYou = () => {
  return (
    <div className={styles["thank-main"]}>
      <img className={styles["logo"]} src={logo} alt="" />
      <h1 className={styles["title"]}>Thank you!</h1>
      <p>
        An email verification link has been sent to your account. <br />
        Go to your inbox and verify.
      </p>
    </div>
  );
};

export default LoginPopup;
