import axios from "axios";
import { Token } from "../types";

const instance = axios.create({ baseURL: "http://lisa:3000" });

const HOMEWORKS_URL = "/homeworks";
const LOGIN_URL = "/login";

const getStatus = async () => {
  const response = await instance.get("/");
  return response.data as string;
};
const getHomeworksList = async () => {
  const response = await instance.get(`${HOMEWORKS_URL}`);
  return response.data;
};
const getHomework = async (homeworkId: string) => {
  const response = await instance.get(`${HOMEWORKS_URL}/${homeworkId}`);
  return response.data;
};
const deleteHomework = async (homeworkId: string, token: Token) => {
  await instance.delete(`${HOMEWORKS_URL}/${homeworkId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const createHomework = async (
  title: string,
  description: string,
  dueDate: Date,
  completed: boolean,
  token: Token
) => {
  const response = await instance.post(
    HOMEWORKS_URL,
    {
      title,
      description,
      dueDate,
      completed,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
const updateHomework = async (
  homeworkId: string,
  title: string,
  description: string,
  dueDate: Date,
  completed: boolean,
  token: Token
) => {
  const updateHomework = await instance.put(
    `${HOMEWORKS_URL}/${homeworkId}`,
    {
      title,
      description,
      dueDate,
      completed,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return updateHomework.data;
};

const login = async (email: string, password: string) => {
  const response = await instance.post(LOGIN_URL, {
    email,
    password,
  });
  return response.data;
};
export {
  getStatus,
  getHomeworksList,
  getHomework,
  deleteHomework,
  createHomework,
  updateHomework,
  login,
};
