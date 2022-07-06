import { createTheme } from "@mui/material";

// theme('light') will provide light theme
export const getTheme = mode => (mode === "light") 

  // Create light theme
  ? createTheme({
    primary: {
      main: '#FEFFFE',     // Pearl White
      light: '#E5FCF5',    // Light Cyan
      contrast: '#EADEDA', // Timberwolf
      black: '#000000'     // Black (For Text)
    }
  })

  // Create dark theme
  : createTheme({
    palette: {
      mode: 'dark',
      
      primary: {
        main: '#5F5B6B',
        light: '#7F7979', // '#7F7979',
        dark: '#3D3B3C', // '#3D3B3C',
        contrastText: '#FFFFFF',
      },


      background: {
        paper: '#323031',
        default: '#323031',
      }
    }
  })
