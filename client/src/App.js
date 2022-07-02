// Base Import
import React from 'react';

// Styling imports
<<<<<<< HEAD
=======
import { ThemeProvider } from '@mui/material';
import { mainTheme } from './mainTheme'
>>>>>>> 6813a68eabf5c5cb86047e153bc3b8c535b9c7d7

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
