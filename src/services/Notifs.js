import axios from "../utils/axios";

export async function CreateNotif(data) {
  const res = await axios.post("/api/v1/notification/create", data);
  return res.data;
}

export async function GetNotifs() {
  const res = await axios.get("/api/v1/notification/get_my_notifs");
  return res.data;
}
