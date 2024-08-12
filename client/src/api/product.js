import axios from "./axios.js";

export const getAllProductsRequest = async () => {
   const res = await axios.get('/api/products')
   return res
}

export const getProductRequest = async (id) => {
   const res = await axios.get(`/api/products/${id}`)
   return res
}