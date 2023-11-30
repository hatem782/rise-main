import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MainFooter from "../../layouts/Footers/MainFooter/MainFooter";
import HomeNavbar from "../../layouts/Navbars/HomeNavbar/HomeNavbar";
import { setCompany, setTalent } from "../../redux/User.reducer";
import { LoginCompany, LoginCompanyVerif, LoginTalent, LoginTalentVerif, VerifAccount } from "../../services/Auth.serv";
import Styles from './style.module.scss';
import img from '../../assets/svgs/loading.svg'
const VerifAccountPage = () =>{
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const LoginCompanyMutation = useMutation(LoginCompanyVerif, {
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
  
    const LoginTalentMutation = useMutation(LoginTalentVerif, {
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
    const {token} = useParams();

    const GetUserMutatiob = useMutation(VerifAccount, {
        onError: (error) => {
          toast.error("We can't Verify your Email");
        },
        onSuccess: (data) => {
        setTimeout(() => {
          toast.success("Your account is now verified...");

            if(data.type=="talent")
            LoginTalentMutation.mutate(data.results);
            else if(data.type=="company")
            LoginCompanyMutation.mutate(data.results);
        }, 3000);
    },
      });
    
      useEffect(() => {
        GetUserMutatiob.mutate(token);
      }, [token]);
    
      return (
        <>
            <HomeNavbar></HomeNavbar>
            <div className={Styles['main-container']}>
                <div className={Styles['main-content']}>
                    <div className={Styles['main-load']}>
                        <img src={img} alt="loading" />
                    </div>
                    <p >Verifing your account it might take few seconds...</p>
                </div>
            </div>
            <MainFooter></MainFooter>
        </>
      )
}

export default VerifAccountPage;