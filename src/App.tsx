import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './Signin';
import SignUp from './Signup';
import UserReviews from './UserReviews';



function App() {
  return (

    <div>
      <SignIn/>
      <SignUp/>
      <UserReviews/>
    </div>
  );
}

export default App;
