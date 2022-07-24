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

//Memo with P5 Core nested.
import Memo from '../components/core/Memo';

// Custom Components
import TitleHeader from '../components/TitleHeader';
import Positioner from '../components/Positioner';
import SidePanel from '../components/core/SidePanel';
import { ThemeProvider } from '@emotion/react';
import { getTheme } from '../styles/mainTheme';
import AppHeader from '../components/core/AppHeader';

class Solstice extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {            
            // Page and Panel visibility states
            infopagevisible: false,
            sidepanelexpanded: false,
            iseditingplanet: false,

            // cache all solar systems
            solarSystems: [],
            solarSystemButtonObjs: [],

            // Solstice States
            solarSystemId: '',
            planets: [],

            // Selection States
            selectedPlanetId: '',
            selectedPlanetName: '',
            selectedPlanetMass: 0,
            selectedPlanetGravity: 0,
            selectedPlanetDistance: 0,
            selectedPlanetType: '',
            selectedPlanetColor: '',
            selectedPlanetMoonId: '',
            selectedPlanetParent: null,

            // Spacing Parameters (Based on screensize and sun size)
            // Don't want a planet going off screen.
            minalloweddistance: 0,
            maxalloweddistance: 0,
            maxallowedplanetsize: 0,

            clientSession: localStorage.getItem('clientSession')
        };

        // Fetch the user's solar systems.
        axios.get(`${window.location.protocol}//${window.location.host}/api/fetch-solar-systems/${this.state.clientSession}`)
        .then(response => {
            let solarSystems = response.data.solarSystems;
            let planetsArray = solarSystems[0].planets;
            console.log("Retrieved solar system!");
            console.log(solarSystems);

            // Set our planets JSON to our state
            // P5 should see this change in sketch.js and update accordingly.
            this.setState({
                solarSystems: solarSystems,
                planets: planetsArray,
                solarSystemId: solarSystems[0]?._id
            });

            this.generateSolarSystemButtonObjs();
        })
        .catch(err => {
            console.log(err);
            console.log('COULD NOT FIND ANY SOLAR SYSTEMS FOR THE USER!!!');
        });
    }

    updateSelectedSolarSystem(id) {
        this.state.solarSystems.forEach(solarSystem => {
            if (solarSystem._id === id) {
                const planetsArray = solarSystem ? solarSystem.planets : null;
        
                if (solarSystem && planetsArray) {
                    this.setState({
                        planets: planetsArray,
                        solarSystemId: solarSystem._id,
                    });
                }
            }
        });
    }

    setsizingparams(newmindist, newmaxdist, newplanetsize)
    {
        console.log("Setting sizing params based on P5's calculations");
        console.log(newmindist + " " + newmaxdist + " " + newplanetsize);
        this.setState({
            minalloweddistance: newmindist,
            maxalloweddistance: newmaxdist,
            maxallowedplanetsize: newplanetsize,
        })

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
        });
    }

    // When a certain planet is selected, P5 will call this function
    // with all the information of the planet sent as params.
    setselections(spn, spm, spg, spd, spt, spc, moonId, id, parent)
    {
        this.setState({
            iseditingplanet: true,
            selectedPlanetName: spn,
            selectedPlanetMass: spm,
            selectedPlanetGravity: spg,
            selectedPlanetDistance: spd,
            selectedPlanetType: spt,
            selectedPlanetColor: spc,
            selectedPlanetMoonId: moonId,
            selectedPlanetId: id,
            selectedPlanetParent: parent
        }, () => console.log("Selected body type: " + this.state.selectedPlanetType));

        // Only open sidepanel if it is not visible
        if (this.state.sidepanelexpanded == false)
            this.expandsidepanel();
    }

    // If a user edits a planet parameter in the side panel
    editselection(state, value)
    {
        this.setState({
            [state]: value
        })
    }

    // Unselects a planet
    clearselection()
    {
        this.setState({
            iseditingplanet: false,
            selectedPlanetName: '',
            selectedPlanetMass: 0,
            selectedPlanetGravity: 0,
            selectedPlanetDistance: 0,
            selectedPlanetType: '',
            selectedPlanetColor: '',
            selectedPlanetMoonId: '',
            selectedPlanetId: '',
            selectedPlanetParent: null
        })
    }

    // Probably the most important handler in this entire app...
    updatePlanets(newPlanets)
    {
        console.log("Solstice recieved updated planets from API. Updating now.")
        // Tadaaaaa!
        this.setState({
            planets: newPlanets
        })
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
                    <AppHeader 
                        solarSystems={this.state.solarSystems} 
                        switchSolarSystem={id => this.updateSelectedSolarSystem(id)}
                    />

                    <SidePanel 
                        clientSession={this.state.clientSession}
                        updatePlanets={this.updatePlanets.bind(this)}
                        iseditingplanet={this.state.iseditingplanet}
                        editselection={this.editselection.bind(this)}
                        clearselection={this.clearselection.bind(this)}
                        open={this.state.sidepanelexpanded} 
                        close={this.expandsidepanel.bind(this)}
                        minalloweddistance={this.state.minalloweddistance}
                        maxalloweddistance={this.state.maxalloweddistance}
                        maxallowedplanetsize={this.state.maxallowedplanetsize}
                        ssid={this.state.solarSystemId}
                        spi={this.state.selectedPlanetId}
                        spn={this.state.selectedPlanetName}
                        spm={this.state.selectedPlanetMass}
                        spg={this.state.selectedPlanetGravity}
                        spd={this.state.selectedPlanetDistance}
                        spt={this.state.selectedPlanetType}
                        spc={this.state.selectedPlanetColor}
                        spp={this.state.selectedPlanetParent}
                        moonId={this.state.selectedPlanetMoonId}
                    /> 
                    
                    { this.state.sidepanelexpanded ? null : 
                        <Button
                            onClick={this.expandsidepanel.bind(this)}
                            variant='contained'
                            id='addplanetbutton'
                            startIcon={<PublicIcon />}
                            color={'success'}
                            sx={{ textTransform: 'none', fontWeight: 'bold', position: 'absolute', bottom: '16px', left: '16px', zIndex: 0 }}>
                                Add Planet
                        </Button>
                    }


                    {/* Wrapped P5 inside of React.memo to prevent unnecessary rerenders */}
                    <Memo 
                        setsizingparams={this.setsizingparams.bind(this)}
                        planets={this.state.planets}
                        setselections={this.setselections.bind(this)} 
                    />

                    <Link to='/logout'>
                        <Button 
                            id='logoutbutton'
                            variant='contained' 
                            color={'error'} 
                            sx={{  
                                textTransform: 'none', 
                                fontWeight: 'bold', 
                                position: 'absolute', 
                                bottom: '16px', 
                                right: '16px' 
                            }}
                        >
                            Log Out
                        </Button>
                    </Link>
                </ThemeProvider>
            );
        } else if (!this.state.clientSession) {
            // Redirect to Sign In
            window.location.href = '';
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