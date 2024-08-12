import axios from './axios'

export const getAllCartRequest = async () => {
    try {
        const res = await axios.get('/api/cart')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getProductsInfoRequest = async (productIds) => {
        try {
            const res = await axios.post('/api/cart', {
                productIds
            });
            return res;
        } catch (error) {
            console.error(error);
            return error.response;
        }
    };


export const addToCartRequest = async (product) => {
    try {
        const res = await axios.post('/api/products' , product)
        return res  
    } catch (error) {
        console.log('error')
    }
}

export const updateCartItemQuantity = async (productId, increment) => {
    try {
        const res = await axios.patch(`/api/cart/${productId}`, { increment });
        return res;
    } catch (error) {
        console.error('Error updating cart item quantity:', error.response ? error.response.data : error.message);
    }
};
  
export const deleteCartRequest = async (id) => {
    try {
      const res = await axios.delete(`/api/cart/${id}`);
      return res;
    } catch (error) {
      console.error('Error during DELETE request:', error.response ? error.response.data : error.message);
      throw error; // Re-lanza el error para que se maneje en la función que llama a deleteCartRequest
    }
  };


export const deleteAllCartRequest = async () => {
    try {
        await axios.delete(`api/cart`)
    } catch (error) {
        console.log(error)
    }
}