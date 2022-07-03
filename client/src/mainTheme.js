import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  
  palette: {
    mode: 'dark',

    // Shades of grey
    primary: {
      main: '#323031',
      light: '#7F7979',
      dark: '#3D3B3C',
      contrast: '#5F5B6B'
    },

    lightmode: {
      main: '#FEFFFE',     // Pearl White
      light: '#E5FCF5',    // Light Cyan
      contrast: '#EADEDA', // Timberwolf
      black: '#000000'     // Black (For Text)
    }
  }
});