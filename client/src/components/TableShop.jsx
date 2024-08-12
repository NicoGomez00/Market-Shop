import { useEffect, useState, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const TableShop = () => {
  const { shoppingCart, getProductCart, deleteAllCart, setShoppingCart , deleteCartItem , updateItemQuantity } = useAuth();
  const [productList, setProductList] = useState([]);

  const fetchProductList = useCallback(async () => {
    try {
      if (shoppingCart.length > 0) {
        // Extraer los productIds del shoppingCart
        const productIds = shoppingCart.map(item => item.productId);
        const res = await getProductCart(productIds);
        
        // Combinar los detalles del producto con la cantidad del shoppingCart
        const combinedProductList = res.map(product => {
          const cartItem = shoppingCart.find(item => item.productId === product._id);
          return {
            ...product,
            quantity: cartItem.quantity,
          };
        });

        console.log(combinedProductList);

        setProductList(combinedProductList);
      } else {
        setProductList([]); 
      }
    } catch (error) {
      console.error('Error fetching product cart:', error);
    }
  }, [shoppingCart, getProductCart]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);


  //Funcion para eliminar toda la lista
  const handleDeleteAll = async () => {
    try {
      await deleteAllCart();
      setShoppingCart([]); 
      setProductList([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleQuantity = async (index, increment) => {
    try {
      const productId = productList[index]._id;
      const updatedCart = await updateItemQuantity(productId, increment);
      
      // Actualiza el carrito en el estado global
      setShoppingCart(updatedCart);

      // Opcional: También puedes actualizar directamente el productList
      const updatedProductList = productList.map((product, idx) =>
        idx === index ? { ...product, quantity: updatedCart.find(item => item.productId === productId).quantity } : product
      );
      setProductList(updatedProductList);
    } catch (error) {
      console.log(error);
    }
  };


  //Funcion para eliminar un item
  const handleClick = async (index) => {
    try {
      const productId = productList[index]._id;
      await deleteCartItem(productId);
      
      // Actualizar shoppingCart eliminando el item
      const updatedCart = shoppingCart.filter(item => item.productId !== productId);
      setShoppingCart(updatedCart);
  
      // Actualizar la lista de productos eliminando el item
      const updatedProductList = productList.filter((_, i) => i !== index);
      setProductList(updatedProductList);
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };


  const invoiceSubtotal = subtotal(productList.map(product => ({
    price: priceRow(product.quantity, product.price)
  })));
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product Name:</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((row, index) => (
              <TableRow key={index}>
                
                <TableCell>
                    <DeleteIcon onClick={() => handleClick(index)} sx={{
                       marginRight: '10px' ,
                        color: '#ff5959'
                        }} />
                    {row.title}
                </TableCell>
                <TableCell align="right" sx={{padding: 0}}>
                    <AddIcon onClick={() => handleQuantity(index , true)} sx={{
                      margin: '0 10px' ,
                      color: 'white',
                      background: '#8ad983',
                      fontSize: '17px',
                      borderRadius: '10px' 
                      }} />
                  {row.quantity}
                    <HorizontalRuleIcon onClick={() => handleQuantity(index , false)} sx={{
                      marginLeft: '10px' ,
                      color: 'white',
                      background: '#ff5959',
                      fontSize: '17px',
                      borderRadius: '10px',
                      }} />
                </TableCell>
                <TableCell align="right">${ccyFormat(row.price)}</TableCell>
                <TableCell align="right">${ccyFormat(priceRow(row.quantity, row.price))}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">${ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Tax</TableCell>
              <TableCell align="right">${ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }} colSpan={2}>Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">${ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleDeleteAll} variant="outlined" sx={{ marginTop: '1em' }}>Delete All</Button>
    </>
  );
};

export default TableShop;
