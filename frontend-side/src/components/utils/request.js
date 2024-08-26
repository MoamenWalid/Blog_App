import axios from "axios";

export const req = axios.create({
  baseURL: "http://localhost:8000/"
})