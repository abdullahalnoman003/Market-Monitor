

import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/Authentication/Context/AuthContext';

const axiosSecure = axios.create({
    baseURL: `https://monitor-market-server.vercel.app/`
        // baseURL: `http://localhost:3000/`

})

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.accessToken) return;

    axiosSecure.interceptors.request.handlers = [];
    axiosSecure.interceptors.response.handlers = [];

    axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;

        if (status === 403) {
          navigate('/unauthorized');
        } else if (status === 401) {
          logOut()
            .then(() => navigate('/login'))
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );
  }, [user?.accessToken, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;


// import axios from 'axios';
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Components/Authentication/Context/AuthContext';

// const axiosSecure = axios.create({
//     // baseURL: `https://monitor-market-server.vercel.app/`
//         baseURL: `http://localhost:3000/`

// })
// const useAxiosSecure = () => {
//     const { user, logOut } = useContext(AuthContext);
//     const navigate = useNavigate();

//     axiosSecure.interceptors.request.use(config => {
//         config.headers.Authorization = `Bearer ${user.accessToken}`
//         return config;
//     }, error => {
//         return Promise.reject(error);
//     })

//     axiosSecure.interceptors.response.use(res => {
//         return res;
//     }, error => {
//         const status = error.status;
//         if (status === 403) {
//             navigate('/');
//         }
//         else if (status === 401) {
//             logOut()
//                 .then(() => {
//                     navigate('/login')
//                 })
//                 .catch(() => { })
//         }
//         return Promise.reject(error);
//     })
//     return axiosSecure;
// };

// export default useAxiosSecure;