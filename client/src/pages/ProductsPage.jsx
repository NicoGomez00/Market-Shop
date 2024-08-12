import { useEffect } from 'react'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import { Grid } from '@mui/material'
import Drawler from "../components/Drawler.jsx";


const ProductsPage = () => {
    const { products ,getProducts , checkedItems , valueRange} = useProducts()

    useEffect(() => {
        getProducts()
        checkedItems
    }, [])

    const filterByRange = () =>{
      return products.filter((item) => item.price > valueRange[0] && item.price < valueRange[1])
    }

    const filterProductsCategory = () => {
      return filterByRange().filter((item) => item.category == checkedItems)
    }

    const filteredProducts = checkedItems == null ? filterByRange() : filterProductsCategory();

    return (
      <>
        <Grid container>
          <Grid item xs={12} sm={2}>
            <Drawler />
          </Grid>
          <Grid item container sx={{ display: 'flex' }} xs={12} sm={10}>
            {filteredProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={2} sx={{ margin: 2 , alignItems: 'flex-end' , display: 'flex'}}>
                <ProductCard product={product} actions={true}/>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1} sm={1} sx={{
            position: "fixed",
            zIndex: 9999
        }}>
        </Grid>
        </Grid>
        
      </>
    );
  };
  
export default ProductsPage
