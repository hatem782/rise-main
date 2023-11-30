import React, { useState } from "react";
import Styles from "./style.module.scss";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import { Form, W50 } from "../../components/Form/Form";
import Input from "../../components/inputs/Input";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { LoginCompany, LoginTalent, ResetPassword } from "../../services/Auth.serv";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import { FormForget } from "../../components/Form-forget/Form";
import logo from "../../assets/svgs/logo1.svg";
import BtnOrange from "../../components/buttons/BtnOrange/BtnOrange";
import { useDispatch } from "react-redux";
import { setCompany, setTalent } from "../../redux/User.reducer";

const talentSchema = Yup.object().shape({
    password: Yup.string().required(),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Conform Password is required"),
  });

  const initialValues = {

    password: "", //
    confirmPass: "", //
  };

  const ForgotPassword = () =>{
    let {token} = useParams()
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const LoginCompanyMutation = useMutation(LoginCompany, {
        onError: (error) => {
        },
        onSuccess: (data) => {
          console.log(data);
          localStorage.setItem("rise_token", data.data.token);
          toast.success(`Welcome ${data.data.response.name}`);
          dispatch(setCompany(data.data.response));
          window.location.href ="/overview";
        },
      });
  
    const LoginTalentMutation = useMutation(LoginTalent, {
      onError: (error) => {
      },
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem("rise_token", data.data.token);
        toast.success(
          `Welcome ${data.data.response.firstName} ${data.data.response.sureName}`
        );
        dispatch(setTalent(data.data.response));
        window.location.href ="/user_dashboard/profile";
      },
    });
    const LoginMutation = useMutation(ResetPassword, {
        onError: (error) => {
            console.log(error);
          toast.error(
            `Your token is experied or invalide`
          );   
        },
        onSuccess: (data) => {
        console.log(data.result.type=="talent");
        console.log(data.result.type=="talent");
        console.log(data.result.type);
          toast.success(
            `your password has been successfully changed...`
          );
    
          setTimeout(() => {
            if(data.result.type=="talent")
            LoginTalentMutation.mutate({email:data.result.email,password});
            else if(data.result.type=="company")
            LoginCompanyMutation.mutate({email:data.result.email,password});
        }, 3000);
        },
      });
    function handle_submit(values){
        values.token = token;
        setPassword(values.password)
        LoginMutation.mutate(values,token);

    }

    return(
        <>
        
            <HomeNavbar></HomeNavbar>
        
            <div className={Styles['main-container']}>
                <div className={Styles['main-content']}>
                    <p>Reset your new<br/> password.</p>
                    <div className={Styles['logo-content']}>
                        <img src={logo} alt="logo"  />
                    </div>
                <Formik
            initialValues={initialValues}
            validationSchema={talentSchema}
            onSubmit={handle_submit}
            >
            {({ handleSubmit }) => (
                <FormForget onSubmit={handleSubmit} className="form-reset">
                <div className={Styles['input']}>

                <label className={Styles['label']} >Password</label>

                    <Field
                    type="password"
                    label="Password"
                    icon={null}
                    name="password"
                    placeholder=""
                    />
                    <ErrorMessage
                    name={"password"}
                    component="div"
                    className={"error-msg"}
                    />
                </div>

                <div className={Styles['input']}>
                <label className={Styles['label']} >Confirm your Password</label>
                    <Field
                type="password"
                label="Confirm Password"
                icon={null}
                name="confirmPass"
                placeholder=""
                    />
                    <ErrorMessage
                    name={"confirmPass"}
                    component="div"
                    className={"error-msg"}
                    />
                </div>

                <BtnOrange type="submit" className={Styles["btn"]}> Continue </BtnOrange>
                </FormForget>
            )}
            </Formik>
                </div>
            </div>

    
            <MainFooter></MainFooter>
        </>
    )

}

export default ForgotPassword;