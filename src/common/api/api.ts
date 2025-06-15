import axios from "axios";

const back = axios.create({
  baseURL: "http://localhost:4000/api",
});

export { back };
