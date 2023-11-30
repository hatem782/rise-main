import { useEffect, useState } from "react";
import "./App.scss";
import Theme from "./theme/Theme";
import { Routes, Route, Navigate } from "react-router-dom";
import EmpCreAccCompProf1 from "./pages/EmpCreAccCompProf/EmpCreAccCompProf1";
import EmpCreAccCompProf2 from "./pages/EmpCreAccCompProf/EmpCreAccCompProf2";
import Home from "./pages/Home/Home";

import CA_Profile from "./pages/CreateAccount/CA_Profile";
import StartHistory from "./pages/CreateAccount/StartHistory";
import WrokHistory from "./pages/CreateAccount/WrokHistory";
import JobDescription from "./pages/CreateAccount/JobDescription";
import WorkSummary from "./pages/CreateAccount/WorkSummary";
import StartEducation from "./pages/CreateAccount/StartEducation";
import CA_Education from "./pages/CreateAccount/Education";
import EducationSummary from "./pages/CreateAccount/EducationSummary";
import StartSkills from "./pages/CreateAccount/StartSkills";
import CA_Skills from "./pages/CreateAccount/CA_Skills";
import SummaryCareerObj from "./pages/CreateAccount/SummaryCareerObj";
import AddOtherThings from "./pages/CreateAccount/AddOtherThings";
import CA_VerifData from "./pages/CreateAccount/CA_VerifData/CA_VerifData";
import Finishing from "./pages/CreateAccount/Finishing";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ReplyToEmployer from "./pages/UserDashboard/ReplyToEmployer/ReplyToEmployer";
import CandidateApply from "./pages/UserDashboard/CandidateApply/CandidateApply";
import EmpSeeTalentView from "./pages/CompanyPages/EmpSeeTalentView/EmpSeeTalentView";
import EmpWritingToTalent from "./pages/CompanyPages/EmpWritingToTalent/EmpWritingToTalent";
import EmpBillings from "./pages/CompanyPages/EmpBillings/EmpBillings";
import EmpJobs from "./pages/CompanyPages/EmpJobs/EmpJobs";
import EmpCompany from "./pages/CompanyPages/EmpCompany/EmpCompany";
import EmpViewCandidateCovLet from "./pages/CompanyPages/EmpViewCandidateCovLet/EmpViewCandidateCovLet";
import Employers from "./pages/CompanyPages/Employers/Employers";
import MainPage from "./pages/CareerCenter/MainPage/MainPage";
import InfoPage from "./pages/CareerCenter/InfoPage/InfoPage";
import PostPage from "./pages/CareerCenter/PostPage/PostPage";
import SecondaryPageCC from "./pages/CareerCenter/SecondaryPage/SecondaryPageCC";
import EmpPostJob from "./pages/CompanyPages/EmpPostJob/EmpPostJob";
import CompanyProfileEdit from "./pages/CompanyPages/CompanyProfileEdit/CompanyProfileEdit";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";
import EnrollToRAP from "./pages/EnrollToRAP/EnrollToRAP";
import EnrollToRAP_Send from "./pages/EnrollToRAP_Send/EnrollToRAP_Send";
import Privacy_Policy from "./pages/Privacy_Policy/Privacy_Policy";
import FQA from "./pages/FQA/FQA";
import CustomToaster from "./components/Toast/Toast";
import { GetCurrentUser } from "./services/Auth.serv";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setCompany, setTalent, setSocket } from "./redux/User.reducer";

import io from "socket.io-client";
import Talent from "./pages/Talent/Talent";
import useScrollToTopOnRouteChange from "./hooks/useToTop";
import ViewJobsAndInternships from "./pages/UserDashboard/ViewJobsAndInternships/ViewJobsAndInternships";
import WithoutUserWiewJobsAndInternships from "./pages/WithoutUserWiewJobsAndInternships/WithoutUserWiewJobsAndInternships";
import HomeMobile from "./pages-mobile/Home/Home";
import { useMediaQuery } from 'react-responsive'
import TalentMobile from "./pages-mobile/Talent/Talent";
import FAQMobile from "./pages-mobile/FQA/FQA";
import Privacy_PolicyMobile from "./pages-mobile/Privacy_Policy/Privacy_Policy";
import ContactUsMobile from "./pages-mobile/ContactUs/ContactUs";
import EnrollToRAPMobile from "./pages-mobile/EnrollToRAP/EnrollToRAP";
import EmployersMobile from "./pages-mobile/Employers/Employers";
import AboutMobile from "./pages-mobile/About/About";
import EnrollToRAP_SendMobile from "./pages-mobile/EnrollToRAP_Send/EnrollToRAP_Send";
import EmpCreAccCompProf1Mobile from "./pages-mobile/EmpCreAccCompProf/EmpCreAccCompProf1";
import VerifAccountPage from "./pages/verif-account/verif-account";
import ForgotPassword from "./pages/forgot-password/forgot-password";

