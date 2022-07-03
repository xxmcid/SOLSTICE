// Base Import
import React from 'react';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling Imports
import '../styles/forgotpass.css';

// Mui Components
import { Paper, TextField, Button, Grid, Box, Typography, ThemeProvider } from '@mui/material';
import { mainTheme } from '../mainTheme';
import { dark } from '@mui/material/styles/createPalette';
import Header from '../components/Header';

class ForgotPass extends React.Component {
    render() {
        console.log("Rendering Forgot Password Page...");
       
        return(
            <ThemeProvider theme={mainTheme}>
                <Header/>
                <Grid container spacing={0} direction="column" style={{ minHeight: '100vh' }}
                    sx={{
                        justifyContent: "center",
                        [mainTheme.breakpoints.down('sm')]: {
                            justifyContent: "flex-start"          
                        },
                    }}>
                    <Grid container display="flex" spacing={{ xs: 0, md: 0 }} columns={{ xs: 12, sm: 8, md: 12 }}>
                        <Grid item xs={1} sm={1} md={0}></Grid>

                        <Grid item xs={10} sm={6} md={12}>
                            <Paper
                                elevation={1}

                                sx={{
                                    backgroundColor: dark,
                                    borderRadius: 2,
                                    [mainTheme.breakpoints.down('sm')]: {
                                        marginTop: 8,
                                    },
                                    [mainTheme.breakpoints.up('sm')]: {
                                        width: '100%',
                                    },
                                    [mainTheme.breakpoints.up('md')]: {
                                        width: 400,
                                        marginLeft: 20
                                    }
                                }}
                                >

                                <Grid container columns={4} sx={{ padding: 2}} rowSpacing={2} columnSpacing={2}>
                                    <Grid item xs={4}>
                                        <Typography variant="h5">Forgot Password?</Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography color={dark}>Enter your email address below. You will receive a reset password email.</Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField id="emailinput" size="small" label="Email" type="text" sx={{ width: '100%', borderRadius: 2 }}/>                                    
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Button size='large' sx={{ textTransform: 'none', borderRadius: 2, width: '100%' }}>
                                            <Link to={'/'}>Go Back</Link>
                                        </Button>
                                    </Grid> 
                                    <Grid item xs={2}>
                                        <Button variant='contained' size='large' sx={{ textTransform: 'none', borderRadius: 2, width: '100%' }}>
                                            Reset
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={1} sm={1} md={0}></Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );

    }

}

export default  ForgotPass;