// Base Import
import { React, Component } from 'react';

// Styling Import
import '../styles/loginpage.css';

class Clock extends Component {

    constructor(props) {
      super(props);

      this.state = {
        date: new Date()
      };
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {

      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

      var month = this.state.date.getUTCMonth();
      var day = this.state.date.getUTCDate() - 1;
      var year = this.state.date.getUTCFullYear();

      return (
        <div id='clockcontainer'>
          <div>
            {monthNames[month]} {day}, {year}
          </div>
          <div>
            {this.state.date.toLocaleTimeString()}
          </div>
        </div>
      );
    }
  }

  export default Clock;