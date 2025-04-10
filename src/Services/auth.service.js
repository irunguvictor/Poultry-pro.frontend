import { ref, computed } from 'vue'
import TokenService from './token.service'
import api from './api'

const user = ref(null)
const abilities = ref({})
const loading = ref(false)
const error = ref(null)

export function useAuth() {
  if (!user.value && TokenService.isAuthenticated()) {
    loadUserInfo()
  }

  const isAuthenticated = computed(() => !!user.value)

  const isAdmin = computed(() => {
    return user.value && user.value.role?.slug === 'admin'
  })

  const currentUser = computed(() => user.value)

  const userAbilities = computed(() => abilities.value)

  function can(ability) {
    return abilities.value[ability] === true
  }

  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      const response = await api.post('login', credentials)

      if (response.data.token && response.data.user) {
        const { token, user: userData, abilities: userAbilities } = response.data

        TokenService.setToken(token)
        user.value = userData
        abilities.value = userAbilities || {}
        TokenService.setUser(userData)

        return response
      } else {
        throw new Error('Invalid response format from server')
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message)
      error.value = err.response?.data?.message || err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('register', userData)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    error.value = null

    try {
      await api.post('logout')
    } catch (err) {
      console.error('Logout error:', err.response?.data || err.message)
    } finally {
      user.value = null
      abilities.value = {}
      TokenService.removeToken()
      localStorage.removeItem('user') // 👈 Clear user info from localStorage
      loading.value = false
    }
  }

  async function loadUserInfo() {
    loading.value = true
    error.value = null

    try {
      if (TokenService.isAuthenticated()) {
        const response = await api.get('me')

        if (response.data.user) {
          user.value = response.data.user
          abilities.value = response.data.abilities || {}
        } else {
          throw new Error('Invalid user data')
        }
      }
    } catch (err) {
      console.error('Failed to load user info:', err)
      error.value = 'Failed to load user info'
      TokenService.removeToken()
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(profileData) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put('update-profile', profileData)
      user.value = response.data.user || response.data
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Profile update failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    abilities: userAbilities,
    isAuthenticated,
    isAdmin,
    currentUser,
    can,
    login,
    register,
    logout,
    loadUserInfo,
    updateProfile
  }
}

const globalAuthService = {
  isAuthenticated: () => !!user.value,
  isAdmin: () => user.value && user.value.role?.slug === 'admin',
  getCurrentUser: () => user.value,
  getAbilities: () => abilities.value,
  can: (ability) => abilities.value[ability] === true,
  getLoading: () => loading.value,
  getError: () => error.value,
  login: async (credentials) => {
    const { login } = useAuth()
    return login(credentials)
  },
  register: async (userData) => {
    const { register } = useAuth()
    return register(userData)
  },
  logout: async () => {
    const { logout } = useAuth()
    return logout()
  },
  loadUserInfo: async () => {
    const { loadUserInfo } = useAuth()
    return loadUserInfo()
  },
  updateProfile: async (profileData) => {
    const { updateProfile } = useAuth()
    return updateProfile(profileData)
  }
}

export default globalAuthService
