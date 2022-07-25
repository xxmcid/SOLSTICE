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
import { Drawer, Paper, Typography, ThemeProvider, Grid, TextField, Button, Slider, List, ListItemButton, ListItemText, ListItemIcon, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Misc Components
import { HexColorPicker } from "react-colorful";

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCircleXmark, faBarsStaggered, faSun, faEarth, faMoon, faCircle, faBan, faSquare, faWater} from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';


class SidePanel extends Component {
    constructor(props) {
        super(props);
        // Binds event handlers passed in from parent to event handlers that are local to SidePanel.js
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addMoon = this.addMoon.bind(this);

        this.state = {
            texturePresetListOpened: false
        };
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
            selectedPlanetTexturePreset: nextProps.sptp || 'earth',
            selectedPlanetParent: nextProps.spp,
            selectedPlanetMoonId: nextProps.moonId,
        }
      }

    // Handles the updated parameters for planet.
    // Also sends update to database.
    async handleSave() {
        // If we're editing an existing planet
        if (this.props.iseditingplanet == true) {

            if (this.props.spt == "moon") {
                this.updateMoon(); return;
            }

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
                    "texturePreset": this.props.sptp || 'earth',
                    "color": this.props.spc || '#FFFFFF'
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
                    "texturePreset": this.props.sptp || 'earth',
                    "color": this.props.spc || '#FFFFFF'
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

        if (this.props.spt == 'moon')
        {
            this.deleteMoon();
            return;
        }

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

    // Adds a generic moon to the currently selected planet.
    async addMoon() {
        const requestData = {
            "token": localStorage.getItem('clientSession'),
            "solarSystemId": this.props.ssid,
            "planetId": this.props.spi,
            "moon" : {
                "name": "Moon",
                "mass": Number(25),
                "gravitationalPull": Number(0),
                "distance": Number(this.props.spm + 20),
                "texturePreset": "moon",
                "color": '#EFEFEF'
            }
        }

        try { // Send the new planet to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/add-moon`,
                requestData
            );
            
        // Grab updated planets array from response.
        const newPlanets = response.data.planets;

        //Update Sketch with new data!
        this.props.updatePlanets(newPlanets);

        } catch (err) { console.log(err?.response?.data); }

    }

    async updateMoon() {
        const requestData = {
            "token": localStorage.getItem('clientSession'),
            "solarSystemId": this.props.ssid,
            "planetId": this.props.spp.id,
            "moon" : {
                "_id": this.props.moonId,
                "name": "Moon",
                "mass": Number(this.props.spm),
                "gravitationalPull": Number(0),
                "distance": Number(this.props.spd),
                "texturePreset": "moon",
                "color": this.props.spc || '#FFFFFF'
            }
        }

        try { // Send the new planet to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/update-moon`,
                requestData
            );
            
        // Grab updated planets array from response.
        const newPlanets = response.data.planets;

        //Update Sketch with new data!
        this.props.updatePlanets(newPlanets);

        } catch (err) { console.log(err?.response?.data); }

        // Clears our selected moon from the state.
        this.props.clearselection();
        // Closes the sidepanel
        this.props.close();
    }

    async deleteMoon() {
        const requestData = {
            "token": localStorage.getItem('clientSession'),
            "solarSystemId": this.props.ssid,
            "planetId": this.props.spp.id,
            "moonId": this.props.moonId
        }

        try { // Send the new planet to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/remove-moon`,
                requestData
            );
            
        // Grab updated planets array from response.
        const newPlanets = response.data.planets;

        //Update Sketch with new data!
        this.props.updatePlanets(newPlanets);

        } catch (err) { console.log(err?.response?.data); }

        // Clears our selected moon from the state.
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
                        sx={{
                            overflowY: 'scroll'
                        }}
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

                        {/* Sun should be the only body that can change gravity */}
                        {this.state.selectedPlanetType == 'sun' ? 
                            <Fragment>
                                <Grid item xs={9}>
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

                        {/* Distance shouldn't be visible if we have the sun selected  */}
                        {this.state.selectedPlanetType == 'sun' ?  null :
                        <Fragment>
                            <Grid item xs={9}>
                                <Typography variant='h7' align='left'>Distance (From nearest body)</Typography>
                            </Grid>
                            <Grid item xs={9} sx={{ marginTop: 1 }}>
                                <Slider
                                    min={this.props.minalloweddistance}
                                    max={this.props.maxalloweddistance}
                                    value={Number(this.state.selectedPlanetDistance)}
                                    valueLabelDisplay="auto"
                                    onChange={(e) => this.props.editselection('selectedPlanetDistance', e.target.value)}
                                    />
                            </Grid>
                        </Fragment>}

                        <List
                            sx={{ width: '100%', marginTop: "10px", maxWidth: 360, bgcolor: 'background.paper' }}
                            component="nav"
                        >
                            <ListItemButton onClick={() => {this.setState({texturePresetListOpened: !this.state.texturePresetListOpened})}}>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={faBarsStaggered} />
                                </ListItemIcon>
                                <ListItemText primary="Texture Preset" />
                                {this.state.texturePresetListOpened ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={this.state.texturePresetListOpened} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => this.props.editselection('selectedPlanetTexturePreset', 'water')} sx={{ pl: 4, backgroundColor: this.props.sptp == 'sun' ? "#606060" : "rgb(255,255,255,0.1)" }}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faSun} color="gold" />
                                        </ListItemIcon>
                                        <ListItemText primary="Sun" />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => this.props.editselection('selectedPlanetTexturePreset', 'earth')} sx={{ pl: 4, backgroundColor: this.props.sptp == 'earth' ? "#606060" : "rgb(255,255,255,0.1)" }}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faEarth} color="green"/>
                                        </ListItemIcon>
                                        <ListItemText primary="Earth" />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => this.props.editselection('selectedPlanetTexturePreset', 'moon')} sx={{ pl: 4, backgroundColor: this.props.sptp == 'moon' ? "#606060" : "rgb(255,255,255,0.1)" }}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faMoon} color="gray"/>
                                        </ListItemIcon>
                                        <ListItemText primary="Moon" />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => this.props.editselection('selectedPlanetTexturePreset', 'dry')} sx={{ pl: 4, backgroundColor: this.props.sptp == 'dry' ? "#606060" : "rgb(255,255,255,0.1)" }}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faCircle} color="#C2B280"/>
                                        </ListItemIcon>
                                        <ListItemText primary="Dry" />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => this.props.editselection('selectedPlanetTexturePreset', 'gas2')} sx={{ pl: 4, backgroundColor: this.props.sptp == 'gas2' ? "#606060" : "rgb(255,255,255,0.1)" }}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={farCircle} color="#A45729"/>
                                        </ListItemIcon>
                                        <ListItemText primary="Gas" />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => this.props.editselection('selectedPlanetTexturePreset', 'gas1')} sx={{ pl: 4, backgroundColor: this.props.sptp == 'gas1' ? "#606060" : "rgb(255,255,255,0.1)" }}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faBan} color="#A45729"/>
                                        </ListItemIcon>
                                        <ListItemText primary="Gas (with rings)" />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => this.props.editselection('selectedPlanetTexturePreset', 'ice')} sx={{ pl: 4, backgroundColor: this.props.sptp == 'ice' ? "#606060" : "rgb(255,255,255,0.1)" }}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faSquare} color="skyblue"/>
                                        </ListItemIcon>
                                        <ListItemText primary="Ice" />
                                    </ListItemButton>
                                    <ListItemButton onClick={() => this.props.editselection('selectedPlanetTexturePreset', 'water')} sx={{ pl: 4, backgroundColor: this.props.sptp == 'water' ? "#606060" : "rgb(255,255,255,0.1)" }}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faWater} color="blue"/>
                                        </ListItemIcon>
                                        <ListItemText primary="Water" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>

                        {/* <List.Accordion style={{backgroundColor: "#cfcfcf"}} title="Texture Preset" left={props => <List.Icon {...props} icon="texture-box"/>}>
                            <List.Item style={{backgroundColor: texturePreset == 'sun' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('sun')}} title="Sun" left={props => <List.Icon {...props} color="gold" icon="white-balance-sunny"/>}/>
                            <List.Item style={{backgroundColor: texturePreset == 'earth' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('earth')}} title="Earth" left={props => <List.Icon {...props} color="green" icon="circle"/>}/>
                            <List.Item style={{backgroundColor: texturePreset == 'moon' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('moon')}} title="Moon"  left={props => <List.Icon {...props} color="gray" icon="moon-waning-crescent"/>}/>
                            <List.Item style={{backgroundColor: texturePreset == 'dry' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('dry')}} title="Dry"  left={props => <List.Icon {...props} color="#C2B280" icon="circle"/>}/>
                            <List.Item style={{backgroundColor: texturePreset == 'gas2' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('gas2')}} title="Gas"  left={props => <List.Icon {...props} color="#A45729" icon="circle-outline"/>}/>
                            <List.Item style={{backgroundColor: texturePreset == 'gas1' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('gas1')}} title="Gas (with rings)"  left={props => <List.Icon {...props} color="#A45729" icon="circle-off-outline"/>}/>
                            <List.Item style={{backgroundColor: texturePreset == 'ice' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('ice')}} title="Ice"  left={props => <List.Icon {...props} color="skyblue" icon="square-rounded"/>}/>
                            <List.Item style={{backgroundColor: texturePreset == 'water' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('water')}} title="Water"  left={props => <List.Icon {...props} color="blue" icon="wave"/>}/>
                        </List.Accordion> */}

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

                        {/* Add moon button shouldn't be available for sun and moon objects */}
                        {(this.state.selectedPlanetType == 'moon' || this.state.selectedPlanetType == 'sun') ? null :
                        <Fragment>
                            <Grid item xs={9} marginTop={2}>
                                <Button
                                    id='addMoonButton'
                                    onClick={this.addMoon}
                                    variant='contained'
                                    color={'success'}
                                    size={'large'}
                                    startIcon={<FontAwesomeIcon icon={faMoon} />}
                                    sx={{ 
                                        textTransform: 'none', 
                                        fontWeight: 'bold', 
                                        width: '100%',
                                        borderRadius: '8px',
                                    }}
                                >
                                    Add Moon
                                </Button>
                            </Grid>
                        </Fragment>}
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