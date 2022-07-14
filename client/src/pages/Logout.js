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

class ForgotPass extends React.Component {

    render() {
        console.log("Rendering Logout page...");

        // TODO: clear this.state.clientSession??? Ask Humza or Isaac about how states work.
        localStorage.clear();
        window.location.href = '';
       
        return(
            <ThemeProvider theme={getTheme()}>
                <TitleHeader/>
                <Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2}>
                    <Grid container id='forgotPassContainer' columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
                        <Grid item xs={4} justifyContent={'center'}>
                            <Typography align='center' fontWeight={'bold'} variant="h4">Logging out...</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography align='center'>Please wait while you are redirected to sign in again.</Typography>
                        </Grid>
                    </Grid>
                </Positioner>
            </ThemeProvider>
        );
    }
}

export default  ForgotPass;