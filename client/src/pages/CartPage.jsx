import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx';
import TableShop from "../components/TableShop.jsx";
import { Box, Button, Grid, Typography } from '@mui/material';


const CartPage = () => {

    const {user , shoppingCart } = useAuth()
    const [ loading , setLoading ] = useState(false)

    
    useEffect(() => {
      console.log(shoppingCart)
      setTimeout(() => {
        setLoading(true)
      }, 500);

    }, [loading])

 
  return (
    <>
      <Typography component={'h2'} variant='h2' sx={{
        textAlign: 'center'
      }}>Cart
      </Typography>
      
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6} sx={{
          margin: 'auto'
        }}>
          <TableShop/>
        </Grid>

        <Grid item xs={12} sm={4} sx={{
          textAlign: 'center',
          margin: '0 auto'
        }}>
          {loading ? (
            <>
              <Box sx={{
                  textAlign: 'initial',
                  border: '1px solid grey',
                  borderRadius: 2,
                  padding: '2em',
                  margin: 0
                }}>
              <Typography component='h3' variant='h4'>
                {user.username}
              </Typography>
              <Typography component='h4' variant='h5'>
                {user.email}
              </Typography>

                <Box component='ul' >
                  <li><strong>Name: </strong>{user.personalInfo.firstName} {user.personalInfo.secondName}</li>
                  <li><strong>Phone: </strong> {user.personalInfo.phone}</li>
                  <li><strong>Address: </strong> {user.personalInfo.address} <strong>CP:</strong> {user.personalInfo.cp}</li>
                </Box>
              </Box>

              <Button color='secondary' variant="contained" sx={{
                width: '100%',
                margin: '20px 0'
              }}>Buy</Button>

            </>
          ) 
          : (null) }
        </Grid>

      </Grid>
    </>
  )
}

export default CartPage
