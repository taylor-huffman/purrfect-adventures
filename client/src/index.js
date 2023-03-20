import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from '../src/context/user';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
      dark: '#000000',
      light: '#f8f8f8',
      contrastText: '#f8f8f8',
    },
    secondary: {
      main: '#ebebeb',
      contrastText: '#231f20',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#949494',
      hint: '#231f20',
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: 'Poppins',
    },
    subtitle2: {
      fontFamily: 'Poppins',
    },
    body1: {
      fontFamily: 'Poppins',
    },
    body2: {
      fontFamily: 'Poppins',
    },
    button: {
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
    caption: {
      fontFamily: 'Poppins',
    },
    overline: {
      fontFamily: 'Poppins',
    },
    fontFamily: 'Poppins',
    fontWeightBold: 500,
    fontSize: 16,
  },
  overrides: {
    MuiAppBar: {
      root: {
        backgroundColor: '#fdfdfd!important',
        color: '#231f20!important',
        boxShadow: 'unset',
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: '#EBEBEB',
        border: '0',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#fdfdfd',
      },
    },
    MuiContainer: {
      root: {
        maxWidth: '800px',
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <App />
          </UserProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
