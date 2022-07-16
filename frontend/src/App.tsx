import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./views/Login/index";
import Main from "./views/Main/index"
import Register from './views/Register/index';
import { UserProvider } from './UserContext';
import Error404 from './views/404/index';

const theme = {
  colors: {
    first: '#D67097',
    second: 'rgb(242, 227, 212)',
    third: 'rgb(101, 180, 199)'
  },
  fonts: ["sans-serif"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter basename={process.env.REACT_APP_CONTEXT}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Main/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/404' element={<Error404/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