function App() {
  const dispatch = useDispatch();
  const { isCompany, isTalent } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);
  useScrollToTopOnRouteChange(["/privacy.policy"]);

  const LoginCompanyMutation = useMutation(GetCurrentUser, {
    onError: (error) => {
      setLoading(false);
    },
    onSuccess: (data) => {
      setLoading(false);
      if (data?.role === "talent") {
        dispatch(setTalent(data?.user));
      }

      if (data?.role === "company") {
        dispatch(setCompany(data?.user));
      }
    },
  });

  useEffect(() => {
    LoginCompanyMutation.mutate();
  }, []);

  useEffect(() => {
    if (isCompany || isTalent) {
      const newSocket = io(`http://localhost:3006`);
      dispatch(setSocket(newSocket));
      return () => newSocket.close();
    }
  }, [isCompany, isTalent]);

  return (
    <div>
      <CustomToaster />
      <Theme>
        {!loading && (
          <>
            {!isTalent && !isCompany && <NotConnectedLinks />}
            {isTalent && <TalentLinks />}
            {isCompany && <CompanyLinks />}
          </>
        )}
      </Theme>
    </div>
  );
}
const NotConnectedLinks = () => {
  const isMobile = useMediaQuery({ maxWidth: "992px" })

  useEffect(()=>{
    console.log(isMobile);
  },[])

  return (
    <Routes>
            <Route element={<VerifAccountPage />} path="/verif/:token" />
            <Route element={<ForgotPassword />} path="/reset-password/:token" />

      <Route element={isMobile ? <HomeMobile />:<Home />} path="/" />
      <Route element={ <Home />} path="/home" />
      <Route element={isMobile ?<AboutMobile/>:<About />} path="/about" />
      <Route element={isMobile ? <ContactUsMobile/>:<ContactUs />} path="/contact_us" />
      <Route element={isMobile ? <EnrollToRAPMobile/> : <EnrollToRAP />} path="/enroll.rap" />
      <Route element={isMobile ? <EnrollToRAP_SendMobile/>:<EnrollToRAP_Send />} path="/enroll.rap.send" />
      <Route element={isMobile ? <Privacy_PolicyMobile/> : <Privacy_Policy />} path="/privacy.policy" />
      <Route element={isMobile ? <FAQMobile/> : <FQA />} path="/fqa" />
      <Route element={isMobile ? <EmployersMobile/>:<Employers />} path="/employers" />
      <Route element={ isMobile ? <TalentMobile />: <Talent />} path="/talent" />
      <Route
        element={<WithoutUserWiewJobsAndInternships />}
        path="/jobs_internship"
      />

      <Route element={<MainPage />} path="/career_center" />
      <Route element={<InfoPage />} path="/career_center/info" />
      <Route element={<PostPage />} path="/career_center/post/:id" />
      <Route element={<SecondaryPageCC />} path="/career_center/postes" />

      {/*####################### Company Create  #######################*/}
      <Route element={isMobile ? <EmpCreAccCompProf1Mobile/>:<EmpCreAccCompProf1 />} path="/emp_cre_acc_comp_prof" />
      <Route element={<EmpCreAccCompProf2 />} path="/comp_prof_info" />

      {/*####################### Talent Create  #######################*/}
      <Route element={<CA_Profile />} path="/ca_profile" />
      <Route element={<StartHistory />} path="/ca_start_history" />
      <Route element={<WrokHistory />} path="/ca_work_history" />
      <Route element={<JobDescription />} path="/job_description" />
      <Route element={<WorkSummary />} path="/work_summary" />
      <Route element={<StartEducation />} path="/ca_start_education" />
      <Route element={<CA_Education />} path="/ca_education" />
      <Route element={<EducationSummary />} path="/education_summary" />
      <Route element={<StartSkills />} path="/ca_start_skills" />
      <Route element={<CA_Skills />} path="/ca_skills" />
      <Route element={<SummaryCareerObj />} path="/summary_career" />
      <Route element={<AddOtherThings />} path="/add_other_things" />
      <Route element={<CA_VerifData />} path="/verif_data" />
      <Route element={<Finishing />} path="/ca_finish" />
      {/*####################### Talent Create  #######################*/}

      <Route element={<Navigate to={"/"} />} path="/*" />
    </Routes>
  );
};

