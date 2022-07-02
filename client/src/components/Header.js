// Base Import
import { React, Component } from 'react';

// MUI Components
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import Clock from '../components/Clock';
import Info from './Info';


class Header extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            infopagevisible: false
        };

        this.toggleInfoPage = this.toggleInfoPage.bind(this);
    }

    toggleInfoPage() {
        console.log("Info page visible: " + !this.state.infopagevisible);

        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }


    render() {
        return(
            <div id='header'>
            <div id='title'>SOLSTICE</div>
            <Clock />
            <Button id='infobutton'
                disableTouchRipple
                variant='string'
                onClick={ this.toggleInfoPage }
                sx={{ width: 'fit-content', borderRadius: 2 }}>
                <InfoIcon />
            </Button>
            { this.state.infopagevisible 
                ? <Info onClose={ this.toggleInfoPage }/> 
                : null }
        </div>
        );
    }
}

export default Header;