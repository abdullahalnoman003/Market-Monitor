import axios from "axios";

const useAxiosSecure = axios.create({
  baseURL: `http://localhost:3000/`,
});

export default useAxiosSecure;