const TalentLinks = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Home />} path="/home" />
      <Route element={<About />} path="/about" />
      <Route element={<ContactUs />} path="/contact_us" />
      <Route element={<EnrollToRAP />} path="/enroll.rap" />
      <Route element={<EnrollToRAP_Send />} path="/enroll.rap.send" />
      <Route element={<Privacy_Policy />} path="/privacy.policy" />
      <Route element={<FQA />} path="/fqa" />
      <Route element={<Employers />} path="/employers" />
      <Route element={<Talent />} path="/talent" />
      <Route
        element={<WithoutUserWiewJobsAndInternships />}
        path="/jobs_internship"
      />

      <Route element={<MainPage />} path="/career_center" />
      <Route element={<InfoPage />} path="/career_center/info" />
      <Route element={<PostPage />} path="/career_center/post/:id" />
      <Route element={<SecondaryPageCC />} path="/career_center/postes" />

      {/*####################### Talent Create  #######################*/}
      <Route element={<CA_Profile />} path="/ca_profile" />
      <Route element={<StartHistory />} path="/ca_start_history" />
      <Route element={<WrokHistory />} path="/ca_work_history" />
      <Route element={<JobDescription />} path="/job_description" />
      <Route element={<WorkSummary />} path="/work_summary" />
      <Route element={<StartEducation />} path="/ca_start_education" />
      <Route element={<CA_Education />} path="/ca_education" />
      <Route element={<EducationSummary />} path="/education_summary" />
      <Route element={<StartSkills />} path="/ca_start_skills" />
      <Route element={<CA_Skills />} path="/ca_skills" />
      <Route element={<SummaryCareerObj />} path="/summary_career" />
      <Route element={<AddOtherThings />} path="/add_other_things" />
      <Route element={<CA_VerifData />} path="/verif_data" />
      <Route element={<Finishing />} path="/ca_finish" />
      {/*####################### Talent Create  #######################*/}

      {/* ########################### Special Links ########################### */}
      <Route element={<UserDashboard />} path="/user_dashboard/*" />

      <Route element={<ReplyToEmployer />} path="/reply_to_emp" />
      <Route element={<CandidateApply />} path="/write_cover_letter" />

      <Route element={<Navigate to={"/"} />} path="/*" />
    </Routes>
  );
};

const CompanyLinks = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Home />} path="/home" />
      <Route element={<About />} path="/about" />
      <Route element={<ContactUs />} path="/contact_us" />
      <Route element={<EnrollToRAP />} path="/enroll.rap" />
      <Route element={<EnrollToRAP_Send />} path="/enroll.rap.send" />
      <Route element={<Privacy_Policy />} path="/privacy.policy" />
      <Route element={<FQA />} path="/fqa" />
      <Route element={<Employers />} path="/employers" />
      <Route element={<Talent />} path="/talent" />
      <Route
        element={<WithoutUserWiewJobsAndInternships />}
        path="/jobs_internship"
      />

      <Route element={<MainPage />} path="/career_center" />
      <Route element={<InfoPage />} path="/career_center/info" />
      <Route element={<PostPage />} path="/career_center/post/:id" />
      <Route element={<SecondaryPageCC />} path="/career_center/postes" />

      {/*####################### Talent Create  #######################*/}
      <Route element={<CA_Profile />} path="/ca_profile" />
      <Route element={<StartHistory />} path="/ca_start_history" />
      <Route element={<WrokHistory />} path="/ca_work_history" />
      <Route element={<JobDescription />} path="/job_description" />
      <Route element={<WorkSummary />} path="/work_summary" />
      <Route element={<StartEducation />} path="/ca_start_education" />
      <Route element={<CA_Education />} path="/ca_education" />
      <Route element={<EducationSummary />} path="/education_summary" />
      <Route element={<StartSkills />} path="/ca_start_skills" />
      <Route element={<CA_Skills />} path="/ca_skills" />
      <Route element={<SummaryCareerObj />} path="/summary_career" />
      <Route element={<AddOtherThings />} path="/add_other_things" />
      <Route element={<CA_VerifData />} path="/verif_data" />
      <Route element={<Finishing />} path="/ca_finish" />
      {/*####################### Talent Create  #######################*/}

      {/* ########################### Special Links ########################### */}

      <Route element={<EmpJobs />} path="/company_jobs" />
      <Route element={<EmpCompany />} path="/overview" />
      <Route element={<EmpPostJob />} path="/emp_post_job" />

      <Route element={<EmpSeeTalentView />} path="/manage_applicants" />
      <Route element={<EmpWritingToTalent />} path="/emp_writing_to_talent" />
      <Route element={<EmpBillings />} path="/pricing_and_billing" />

      <Route
        element={<EmpViewCandidateCovLet />}
        path="/emp_view_candidate_cover_letter"
      />

      <Route element={<CompanyProfileEdit />} path="/edit_company_profile" />

      <Route element={<Navigate to={"/"} />} path="/*" />
    </Routes>
  );
};

export default App;
