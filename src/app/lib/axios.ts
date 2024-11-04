import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://ec2-43-201-110-116.ap-northeast-2.compute.amazonaws.com:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

const fetchData = async (url: string, options = {}) => {
  try {
    const response = await axiosInstance(url, options)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError인 경우에만 접근
      return error.response?.data
    } else {
      // AxiosError가 아닌 경우
      return { message: "Unknown error occurred" }
    }
  }

}

export { fetchData }
