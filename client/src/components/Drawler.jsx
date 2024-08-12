import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import { useProducts } from '../context/ProductContext';
import { Checkbox, Divider, FormControlLabel, FormGroup, Slider, TextField, Typography } from '@mui/material';

const drawerWidth = 250;

function valuetext(value) {
    return `$${value}`;
  }

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const {products , checkedItems , setCheckedItems , valueRange, setValueRange} = useProducts()


  const marks = [
    {
        value: 0,
        label: '$1'
    },
    {
        value: 100,
        label: '$100'
    }
  ]

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleChangeChecked = (event) => {
    const newValue = event.target.name
    setCheckedItems(checkedItems === newValue ? null : newValue)
  }

  const handleChangeRange = (event, newValue) => {
    setValueRange(newValue);
  };

  const categories = () => {
    const uniqueValues = new Set()

    products.map(item => {
        let category = item.category
        uniqueValues.add(category)
    })

    const arrayFromSet = Array.from(uniqueValues)
    arrayFromSet.sort()

    return arrayFromSet

  }

  const countCategories = (element) => {
    let count = 0
    products.forEach(e => {
        if(e.category == element){
            count++
        }
    })
    return count
  }

  const drawer = (
    <Box sx={{ marginTop: 4}}>
      <Toolbar/>
      <List>
      <Typography component={'h3'} variant='h6' sx={{fontWeight:'bold' , marginLeft: 2}}>Range Price</Typography>
      <Box sx={{margin: 'auto' , textAlign:'center' }}>
        <Slider
            getAriaLabel={() => 'Price range'}
            value={valueRange}
            onChange={handleChangeRange}
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
            marks={marks}
            sx={{width:'80%'}}
        />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          margin: 'auto'
        }} >
          <TextField 
          variant='outlined' 
          value={`$ ${valueRange[0]}`}
          id='component-disable'
          size='small'
          />
          -
          <TextField 
          variant='outlined' 
          value={`$ ${valueRange[1]}`}
          size='small'
          />
        </Box>
      </Box>
      </List>

      <List >
        <Typography component={'h3'} variant='h6' sx={{fontWeight:'bold' , marginLeft: 2}} >Categories</Typography>
          <FormGroup>
        {categories().map((text, index) => (
          <Box sx={{marginLeft: 2}} key={index}>
            <FormControlLabel control={
                <Checkbox checked={checkedItems === text} onChange={handleChangeChecked} name={text} />} 
                label={text} />
            <span> {countCategories(text)} </span>
          </Box>
        ))}
        </FormGroup>
      </List>
      
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      </AppBar>


      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15%' },
          }}
        >
          {drawer}
        </Drawer>


        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15%' },
          }}
          open
        >
          {drawer}
        </Drawer>

      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;