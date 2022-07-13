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
import { ThemeProvider } from '@emotion/react';
import { getTheme } from '../styles/mainTheme';



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

            // Planets Array
            planets: [],
        };
    }

    // This function should fetch all the planet data from the database.
    componentDidMount()
    {
        console.log("Solstice dashboard mounted, fetching users planets from database");
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
            <ThemeProvider theme={getTheme()} id='masterContainer'>
                <Header onClick={ this.setvisibility.bind(this) }/>
                { this.state.infopagevisible ? <Info onClick={this.setvisibility.bind(this)} /> : null }
                <SidePanel open={this.state.sidepanelexpanded} close={this.expandsidepanel.bind(this)}/>
                { this.state.sidepanelexpanded ? null : 
                <Button
                    onClick={this.expandsidepanel.bind(this)}
                    variant='contained'
                    id='addplanetbutton'
                    startIcon={<PublicIcon />}
                    color={'success'}
                    sx={{ textTransform: 'none', fontWeight: 'bold', position: 'absolute', bottom: '16px', left: '16px' }}>
                        Add Planet
                </Button>
                }
                {/* Main Solar System Component Wrapper -> Check Solstice.js */}
                <div id="canvaswrapper">
                    <ReactP5Wrapper 
                        sketch={sketch} 
                        planets={this.state.planets}
                    ></ReactP5Wrapper>
                </div>
            </ThemeProvider>
        );
    }
}

export default Solstice;