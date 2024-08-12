import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const {registerUser , errors , setErrors ,  isAuthenticated} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setErrors([])
    console.log(isAuthenticated)
    if(isAuthenticated){
      navigate('/')
    }
  }, [isAuthenticated])
  
  const handleSubmit = (event) => {
    event.preventDefault()
      const data = new FormData(event.currentTarget);
      const user = {
        username: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
      }
      registerUser(user)

  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

          {errors.length > 0 && 
            errors.map((error, index) => (
              <Box key={index}>
                <Alert sx={{ marginBottom: 1 }} severity="error">
                  {error}
                </Alert>
              </Box>
            ))
          }

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default RegisterPage