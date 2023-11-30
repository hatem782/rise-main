import axios from "../utils/axios";

export async function CreateDiscussion(data) {
  const res = await axios.post("/api/v1/disccusion/createDiscussions", data);
  return res.data;
}

export async function GetMyDiscussions() {
  const res = await axios.get("/api/v1/disccusion/getMyDiscussions");
  return res.data;
}

export async function SendMessage(data) {
  const res = await axios.post("/api/v1/message/createMessages", data);
  return res.data;
}

export async function GetMessagesByDiscussion(id) {
  const res = await axios.get(`/api/v1/message/getMessages/${id}`);
  return res.data;
}
