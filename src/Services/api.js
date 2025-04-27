import axios from 'axios'
import TokenService from './token.service'

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // your Laravel backend URL
  withCredentials: true, // allow Laravel to send cookies if needed
})

// Automatically add Authorization header before each request
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken()
    console.log('Injecting Token into API:', token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Optional: Handle 401 Unauthorized globally (optional improvement)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Maybe token expired.')
      // You could redirect to login here if you want:
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
