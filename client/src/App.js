// Base Import
import React from 'react';

// Styling imports

// Pages
import LoginPage from './pages/LoginPage';

//Theme Components


class App extends React.Component {

  // Main render method that is called from /client/index.js
  render()
  {
    console.log("Pulling render from App.js");
    return (
        <div className="App">
          <LoginPage />
        </div>
    );
  }
}

export default App;
