// Base Import
import { React, Component } from 'react';

// MUI Components
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import Clock from '../components/Clock';


class Header extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            infopageHandler: this.props.onClick
        };
    }

    render()
    {
        return(
            <div id='header'>
            <div id='title'>SOLSTICE</div>
            <Clock />
            <Button 
                disableTouchRipple
                id='infobutton' 
                variant='string'
                onClick={this.state.infopageHandler}
                sx=
                {{ 
                    width: 'fit-content',
                    borderRadius: 5
                }}>
                <InfoIcon />
            </Button>
        </div>
        );
    }
}

export default Header;