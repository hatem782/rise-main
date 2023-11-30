import axios from "../utils/axios";

export async function LoginCompany(data) {
  const res = await axios.post("/api/v1/auth/loginCompany", { ...data });
  return res.data;
}

export async function LoginTalent(data) {
  const res = await axios.post("/api/v1/auth/loginTalent", { ...data });
  return res.data;
}

export async function LoginCompanyVerif(data) {
  const res = await axios.post("/api/v1/auth/loginCompanyVerif", { ...data });
  return res.data;
}

export async function LoginTalentVerif(data) {
  const res = await axios.post("/api/v1/auth/loginTalentVerif", { ...data });
  return res.data;
}

// get user as talent or as company
export async function GetCurrentUser() {
  const res = await axios.get("/api/v1/user/getUser");
  return res.data;
}

export async function ResetPassword(data,token) {
  console.log(data,token);
  const res = await axios.post("/api/v1/auth/reset-password",{...data});
  return res.data;
}

export async function VerifEmail(data) {
  const res = await axios.post("/api/v1/auth/forgot-password",{...data});
  return res.data;
}

export async function VerifAccount(token) {
  console.log(token);
  const res = await axios.post("/api/v1/auth/verif-account/"+token);
  return res.data;
}

// get user as talent or as company
export async function existMail(email) {
  const res = await axios.get(`/api/v1/auth/mail_exist/${email}`);
  return res.data;
}
