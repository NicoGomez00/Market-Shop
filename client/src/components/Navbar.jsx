import { Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] =useState(null);
  const { isAuthenticated , shoppingCart , getAllCart , logout , user } = useAuth()
  const theme = useTheme()

  useEffect(() => {
    console.log("User state:", user);
    if (!isAuthenticated) {
        handleCloseNavMenu(); // Cierra el menú si el usuario no está autenticado.
        setAnchorElUser(null); // Asegúrate de cerrar cualquier otro menú de usuario.
    } else {
        getAllCart();
    }
  }, [isAuthenticated, user]);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logoutFunc = () => {
    handleCloseNavMenu()
    logout()
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{
        position: 'relative',
        zIndex:9999,
    }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
              <img src="../../logo/logo-WObackground.png" alt="" width={'120px'}/>

            </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem component={Link} to={`/products`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Products</Typography>
                </MenuItem>
                <MenuItem component={Link} to={`/useraccount`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">My Account</Typography>
                </MenuItem>
                <MenuItem component={Link} to={`/faq`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">FAQ</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="../../logo/logo-WObackground.png" alt="" width={'120px'}/>

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Link to={`/products`} >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Products
              </Button>
            </Link>
            <Link to={`/userAccount`} >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                My Account
              </Button>
            </Link>
            <Link to={`/faq`} >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                FAQ
              </Button>
            </Link>
          </Box>

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 , display:'flex' , alignItems: 'center' }}>
            <Link to='/cart'>
              <Box marginRight={4}>
                <ShoppingCartIcon sx={{
                  position: 'absolute'
                }}></ShoppingCartIcon>
                <Box width={25} height={25} sx={{
                  background:`${theme.palette.error.dark}`,
                  borderRadius: '10px',
                  position: 'relative',
                  top: 10,
                  left: 14,
                  textAlign: 'center'
                }}>
                  <Typography>{shoppingCart.length}</Typography>
                </Box>
              </Box>
            </Link>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Box sx={{
                  color: 'white',
                  width: '50px' ,
                  height:'50px' ,
                  background:`${theme.palette.secondary.main}`,
                  borderRadius: '1000px',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center'
                  }}>
                    {user.username.charAt(0)} 
                </Box>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem component={Link} to={`/useraccount`} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">My Account</Typography>
                </MenuItem>
                <MenuItem component={Link} to={'/'} onClick={logoutFunc}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box display={'flex'}>
            <Link to='/login'>
            <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Login
                </Button>
            </Link>
            <Link to='/register'>
            <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Register
                </Button>
            </Link>
            </Box>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;