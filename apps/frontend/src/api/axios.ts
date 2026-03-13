import axios from 'axios'

export const api = axios.create({
  // baseURL: import.meta.env.BASE_API_URL,
  baseURL: 'http://localhost:3100/api',
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data)
    }

    return Promise.reject(error)
  },
)
