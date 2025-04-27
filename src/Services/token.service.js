import api from './api'

class TokenService {
  setToken(token) {
    console.log("Setting Token in localStorage --->>", token)
    localStorage.setItem("authToken", token)
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user))
  }

  getToken() {
    const token = localStorage.getItem("authToken")
    console.log("This is my Token --->>", token)
    return token
  }

  removeToken() {
    console.log("Removing Token and User from localStorage")
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }

  isAuthenticated() {
    return !!this.getToken()
  }

  async userInfo() {
    try {
      const response = await api.get('me')
      localStorage.setItem("user", JSON.stringify(response.data.user))
    } catch (error) {
      console.error('No Authenticated User Was Found', error)
    }
  }
}

const myTokenInstance = new TokenService()
export default myTokenInstance
