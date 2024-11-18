import axios from "axios"
// import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: "http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// // 요청 인터셉터
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // 토큰이 만료되었을 때 (401 에러)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = Cookies.get('refreshToken');
//         const response = await axios.post('/users/refresh', {
//           refreshToken: refreshToken
//         });

//         if (response.data.accessToken) {
//           Cookies.set('accessToken', response.data.accessToken, {
//             expires: 7,
//             secure: true,
//             sameSite: 'strict'
//           });

//           originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//           return axiosInstance(originalRequest);
//         }
//       } catch (refreshError) {
//         Cookies.remove('accessToken');
//         Cookies.remove('refreshToken');
//         window.location.href = '/login_bm';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

const fetchData = async (url: string, options = {}) => {
  try {
    const response = await axiosInstance({
      url,
      ...options,
    });
    console.log('response', response);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError인 경우에만 접근
      return {
        status: error.response?.status || 500,
        data: error.response?.data
      };
    } else {
      // AxiosError가 아닌 경우
      return {
        status: 500,
        data: { message: "Unknown error occurred" }
      };
    }
  }
};

export { fetchData };
