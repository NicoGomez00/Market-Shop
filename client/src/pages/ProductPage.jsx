import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { useAuth } from '../context/AuthContext'


const ProductPage = () => {

    const theme = useTheme()
    
    const { getProduct } = useProducts()
    const { addToCart , isAuthenticated } = useAuth()
    const [product , setProduct] = useState()
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        async function loadProduct(){
            if(params.id){
                const res = await getProduct(params.id)
                setProduct(res)
                setLoading(true)
                console.log(product)
            }
        }
        loadProduct()
    }, [params.id])

    const addProduct = () => {
        const productToCart = {
            productId : product._id,
            productName: product.title,
            quantity : 1
          }
          console.log(productToCart)
          if(!isAuthenticated){
            navigate('/login')
          } else {
            addToCart(productToCart)
          }
    }

  return (
    <div>
        {loading ? (
            <>
                <Box>
                    <Grid container item sm={8} xs={12} sx={{
                        margin: 'auto'
                    }}>
                        <Grid item>
                            <Typography color='secondary'>category &gt; {product.category}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sm={8} xs={12} sx={{
                        margin: '1em auto',
                        borderTop: ` 1px ${theme.palette.background.custom} solid`,
                        borderBottom:  ` 1px ${theme.palette.background.custom} solid`,
                        padding: 2,
                    }}>
                        <Grid item sm={7}>
                            <Box sm={12} sx={{
                            }}>
                                <img src={product.img} alt={product.title} style={{ width: '600px', height: 'auto' }} />
                            </Box>
                        </Grid>
                        <Grid item sm={5}  >
                            <Typography variant='h2' component='h2' fontSize='6em' sx={{
                        }} >
                                {product.title}
                            </Typography>
                            
                            <Box component='ul' sx={{
                                margin: '3em 0',
                                fontStyle: 'italic'
                            }}>
                                <li><strong>Category:</strong> {product.category} </li>
                                <li><strong>Description:</strong> {product.description} </li>
                                <li><strong>Stock:</strong> {product.stock} </li>
                            </Box>

                            <Box>
                                <Typography variant='h1' component='h3' marginBottom={6} fontSize='8em' sx={{
                                    color: '#727272'
                                }}>
                                     ${product.price} 
                                </Typography>
                            </Box>
                               
                            <Box>
                                <Button onClick={addProduct} variant="contained" sx={{
                                    width: '60%',
                                    height: '50px',
                                    margin: 'auto'
                                }} >Add To Cart</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </>
        ) : (null) }
    </div>
  )
}

export default ProductPage