import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from "./views/Login/index";
import Main from "./views/Main/index"

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
      <BrowserRouter basename={process.env.REACT_APP_CONTEXT}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/main' element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
