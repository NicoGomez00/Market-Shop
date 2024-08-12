import { getAllProductsRequest , getProductRequest } from "../api/product.js";
import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [checkedItems , setCheckedItems] = useState(null)
  const [valueRange, setValueRange] = useState([0, 70]);


  const getProducts = useCallback(async () => {
    try {
      const res = await getAllProductsRequest();
      setProducts(res.data);  // Ajustar según la estructura de la respuesta
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        getProduct,
        checkedItems,
        setCheckedItems,
        valueRange,
        setValueRange
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductContext;
