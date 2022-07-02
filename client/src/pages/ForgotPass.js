// Base Import
import { React, Component } from 'react';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling Imports
import '../styles/forgotpass.css';

// Mui Components
import { Paper, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';



class ForgotPass extends Component
{

    render()
    {
        console.log("Rendering Forgot Password Page...");

        return(
            <Box 
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                        m: 1,
                        width: 128,
                        height: 128,
                    },
                }}>
                <Paper
                    id="forgotpasscontainer"
                    variant='outlined'
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 5
                    }}>
                    <div id="forgotpasstitle">Forgot Password?</div>
                    <div id="instructionprompt">Enter your email address below.</div>
                    <br id="linebreak"/>
                    <div id="instructionprompt">You will receive a reset password email.</div>
                    <TextField 
                        id="emailinput" 
                        sx=
                        {{  
                            backgroundColor: 'none',
                            width: 350,
                            borderRadius: 2,
                            marginTop: '10%',
                            marginBottom: '10%'
                        }}
                    />
                    <div id='resetbuttoncontainer'>
                        <Link to="/" sx={{ textDecoration: 'inherit', color: 'white' }}>
                                <Button 
                                    variant='contained'
                                    size='large'
                                    sx=
                                    {{ 
                                        textTransform: 'none',
                                        backgroundColor: 'black',
                                        borderRadius: 5,
                                    }}>
                                        Go Back
                                </Button>
                        </Link>
                        <Button 
                            variant='contained'
                            size='large'
                            sx=
                            {{ 
                                textTransform: 'none',
                                backgroundColor: 'black',
                                borderRadius: 5
                            }}>
                                Reset
                        </Button>
                    </div>
                </Paper>
            </Box>
        );

    }

}

export default ForgotPass;