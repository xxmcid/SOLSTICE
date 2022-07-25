// Base Import
import { React, Component } from "react";
import axios from 'axios';

// Styling Imports
import { getTheme } from "../styles/mainTheme";
import '../styles/info.css';

// Routing Imports
import { Link } from 'react-router-dom';

// MUI Components
import { Button, Paper, Divider, IconButton, Typography, Grid, ThemeProvider, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Positioner from '../components/Positioner';

class Info extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            infopageHandler: this.props.onClick,
            isSettingsPage: this.props.isSettingsPage
        }

        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    async handleDeleteUser(e) {
        e.preventDefault();

        const data = {
            token: localStorage.getItem('clientSession')
        };

        try {
            // Send login to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/remove-user`,
                data
            );

            // Clear session & go to the sign in page.
            localStorage.clear();
            window.location.href = '';
        } catch(err) {
            console.log(err?.response?.data);
        }
    };

    render() {
        return(
            <ThemeProvider theme={getTheme()}>
                <Box 
                    id="infoContainer"
                    sx={{
                    backgroundColor: 'rgb(0, 0, 0, .8)',
                    position: "fixed",
                    zIndex: 1,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: "100px",
                    width: 'calc(100% - 200px)', // sub for padding
                    height: 'calc(100% - 200px)', // sub for padding
                    [getTheme().breakpoints.down('sm')]: {
                        padding: "20px",
                        width: 'calc(100% - 40px)', // sub for padding
                        height: 'calc(100% - 40px)', // sub for padding
                    }
                }}>
                    <Paper 
                        color={'text.contrast'} 
                        backgroundColor={'background.default'}
                        sx={{
                            width: "calc(100% - 48px)", // sub for padding
                            height: "calc(100% - 48px)", // sub for padding
                            padding: '24px',
                            borderRadius: '20px'
                        }}
                    >
                        <Grid container alignItems="top">
                            <Grid item xs>
                                <Typography lineHeight={'3rem'} variant="h3">About</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton id='closebutton' 
                                    onClick={this.props.onClose}
                                    color="error"
                                    sx={{
                                        borderRadius: 2,
                                        height: 'fit-content',
                                        width: 'fit-content',
                                        float: 'right',
                                    }}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>                    
                        </Grid>

                        <Divider backgroundColor={'primary.contrastText'} sx= {{ marginTop: 1, marginBottom: 1, borderWidth: '2px', borderColor: '#EFEFEF', borderRadius: '20px' }}/>

                        <Typography variant="h5">
                            Graphics
                        </Typography>
                        
                        <Typography>
                            • React components made using <a target="_blank" href="https://mui.com/">Material UI</a>.
                        </Typography>

                        <Typography>
                            • Textures made using <a target="_blank" href="https://deep-fold.itch.io">Deep-Fold's Generators</a>.
                        </Typography>

                        <br></br>
                        <Typography variant="h5">
                            Authors
                        </Typography>

                        <Typography> • Isaac Liljeros (Project Manager & Front-End)</Typography>
                        <Typography> • Michael Vuolo (API & Mobile) </Typography>
                        <Typography> • Humza Rahman (Front-End) </Typography>
                        <Typography> • Jonathan Gilbert (API & Mobile) </Typography>
                        <Typography> • Gani Begawala (Front End & Mobile) </Typography>
                        <Typography> • Carlos Bermudez (Database) </Typography>

                        {this.state.isSettingsPage && (<Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2} isSettingsPage={true}>
                            <Grid container columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
                                {(this.props.firstName || this.props.lastName) && (<Grid item xs={4}>
                                    <Typography align='center' fontWeight={'bold'} variant="h4">{this.props.firstName && this.props.lastName ? `${this.props.firstName} ${this.props.lastName}` : (this.props.firstName ? this.props.firstName : (this.props.lastName ? this.props.lastName : ''))}</Typography>
                                </Grid>)}
                                
                                {this.props.email && (<Grid item xs={4}>
                                    <Typography align='center'>{this.props.email}</Typography>
                                </Grid>)}

                                <Grid item xs={4}>
                                    <Link to='/logout'>
                                        <Button
                                            align={'center'}
                                            variant='contained'
                                            size='large'
                                            sx={{ 
                                                textTransform: 'none', 
                                                borderRadius: 2, 
                                                padding: 'auto',
                                                backgroundColor: 'primary.main',
                                                left: '50%',
                                                transform: 'translate(-50%,0%)',
                                            }}
                                        >
                                            Log Out
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button 
                                        align={'center'}
                                        variant='contained'
                                        size='large'
                                        onClick={this.handleDeleteUser}
                                        sx={{ 
                                            textTransform: 'none', 
                                            borderRadius: 2, 
                                            padding: 'auto',
                                            backgroundColor: 'red',
                                            left: '50%',
                                            transform: 'translate(-50%,0%)',
                                        }}
                                    >
                                        Delete Account (No Going Back!)
                                    </Button>
                                </Grid>
                            </Grid>
                        </Positioner>)}
                    </Paper>
                </Box>
            </ThemeProvider>
        );
    }
}

export default Info