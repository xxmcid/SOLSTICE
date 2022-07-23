// Base Import
import { React, Component } from 'react';

// MUI Components
import { Button } from '@mui/material';

class SolarSystemBtn extends Component {
    constructor(props) {
      super(props);
    }

    handleClick() {
      this.props.switchSolarSystem();
    }

    render() {
        return(
            <Button
              variant={'contained'} 
              onClick={this.handleClick.bind(this)}
              sx={{
                height: '28px', 
                boxShadow: 'none', 
                backgroundColor: "background.default"
              }}
            >
              {this.props.systemName}
            </Button>
        );
    }
}

export default SolarSystemBtn;