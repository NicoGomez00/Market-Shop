import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Grid, Link, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Carrousel from '../components/Carrousel';
import { useProducts } from '../context/ProductContext';


const HomePage = () => {
  const theme = useTheme()

  const { products ,getProducts} = useProducts()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await getProducts();
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Box sx={{
        height: {xs: '700px' , sm:'520px'},
        width: '100%',
        backgroundImage: 'url(../images/pixel_banner.jpg)', // Usa url() para la imagen de fondo
        backgroundSize: 'cover', // Ajusta la imagen para cubrir todo el área del Box
        backgroundPosition: 'center',
      }}>
        <Grid container>

          <Grid item sm={6} xs={12}>
          <Box sx={{
            position: 'relative',
            top: { xs: '10%', sm: '20%' },  // Cambia la posición superior según el tamaño de la pantalla
            left: { xs: '0%', sm: '5%' },   // Cambia la posición izquierda según el tamaño de la pantalla
            width: { xs: "100%", sm: "90%" }, // Cambia el ancho según el tamaño de la pantalla
            textAlign: {xs: 'center' , sm:'initial'},
            
          }}>
            <Typography color='secondary' component="h1" variant='h1' sx={{
              fontSize: {xs: '5em' , sm:'5em'}
            }}>
            Choose the best products for your home
            </Typography>
          </Box>
      <Box sx={{
        position: 'relative',
        top: {xs: '15%' , sm: '22%'},
        left: {xs: '0' , sm: '5%'}
      }}>
        <Box sx={{ 
          display: {xs: 'inline-block' , sm: 'flex'},
          margin: 'auto',
          justifyContent: 'flex-start',
          width: '100%',
          }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.background.paper,
              textDecoration: 'none',
              width: '200px',
              margin: {xs: 'auto', sm:'0'},
              border: 1
            }}
            component={Link}
            href="/products"
          >
            Buy now
            <AddShoppingCartIcon sx={{ marginLeft: 1 }} />
          </Button>
        </Box>
        </Box>
      </Grid>
      
          <Grid item xs={6}>
            <Box sx={{
              position: 'relative',
              top: "20%",
              display: {xs: 'none' , sm:'block'}
            }}>
            <img src="../../images/home-banner.png" alt="" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box marginTop={6} marginBottom={2} sx={{
        textAlign: 'center'
      }}>

        <Box sx={{
          margin: 'auto',
          display: 'inline-block',
        }}>
          <img src="../../logo/logo-WObackground.png" alt="" width={'500px'}/>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Carrousel products={products} actions={true} />
        </Box>
      )}


      <Box marginTop={6} marginBottom={2} sx={{
        textAlign: 'center'
      }}>
        <Typography variant='h4' component="h3" color='secondary'>
        Visit us
        </Typography>

        <Grid container spacing={3} direction='row' justifyContent='center' alignItems='center'>
          <Grid item xs={4}>
          <img src="../images/Produce.jpg" alt="" />
          </Grid>

          <Grid item xs={4}>

            <Typography variant='h5' component="h3" color='secondary'>
             Contact us
            </Typography>

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
              id="outlined-name"
              label="Name"
              multiline
              fullWidth
            />

            <TextField
              id="outlined-email"
              label="Email"
              multiline
              fullWidth
            />

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                fullWidth
                sx={{
                  display: "inline-block",
                }}
              />
              <Button variant='contained' fullWidth sx={{
                m: 1
              }}>
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default HomePage
