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
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class ForgotPass extends React.Component {
    render() {
        console.log("Rendering Forgot Password Page...");
       
        return(
            <ThemeProvider theme={getTheme()}>
                <TitleHeader/>
<<<<<<< HEAD
                <Box sx={{
                    color: 'text.primary',
                    backgroundColor: 'background.default',
                    borderRadius: 2,
                    width: "100%",
                    maxWidth: "min(400px, calc(100% - 40px))",
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Grid container id='forgotPassContainer' columns={4} rowSpacing={2} columnSpacing={2} padding={4}>
                        
=======
                <Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2}>
                    <Grid container columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
>>>>>>> 5c1d13581f53d1a52fb3dbf8b6bd962927e513fe
                        <Grid item xs={4} justifyContent={'center'}>
                            <Typography align='center' fontWeight={'bold'} variant="h4">Forgot Password?</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>Enter your email address below. You will receive a reset password email.</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField id="emailinput" size="small" label="Email" type="text" sx={{ width: '100%', borderRadius: 2 }}/>                                    
                        </Grid>

                        <Grid item xs={2}>
                            <Link to={'/'}>
                                <Button size='large' sx={{ borderRadius: 2, width: '100%', color: 'primary.contrastText'}}>
                                    <FontAwesomeIcon icon={faChevronLeft}/> &nbsp; Go Back
                                </Button>
                            </Link>
                        </Grid> 
                        <Grid item xs={2}>
                            <Button variant='contained' size='large' 
                                sx={{ 
                                    textTransform: 'none', 
                                    borderRadius: 2, 
                                    width: '100%',
                                    backgroundColor: 'primary.main',
                                }}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </Positioner>
            </ThemeProvider>
        );
    }
}

export default  ForgotPass;