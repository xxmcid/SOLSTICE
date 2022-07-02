// Base Import
import React from 'react';

// Styling imports
import { ThemeProvider } from '@mui/material';
import { mainTheme } from './mainTheme'

// Pages
import LoginPage from './pages/LoginPage';

//Theme Components


class App extends React.Component {

  // Main render method that is called from /client/index.js
  render() {

  // App-wide theme

    
    console.log("Pulling render from App.js");
    return (
      <ThemeProvider theme={mainTheme}>
        <div className="App">
            <LoginPage />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
