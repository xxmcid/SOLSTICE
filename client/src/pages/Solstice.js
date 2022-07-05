// Base Import
import { React, Component } from 'react';

// Styling Imports
import '../styles/solstice.css';

// MUI Components
import { Button } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

//P5 Core
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from '../components/core/sketch';

// Custom Components
import Header from '../components/Header';
import SidePanel from '../components/core/SidePanel';
import Info from '../components/Info';



class Solstice extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            
            // Page and Panel visibility states
            infopagevisible: false,
            sidepanelexpanded: false,

            // User info
            uid: 0,
            username: '',
        };
    }

    setvisibility()
    {
        console.log("Info page visible: " + !this.state.infopagevisible);
        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    expandsidepanel()
    {
        console.log((this.state.sidepanelexpanded ? "Closing" : "Expanding") + " Side Panel!");
        this.setState({
            sidepanelexpanded: !this.state.sidepanelexpanded
        })
    }

    render()
    {
        return(
            <div id='masterContainer'>
                <Header onClick={ this.setvisibility.bind(this) }/>
                { this.state.infopagevisible ? <Info onClick={this.setvisibility.bind(this)} /> : null }
                <SidePanel open={this.state.sidepanelexpanded}/>
                <Button
                    onClick={this.expandsidepanel.bind(this)}
                    variant='contained'
                    id='addplanetbutton'
                    startIcon={<PublicIcon />}
                    color={this.state.sidepanelexpanded ? 'error' : 'success'}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                        Astral Body
                </Button>
                {/* Main Solar System Component Wrapper -> Check Solstice.js */}
                <div id='canvaswrapper'>
                    <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
                </div>
            </div>
        );
    }
}

export default Solstice;