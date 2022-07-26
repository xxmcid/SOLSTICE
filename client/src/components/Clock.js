// Base Import
import { Grid, Typography } from '@mui/material';
import { React, Component } from 'react';

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

      let month = this.state.date.getUTCMonth();
      let day = this.state.date.getUTCDate() - 1;
      let year = this.state.date.getUTCFullYear();

      return (
        <Grid contianer rowSpacing={0} marginTop={'5px'}>
          <Grid item>
            <Typography textAlign={'center'} fontSize={'large'} color={'#efefef'}>
              {monthNames[month]} {day}, {year}
            </Typography>
          </Grid>
          <Grid item>
            <Typography textAlign={'center'} variant={'h5'} color={'text.primary'} fontWeight={500}>
              {this.state.date.toLocaleTimeString()}
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }

  export default Clock;