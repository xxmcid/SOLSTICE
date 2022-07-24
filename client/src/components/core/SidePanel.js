// Base Import
import { React, Component, Fragment } from 'react';
import axios from "axios";

// Styling Imports
import { getTheme } from '../../styles/mainTheme';
import '../../styles/solstice.css';

//P5 Core
import { ReactP5Wrapper } from "react-p5-wrapper";
import miniSketch from './miniSketch';

// MUI Components
import { Drawer, Paper, Typography, ThemeProvider, Grid, TextField, Button, Slider } from '@mui/material';

// Misc Components
import { HexColorPicker } from "react-colorful";

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCircleXmark} from '@fortawesome/free-solid-svg-icons';



class SidePanel extends Component {
    constructor(props) {
        super(props);
        // Binds event handlers passed in from parent to event handlers that are local to SidePanel.js
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {};
    }

    // getDerivedStateFromProps exists for only one purpose. 
    // It enables a component to update its internal state as 
    // the result of changes in props.
    static getDerivedStateFromProps(nextProps) {    
        return {
            solarSystemId: nextProps.ssid,
            selectedPlanetId: nextProps.spi,
            selectedPlanetName: nextProps.spn,
            selectedPlanetMass: nextProps.spm,
            selectedPlanetGravity: nextProps.spg,
            selectedPlanetDistance: nextProps.spd,
            selectedPlanetType: nextProps.spt,
            selectedPlanetColor: nextProps.spc,
            selectedPlanetMoons: nextProps.moons
        }
      }

    // Handles the updated parameters for planet.
    // Also sends update to database.
    async handleSave() {
        // If we're editing an existing planet
        if (this.props.iseditingplanet == true) {
            // Update the current planet.
            console.log('handleSave(): Updating the current planet in the databaase.');

            // Compile the request data.
            const requestData = {
                "token": localStorage.getItem('clientSession'),
                "solarSystemId": this.props.ssid,
                "planet": {
                    "_id": this.props.spi,
                    "name": this.props.spn,
                    "mass": Number(this.props.spm),
                    "gravitationalPull": Number(this.props.spg),
                    "distance": Number(this.props.spd),
                    "type": this.props.spt || 'planet', // 'planet' as default type to prevent errors
                    "color": this.props.spc
                }
            }

            try { // Send the updated planet to the server.
                const response = await axios.post(
                    `${window.location.protocol}//${window.location.host}/api/update-planet`,
                    requestData
                );
                
                // Grab updated planets array from response.
                const newPlanets = response.data.planets;

                //Update Sketch with new data!
                this.props.updatePlanets(newPlanets);

            } catch (err) { console.log(err?.response?.data); }
        } else {
           // Add a new planet.
           console.log('handleSave(): Adding a new to the databaase.');

           // Compile the request data.
           const requestData = {
                "token": localStorage.getItem('clientSession'),
                "solarSystemId": this.props.ssid,
                "planet": {
                    "name": this.props.spn,
                    "mass": Number(this.props.spm),
                    "gravitationalPull": Number(this.props.spg),
                    "distance": Number(this.props.spd),
                    "type": this.props.spt || 'planet', // 'planet' as default type to prevent errors
                    "color": this.props.spc
                }
            }

            try { // Send the new planet to the server.
                const response = await axios.post(
                    `${window.location.protocol}//${window.location.host}/api/add-planet`,
                    requestData
                );
                
            // Grab updated planets array from response.
            const newPlanets = response.data.planets;

            //Update Sketch with new data!
            this.props.updatePlanets(newPlanets);

            } catch (err) { console.log(err?.response?.data); }
        }
        
        // Clear our selected planet from the state.
        this.props.clearselection();

        // Close the sidepanel.
        this.props.close();
    }

    // This should only close the side panel.
    handleCancel() {
        // Clears our selected planet from the state.
        this.props.clearselection();
        // Closes the sidepanel
        this.props.close();
    }

    async handleDelete() {

        const requestData = {
            "token": localStorage.getItem('clientSession'),
            "solarSystemId": this.props.ssid,
            "planetId": this.props.spi
        }

        try { // Send the new planet to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/remove-planet`,
                requestData
            );
            
        // Grab updated planets array from response.
        const newPlanets = response.data.planets;

        //Update Sketch with new data!
        this.props.updatePlanets(newPlanets);

        } catch (err) { console.log(err?.response?.data); }

