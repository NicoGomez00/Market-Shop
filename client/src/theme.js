import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#9072b8',
    },
    terceary: {
      main: '#7E80FC'
    },
    error: {
      main: '#FC7EB7',
    },
    background: {
      default: '#f5f5f5', // Color de fondo por defecto
      paper: '#ffffff',   // Color de fondo para papel o tarjetas
      custom: '#9072b8',  // Color de fondo personalizado
    },
  },
});

export default theme;
