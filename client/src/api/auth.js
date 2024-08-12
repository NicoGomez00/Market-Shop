import axios from './axios'

export const registerRequest = async (user) => {
    try {
        const res = await axios.post('/register' , user)
        return res
    } catch (error) {
        console.error(error)
        return {error: error.response.data , success: false}
    }
}

export const loginRequest = async (user) => {
    try {
        const res = await axios.post('/login' , user)
        return res
    } catch (error) {
        console.error(error)
        return {error: error.response.data , success: false}
    }
}

export const addUserDataRequest = async (user) => {
    try {
        const res = await axios.patch('/userAccount' , user)
        return res
    } catch (error) {
        console.error(error)
        return {error: error.response.data , success: false}
    }
}

export const verifyTokenRequest = async (token) => {
    return await axios.get('/verify', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
  };