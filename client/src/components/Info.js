// Base Import
import { React, Component } from "react";

// Styling Imports
import { getTheme } from "../styles/mainTheme";
import '../styles/info.css';

// MUI Components
import { Paper, Divider, IconButton, Typography, Grid, ThemeProvider, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

class Info extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            infopageHandler: this.props.onClick
        }
    }

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
                                    color="red"
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
                    </Paper>
                </Box>
            </ThemeProvider>
        );
    }
}

export default Info