// Base Import
import React from 'react';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling Imports
import '../styles/forgotpass.css';

// Mui Components
import { TextField, Button, Grid, Typography, ThemeProvider } from '@mui/material';
import { getTheme } from '../styles/mainTheme';
import TitleHeader from '../components/TitleHeader';
import Positioner from '../components/Positioner';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

class ForgotPass extends React.Component {
    render() {
        console.log("Rendering Not Found page...");
       
        return(
            <ThemeProvider theme={getTheme()}>
                <TitleHeader/>
                <Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2}>
                    <Grid container id='forgotPassContainer' columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
                        <Grid item xs={4} justifyContent={'center'}>
                            <Typography align='center' fontWeight={'bold'} variant="h4">Uh oh... 404</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography align='center'>We could not find this page. Make sure you entered the URL correctly!</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Link to={'/'}>
                                <Button size='large' sx={{ borderRadius: 2, width: '100%', color: 'primary.contrastText'}}>
                                    <FontAwesomeIcon icon={faHouse}/> &nbsp; Go Home
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Positioner>
            </ThemeProvider>
        );
    }
}

export default  ForgotPass;