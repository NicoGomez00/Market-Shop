import { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const ProductCard = ({ product, actions }) => {
  const [open, setOpen] = useState(false);
  const { addToCart , isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const addToCartFunction = () => {
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

  const handleClick = () => {
    setOpen(true);
    addToCartFunction()
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  

    const card = (
        <Card sx={{ maxWidth: 345 , width: 220 , margin: 1}}>
            <Link to={`../product/${product._id}`}>
            <CardMedia
                sx={{ height: 180 , backgroundImage: product.img }}
                image={product.img}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {product.description}
                </Typography>
                <Typography variant="h4" color="text.secondary">
                 ${product.price}
                </Typography>
            </CardContent>
            </Link>
            {actions ? (
              <CardActions>
              <Button onClick={handleClick}>Add</Button>
              <Snackbar open={open} autohideduration={6000} onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  autohideduration={1000}
                  sx={{ width: '100%' }}
                >
                  Product added to your cart
                </Alert>
              </Snackbar>
                  <Button size="small">Learn More</Button>
              </CardActions>
            ) : (null)}
        </Card>
    )

  return (
    <div>
      {card}
    </div>
  )
}

export default ProductCard
