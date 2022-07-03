// Base Import
import { React, Component } from 'react';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling imports (May not be needed since App.js already imports it, but lets be safe)
import { mainTheme } from '../mainTheme';
import'../styles/loginpage.css';

// MUI Components
import { Box, Paper, Button, TextField }from '@mui/material';

// Custom Components
import Header from '../components/Header';

class LoginPage extends Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
            infopagevisible: false
        };
    }

    setvisibility()
    {
        console.log("Info page visible: " + !this.state.infopagevisible);
        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    render()
    {
        console.log("Rendering LoginPage");
        return (
            <div>
                <Header />
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
                        id='loginContainer'
                        variant="outlined" 
                        square 
                        sx=
                        {{ 
                            backgroundColor: mainTheme.palette.primary.main,
                            borderRadius: 2 
                        }}>

                        <div id='signintitle'>Sign In</div>
                        <div id='inputcontainer'>
                            <div className="label">Email</div>
                            <TextField 
                                id="emailinput" 
                                sx=
                                {{  
                                    backgroundColor: mainTheme.palette.primary.light,
                                    maxWidth: 300,
                                    borderRadius: 2
                                }}
                                />
                            <div className="label">Password</div>
                            <TextField
                                id="passwordinput"
                                type="password"
                                sx=
                                {{  
                                    backgroundColor: mainTheme.palette.primary.light, 
                                    maxWidth: 300,
                                    borderRadius: 2
                                }}
                                />
                        </div>
                        <div id="lowerbuttoncontainer">
                                <Button 
                                    variant='contained'
                                    size='large'
                                    sx=
                                    {{ 
                                        textTransform: 'none',
                                        backgroundColor: mainTheme.palette.primary.contrast,
                                        borderRadius: 5
                                    }}>
                                        Sign in
                                </Button>
                                <Link to="/forgotpassword" className='textlink'>Forgot your password?</Link>
                        </div>
                        <div id='footercontainer'>
                            <div id='signuplabel'>
                                Don't have an account?{'\n'}
                                <Link to="/signup" className='textlink'>Sign up now.</Link>
                            </div>
                        </div>
                    </ Paper>
                </Box>
            </div>
        );
    }

}

export default LoginPage;