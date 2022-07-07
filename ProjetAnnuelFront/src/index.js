import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { pink, purple } from '@mui/material/colors';

const themeLight = createTheme({
    palette: {
        background: {
            default: "#F2F2F2"
        },
        primary: purple,
        secondary: pink
    }
});

ReactDOM.render(

    <React.StrictMode>
        <ThemeProvider theme={themeLight}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);