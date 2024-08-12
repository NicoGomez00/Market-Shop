import './App.css'
import { ProductProvider, useProducts } from "./context/ProductContext";
import { ThemeProvider } from '@mui/material'
import theme from './theme.js'
import ProductsPage from './pages/ProductsPage.jsx';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import UserAccount from './pages/UserAccount.jsx';
import Faq from './pages/Faq.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import Footer from './components/Footer.jsx';


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ProductProvider>
            <Router>

              <header>
                <Navbar/>
              </header>

              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/products' element={<ProductsPage/>}/>
                <Route path='/product/:id' element={<ProductPage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/faq' element={<Faq/>}/>

                <Route element={<ProtectedRoute/>}>
                  <Route path='/userAccount' element={<UserAccount/>}/>
                </Route>

                <Route path='*' element={<PageNotFound/>}/>
              </Routes>
              
              <footer>
                <Footer/>
              </footer>

            </Router>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
