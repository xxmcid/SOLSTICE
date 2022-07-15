// Base Import
import { React, Component } from 'react';
import axios from "axios";

// Routing Imports
import { Link } from 'react-router-dom';

// Styling Imports
import '../styles/solstice.css';

// MUI Components
import { Button, Grid, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

//P5 Core
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from '../components/core/sketch';

// Custom Components
import TitleHeader from '../components/TitleHeader';
import Header from '../components/Header';
import Positioner from '../components/Positioner';
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

            // Solstice States
            // Checks to see if the user is adding a new planet, or editing a current one
            iseditingplanet: false,
            planets: [],

            clientSession: localStorage.getItem('clientSession')
        };
    }

    // This function should fetch all the planet data from the database.
    componentDidMount()
    {
        console.log("Solstice mounted, fetching users planets from database");
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

    seteditingplanet()
    {
        this.setState({
            iseditingplanet: !this.state.iseditingplanet
        })
        console.log("A planet was clicked, setting iseditingplanet to " + this.state.iseditingplanet);
    }  

    render() {

        console.log("Rendering Solstice");

        // Validate clientSession token AND CLEAR if invalid / expired...
        if (typeof this.state.clientSession == 'string' && this.state.clientSession.length > 0) {
            axios.get(`${window.location.protocol}//${window.location.host}/api/validate-session/${this.state.clientSession}`)
                .then(response => {
                    // Logout
                    if (response.status != 200) {
                        localStorage.clear();
                        window.location.href = '';
                    }
                })
                .catch(err => {
                    // Logout
                    localStorage.clear();
                    window.location.href = '';
                });

            return (
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
                            iseditingplanet={this.seteditingplanet.bind(this)}
                            expandsidepanel={this.expandsidepanel.bind(this)}
                        ></ReactP5Wrapper>
                    </div>
                    {/* Main Solar System Component Wrapper -> Check Solstice.js */}
                    <Link to='/logout'>
                        <Button 
                            id='logoutbutton'
                            variant='contained' 
                            color={'error'} 
                            sx={{  textTransform: 'none', fontWeight: 'bold', position: 'absolute', bottom: '16px', right: '16px' }}>
                                Log Out
                        </Button>
                    </Link>
                </ThemeProvider>
            );
        }

        return (
            <ThemeProvider theme={getTheme()}>
                <TitleHeader/>
                <Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2}>
                    <Grid container id='forgotPassContainer' columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
                        <Grid item xs={4} justifyContent={'center'}>
                            <Typography align='center' fontWeight={'bold'} variant="h4">Loading...</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography align='center'>Please wait while we load your solar systems...</Typography>
                        </Grid>
                    </Grid>
                </Positioner>
            </ThemeProvider>
        );
    }
}

export default Solstice;