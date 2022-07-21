// Base Import
import { React, Component } from 'react';
import axios from "axios";

// Styling Imports
import { getTheme } from '../../styles/mainTheme';
import '../../styles/solstice.css';

//P5 Core
import { ReactP5Wrapper } from "react-p5-wrapper";
import miniSketch from './miniSketch';

// MUI Components
import { Box } from '@mui/system';
import { Drawer, Paper, Typography, ThemeProvider, Grid, TextField, Button, Slider } from '@mui/material';
import { InputAdornment } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Misc Components
import { HexColorPicker } from "react-colorful";


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
                    id='sidepanel' 
                    open={this.props.open}
                    hideBackdrop
                    PaperProps={{ 
                        style: { 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,
                            height: '95vh', 
                            position: 'absolute', 
                            top: '6%', 
                            width: '15.5%', 
                            opacity: '75%', 
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: 5 } }}>
                    <Typography 
                        variant='h4' 
                        align='center' 
                        sx={{ 
                            marginTop: 2,
                            color: 'white',
                            fontWeight: 'bold' }}>
                        {this.state.selectedPlanetName}
                    </Typography>
                    <Grid container rowSpacing={1} justifyContent='center' paddingBottom={2}>
                        <Grid item xs={11}>
                            <Paper id='sideCanvasWrapper' elevation={10} sx={{ backgroundColor: 'grey', width: '100%', height: 200 }}>
                                <ReactP5Wrapper
                                    sketch={miniSketch}
                                    mass={this.state.selectedPlanetMass}
                                    color={this.state.selectedPlanetColor}>
                                </ReactP5Wrapper>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} justifyContent='center' paddingBottom={3} maxHeight='100%' sx={{ overflowY: 'scroll' }}>
                        <Grid item xs={11}>
                            <Typography variant='h7' align='left'>Name</Typography>
                        </Grid>
                        <Grid item xs={11}>
                            <TextField 
                                id='planetNameInput' 
                                type="text" 
                                sx={{ width: '100%', borderRadius: 2}}
                                value={this.state.selectedPlanetName}
                                onChange={(e) => this.props.editselection('selectedPlanetName', e.target.value)}>
                            </TextField>
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant='h7' align='left'>Mass (kg)</Typography>
                        </Grid>
                        <Grid item xs={9} sx={{ marginTop: 1 }}>
                            <Slider
                                min={20}
                                max={this.state.selectedPlanetType == 'sun' ? 300 : this.props.maxallowedplanetsize}
                                value={this.state.selectedPlanetMass}
                                valueLabelDisplay="auto"
                                onChange={(e) => this.props.editselection('selectedPlanetMass', e.target.value)}
                                />
                        </Grid>
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
                        <Grid item xs={11}>
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
                        <Grid item xs={11}>
                            <Typography variant='h7' align='left'>Color</Typography>
                        </Grid>
                        <Grid item xs={10} sx={{ marginTop: 2 }}>
                            <HexColorPicker 
                                color={this.state.selectedPlanetColor} 
                                onChange={(e) => this.props.editselection('selectedPlanetColor', e)}/>
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant='h7' align='left'>Moons</Typography>
                        </Grid>
                        <Grid item xs={11} paddingBottom={2}>
                            <TextField 
                                id='planetMoonInput' 
                                type="text" 
                                sx={{ width: '100%', borderRadius: 2 }}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} alignItems='center' justifyContent='center' paddingBottom={2}>
                        <Grid item xs={5} justifyContent='center'>
                            <Button
                                onClick={this.handleSave}
                                variant='contained'
                                id='saveChangesButton'
                                startIcon={<SaveIcon/>}
                                color={'success'}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                                    Save
                            </Button>
                        </Grid>
                        <Grid item xs={5} justifyContent='center'>
                            <Button
                                onClick={this.handleCancel}
                                variant='contained'
                                id='CancelChangesButton'
                                startIcon={<CancelIcon/>}
                                color={'warning'}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                                    Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={10} justifyContent='center'>
                            {/* Makes Sure that the delete button is only available for existing planets. */}
                            { (this.state.iseditingplanet || this.state.selectedPlanetType == 'planet') ? 
                                <Button
                                    onClick={this.handleDelete}
                                    variant='contained'
                                    id='DeletePlanetButton'
                                    startIcon={<DeleteForeverIcon />}
                                    color={'error'}
                                    sx={{ textTransform: 'none', fontWeight: 'bold', width: '100%' }}>
                                        Delete Forever
                                </Button>
                                : null
                            }
                        </Grid>
                    </Grid>
                </Drawer>
            </ThemeProvider>
        );
    }
}

export default SidePanel;