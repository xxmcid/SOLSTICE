// Base Import
import React from 'react';

// Pages
import LoginPage from './pages/LoginPage';

//Theme Components


class App extends React.Component {

  // Main render method that is called from /client/index.js
  render() {
    // App-wide theme
    console.log("Mounting initial login page.. If this isn't first in the log then there is a serious problem...");
    
    return (
      <div className="App">
          <LoginPage />
      </div>
    );
  }
}

export default App;
