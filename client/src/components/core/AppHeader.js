// Base Import
import { React, Component } from 'react';


import { getTheme } from '../../styles/mainTheme';
import Info from '../Info';
import SolarSystemBtn from './SolarSystemBtn';

// MUI Components
import { Button, Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import { Box } from '@mui/system';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faAngleDown, faAngleUp, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class AppHeader extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            infopagevisible: false,

            // css
            isExpanded: false,
        };

        this.switchSolarSystem = this.switchSolarSystem.bind(this);
        this.createNewSolarSystem = this.createNewSolarSystem.bind(this);
        this.toggleInfoPage = this.toggleInfoPage.bind(this);
        this.expand = this.expand.bind(this);
        
    }

    theme = getTheme();

    switchSolarSystem(id) {
        this.props.switchSolarSystem(id);
    }

    async createNewSolarSystem() {
        console.log("requesting new solar system");

        const url = `${window.location.protocol}//${window.location.host}/api/add-solar-system`
        const data = {
            token: this.props.clientSession
        }

        // Fetch the user's solar systems.
        try {
            const response = await axios.post(url, data);
            this.props.refreshSolarSystems();
            this.props.switchSolarSystem(response?.data?.solarSystem?._id, false);
        } catch (err) {
            console.log(err);
        }
    }

    async removeSolarSystem(id) {
        console.log("removing solar system with id: " + id);

        const url = `${window.location.protocol}//${window.location.host}/api/remove-solar-system`
        const data = {
            token: this.props.clientSession,
            solarSystemId: id
        }

        // Fetch the user's solar systems.
        try {
            const response = await axios.post(url, data);

            this.switchSolarSystem();
            this.props.refreshSolarSystems();
        } catch (err) {
            console.log(err);
        }
    }

    async renameSolarSystem(id, name) {
        console.log("renameing solar system with id " + id + " to " + name);

        const url = `${window.location.protocol}//${window.location.host}/api/update-solar-system`
        const data = {
            token: this.props.clientSession,
            solarSystemId: id,
            name: name,
        }

        // Fetch the user's solar systems.
        try {
            const response = await axios.post(url, data);

            this.props.refreshSolarSystems();
        } catch (err) {
            console.log(err);
        }
    }

    toggleInfoPage() {
        console.log("Info page visible: " + !this.state.infopagevisible);

        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    expand() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    render() {
        return(
            <ThemeProvider theme={this.theme}>
                <Box sx={{
                    backgroundColor: 'background.dark',

                    borderRadius: this.state.isExpanded ? '8px' : '0px',
                    border: this.state.isExpanded ? 'grey solid .5px' : 'none',
                    borderBottom: 'grey solid .5px',
                    
                    position: 'fixed',
                    zIndex: 1201,
                    top: this.state.isExpanded ? '10px' : '0px',
                    left: this.state.isExpanded ? '10px' : '0px',
                    width: this.state.isExpanded ? 'calc(100% - 22px)' : '100%',
                    height: this.state.isExpanded ? '160px' : '56px',
                    transition: "all .2s ease-in-out",
                    [this.theme.breakpoints.down('md')]: {
                        height: this.state.isExpanded ? '230px' : '56px',
                    }
                }}>
                    <Grid container paddingX={2} paddingY={1} justifyContent={'space-between'} alignItems={'center'} columns={{ sm: 4, md: 8}} height={'100%'}>
                        {
                            // Info panel: only shown when toggled
                            this.state.infopagevisible ? <Info onClose={this.toggleInfoPage}/> : null 
                        }

                        <Grid item sm={2} md={1}>
                            <Typography color={'white'} fontWeight={'bold'} variant="h4" lineHeight={'30px'}>
                                SOLSTICE
                            </Typography>
                        </Grid>

                        
                        <Grid item container md={"auto"} justifyContent={'center'} columnSpacing={2} rowSpacing={2} sx={{[this.theme.breakpoints.down('md')]: {'display': 'none'}}}>
                            {
                                this.props.solarSystems.map((ss) => 
                                    <Grid item>
                                        <SolarSystemBtn 
                                            systemName={ss.name}
                                            isSelected={ss.selected}
                                            isExpanded={this.state.isExpanded}
                                            switchSolarSystem={() => this.switchSolarSystem(ss._id)}
                                            changeSolarSystemName={name => this.renameSolarSystem(ss._id, name)}
                                            removeSolarSystem={() => this.removeSolarSystem(ss._id)}
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>

                        <Grid item sm={2} md={'auto'} alignContent={'center'}>
                            <IconButton sx={{ float: 'right' }} size={'medium'} onClick={this.toggleInfoPage}>
                                <FontAwesomeIcon icon={faGear}/>
                            </IconButton>
                            <IconButton sx={{ float: 'right' }} size={'medium'} onClick={this.expand}>
                                {this.state.isExpanded 
                                    ? <FontAwesomeIcon width={24} icon={faAngleUp}/>
                                    : <FontAwesomeIcon width={24} icon={faAngleDown}/>
                                }
                            </IconButton>
                            <IconButton sx={{ float: 'right' }} size={'medium'} disabled={this.state.solarSystems?.length >= 4} onClick={this.createNewSolarSystem}>
                                <FontAwesomeIcon icon={faPlusCircle}/>
                            </IconButton>
                        </Grid>

                        <Grid item container md={4} justifyContent={'center'} columnSpacing={2} rowSpacing={2} zeroMinWidth
                            sx={{
                                opacity: this.state.isExpanded ? 1 : 0,
                                transition: 'all .2s ease-in-out',
                                [this.theme.breakpoints.up('md')]: {
                                    'display': 'none'
                                }
                            }}
                        >
                            {
                                this.props.solarSystems.map((ss) => 
                                    <Grid item>
                                        <SolarSystemBtn 
                                            systemName={ss.name}
                                            isSelected={ss.selected}
                                            isExpanded={this.state.isExpanded}
                                            switchSolarSystem={() => this.switchSolarSystem(ss._id)}
                                            changeSolarSystemName={name => this.renameSolarSystem(ss._id, name)}
                                            removeSolarSystem={() => this.removeSolarSystem(ss._id)}
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        );
    }
}

export default AppHeader;