        // Clears our selected planet from the state.
        this.props.clearselection();
        // Closes the sidepanel
        this.props.close();
    }

    render() {
        return(
            <ThemeProvider theme={getTheme()}>
                <Drawer 
                    open={this.props.open}
                    onClose={this.handleCancel.bind(this)}
                    PaperProps={{ 
                        style: { 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,

                            borderRadius: 12, 
                            backgroundColor: 'black',
                            // opacity: .85,
                            border: 'grey solid .5px',
                            
                            position: 'absolute', 
                            left: '20px', 
                            top: '76px',
                            height: 'calc(100% - 96px)',
                            width: '300px', 
                        }
                    }}
                >
                    {/* Title & Preview */}
                    <Grid container columns={11} rowSpacing={2} justifyContent={'center'} paddingTop={2}>
                        <Grid item xs={11}>
                            <Typography variant='h4' align='center' fontWeight={'bold'}>
                                {this.state.selectedPlanetName ? this.state.selectedPlanetName : 'New Planet'}
                            </Typography>
                        </Grid>

                        <Grid item xs={9}>
                            <Paper id='sideCanvasWrapper' elevation={10} sx={{ backgroundColor: 'grey', height: 200 }}>
                                <ReactP5Wrapper
                                    sketch={miniSketch}
                                    mass={this.state.selectedPlanetMass}
                                    color={this.state.selectedPlanetColor}>
                                </ReactP5Wrapper>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Planet Configuration */}
                    <Grid container 
                        rowSpacing={1} 
                        columns={11}
                        justifyContent='center' 
                        paddingBottom={3} 
                        maxHeight='100%' 
                        sx={{ overflowY: 'scroll' }}
                    >
                        <Grid item xs={9} marginTop={2}>
                            <TextField 
                                type="text"
                                size={'small'}
                                label={'Planet Name'}
                                sx={{ width: '100%', borderRadius: 2}}
                                value={this.state.selectedPlanetName}
                                onChange={(e) => this.props.editselection('selectedPlanetName', e.target.value)}>
                            </TextField>
                        </Grid>

                        <Grid item xs={9} marginTop={2}>
                            <Typography variant='h7' align='left'>Mass (kg)</Typography>
                        </Grid>

                        <Grid item xs={9}>
                            <Slider
                                label={'Mass (Kg)'}
                                min={20}
                                max={this.state.selectedPlanetType == 'sun' ? 300 : this.props.maxallowedplanetsize}
                                value={this.state.selectedPlanetMass}
                                valueLabelDisplay="auto"
                                onChange={(e) => this.props.editselection('selectedPlanetMass', e.target.value)}
                            />
                        </Grid>
                        {this.state.selectedPlanetType == 'sun' ? 
                            <Fragment>
                                <Grid item xs={11}>
                                    <Typography variant='h7' align='left'>Gravitational Pull (m/s^2)</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ marginTop: 1 }}>
                                    <Slider
                                        value={this.state.selectedPlanetGravity}
                                        valueLabelDisplay="auto"
                                        onChange={(e) => this.props.editselection('selectedPlanetGravity', e.target.value)}
                                        />
                                </Grid> 
                            </Fragment>
                        : null}

                        <Grid item xs={9}>
                            <Typography variant='h7' align='left'>Distance (From nearest star)</Typography>
                        </Grid>

                        <Grid item xs={9} sx={{ marginTop: 1 }}>
                            <Slider
                                min={this.props.minalloweddistance}
                                max={this.props.maxalloweddistance}
                                value={this.state.selectedPlanetDistance}
                                valueLabelDisplay="auto"
                                onChange={(e) => this.props.editselection('selectedPlanetDistance', e.target.value)}
                                />
                        </Grid>

                        <Grid item xs={9} marginTop={2}>
                            <Typography variant='h7' align='left'>Color</Typography>
                        </Grid>

                        <Grid item xs={9} marginTop={2}>
                            <HexColorPicker 
                                style={{width: "100%"}} 
                                color={this.state.selectedPlanetColor} 
                                onChange={(e) => this.props.editselection('selectedPlanetColor', e)}
                            />
                        </Grid>

                        <Grid item xs={9} marginTop={2}>
                            <TextField id='planetMoonInput' 
                                type="text" 
                                size={'small'}
                                label={'Moons'}
                                sx={{ width: '100%', borderRadius: 2}}
                            />
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Grid container rowSpacing={2.5} columnGap={0} columns={10} justifyContent={'space-evenly'} paddingBottom={2.5}>
                        <Grid item xs={4}>
                            <Button id='saveChangesButton'
                                onClick={this.handleSave}
                                variant='contained'
                                color={'success'}
                                size={'large'}
                                sx={{ 
                                    textTransform: 'none', 
                                    fontWeight: 'bold', 
                                    width: '100%',
                                    borderRadius: '8px',
                                }}
                            >
                                <FontAwesomeIcon icon={faSave}/> &nbsp; Save
                            </Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Button id='CancelChangesButton'
                                onClick={this.handleCancel}
                                variant='contained'
                                color={'warning'}
                                size={'large'}
                                sx={{ 
                                    textTransform: 'none', 
                                    fontWeight: 'bold', 
                                    width: '100%',
                                    borderRadius: '8px',
                                }}
                            >
                                <FontAwesomeIcon icon={faCircleXmark}/> &nbsp; Cancel
                            </Button>
                        </Grid>

                        {/* Makes Sure that the delete button is only available for existing planets. */}
                        { !(this.state.selectedPlanetType == 'planet' || this.state.selectedPlanetType == 'moon') ? null :
                            <Grid item xs={9}>
                                <Button
                                    onClick={this.handleDelete}
                                    variant='contained'
                                    id='DeletePlanetButton'
                                    color={'error'}
                                    size={'large'}
                                    paddingBottom={2}
                                    sx={{ 
                                        textTransform: 'none', 
                                        fontWeight: 'bold', 
                                        width: '100%',
                                        borderRadius: '8px',

                                    }}
                                >
                                    Delete Forever
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </Drawer>
            </ThemeProvider>
        );
    }
}

export default SidePanel;