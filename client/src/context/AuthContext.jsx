import { loginRequest , registerRequest , verifyTokenRequest , addUserDataRequest } from "../api/auth.js";
import { getAllCartRequest , updateCartItemQuantity , getProductsInfoRequest , addToCartRequest , deleteCartRequest , deleteAllCartRequest} from "../api/cart.js";
import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from "js-cookie";
import PropTypes from 'prop-types';


const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within a authProvider')
    }
    return context
}

export const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null)
    const [errors , setErrors] = useState([])
    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const [shoppingCart , setShoppingCart] = useState([])

    useEffect(() => {
      console.log("Usuario logeado: " ,  isAuthenticated)
    } , [shoppingCart])

    const registerUser = async (user) => {
        try {
            const res = await registerRequest(user)
            if(res.status != 200){
                console.log('Error al registrar usuario')
                setErrors(res.error)
            }else{
                setUser(res.data)
                setIsAuthenticated(true)
                setErrors([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loginUser = async (user) => {
      try {
        const res = await loginRequest(user)
        console.log(res)
        if(res.status != 200){
          console.log('Error al logear usuario')
          setErrors(res.error)
        }else{
          setUser(res.data)
          setIsAuthenticated(true)
          setErrors([])
        }
      } catch (error) {
        console.log(error)        
      }
    }

    const addUserData = async(user) => {
      try {
        const res = await addUserDataRequest(user)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const logout = async () => {
      try {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser([])
      } catch (error) {
        console.log(error)
      }
    }

    const addToCart = async (product) => {
      try {
        if(!isAuthenticated){
          return false
        }
        const res = await addToCartRequest(product)
        console.log(res)
        if(!res) {
          return
        }else{
          setShoppingCart([...shoppingCart, product]);
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getAllCart = async() => {
      try {
        const res = await getAllCartRequest(user)
        if(res.data.length > 0){
          const shopItems = res.data[0].items
          setShoppingCart(shopItems)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getProductCart = async(productIds) => {
      try {
        const res = await getProductsInfoRequest(productIds);
        return res.data
    } catch (error) {
        console.log(error);
    }
    }

    const updateItemQuantity = async (productId , i) => {
      try {
        const res = await updateCartItemQuantity(productId , i)
        return res.data
      } catch (error) {
        console.log(error)
      }

    }

    const deleteCartItem = async(id) => {
      try {
        const res = await deleteCartRequest(id)
        console.log(res)
        if(res.status === 200){
          setShoppingCart(shoppingCart.filter(product => product._id !== id))
      }
      } catch (error) {
        console.log(error)
      }
    }

    const deleteAllCart = async() => {
      try {
        await deleteAllCartRequest()
        setShoppingCart([])
      } catch (error) {
        console.log(error)
      }
    }

    
  useEffect(() => {
    async function checkLogin(){
      const cookies = Cookies.get();
      if(cookies.token){
        try {
          const res = await verifyTokenRequest(cookies.token)
          if(!res.data) return setIsAuthenticated(false)
          setIsAuthenticated(true)
          setUser(res.data)
        } catch (error) {
          setIsAuthenticated(false)
          setUser(null)
        }
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
        user,
        errors,
        isAuthenticated,
        shoppingCart,
        setShoppingCart,
        setErrors,
        registerUser,
        addUserData,
        loginUser,
        logout,
        addToCart,
        getProductCart,
        getAllCart,
        updateItemQuantity,
        deleteCartItem,
        deleteAllCart,

    }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext
