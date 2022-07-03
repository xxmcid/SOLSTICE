// Base Import
import React from 'react';

// Pages
import LoginPage from './pages/LoginPage';

//Theme Components


class App extends React.Component {

  // Main render method that is called from /client/index.js
  render() {

  // App-wide theme

    
    console.log("Pulling render from App.js");
    return (
      <div className="App">
          <LoginPage />
      </div>
    );
  }
}

export default App;
