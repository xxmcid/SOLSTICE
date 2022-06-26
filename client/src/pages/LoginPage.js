// Base Import
import { React, Component } from 'react';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling imports (May not be needed since App.js already imports it, but lets be safe)
import { ThemeProvider, createTheme, Button } from '@mui/material';
import '../styles/common.css';
import'../styles/loginpage.css';

// MUI Components
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

// Custom Components
import Clock from '../components/Clock';

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
        console.log("setting visibility!!");
        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    render()
    {
        
        console.log("Creating main theme palette from MUI");
        const theme = createTheme(
        {
          palette: 
          {
            // Shades of grey
            primary: 
            {
              main: '#323031',
              light: '#7F7979',
              dark: '#3D3B3C',
              contrast: '#5F5B6B'
            }
          }
        });

        console.log("Rendering LoginPage");
        return (
                <ThemeProvider theme={theme}>
                    <div>
                        <div id='header'>
                            <div id='title'>SOLSTICE</div>
                            <Clock />
                            <Button 
                                id='infobutton' 
                                variant='contained'
                                onClick={this.setvisibility.bind(this)}>
                                <InfoIcon />
                            </Button>
                        </div>
                        <Box
                        sx={{
                            display: 'flex',
                            '& > :not(style)': {
                            m: 1,
                            width: 128,
                            height: 128,
                            },
                        }}>
                            { this.state.infopagevisible ? 
                            <Paper
                                id='infoContainer'
                                variant="outlined"
                                square 
                                sx=
                                {{ 
                                    backgroundColor: 'white',
                                    borderRadius: 5
                                }}>
                                <div id='infoheader'>
                                    About
                                    <Button 
                                        id='closebutton' 
                                        variant='contained'
                                        onClick={this.setvisibility.bind(this)}
                                        sx=
                                        {{
                                            height: 'fit-content',
                                            borderRadius: 7
                                        }}>
                                        <CloseIcon />
                                    </Button>
                                </div>
                                <Divider 
                                    variant='middle'
                                    sx=
                                    {{
                                        borderBottomWidth: 5,
                                        backgroundColor: 'black',
                                        marginLeft: 6,
                                        marginRight: 5 
                                    }}/>
                                <div id='infobody'>
                                    <br />
                                    Graphics
                                    <br />
                                    Background by Material UI, protected by Creative Commons
                                </div>
                            </Paper>: null }
                            <Paper 
                                id='loginContainer'
                                variant="outlined" 
                                square 
                                sx=
                                {{ 
                                    backgroundColor: theme.palette.primary.main,
                                    borderRadius: 5
                                }}>
                                    
                                <div id='signinlabel'>Sign in</div>
                                <div id='inputcontainer'>
                                    <div className="label">Email</div>
                                    <TextField 
                                        id="emailinput" 
                                        sx=
                                        {{  
                                            backgroundColor: theme.palette.primary.light,
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
                                            backgroundColor: theme.palette.primary.light, 
                                            maxWidth: 300,
                                            borderRadius: 2
                                        }}
                                        />
                                </div>
                                <div id='lowerbuttoncontainer'>
                                        <Button 
                                            variant='contained'
                                            size='large'
                                            sx=
                                            {{ 
                                                textTransform: 'none',
                                                backgroundColor: theme.palette.primary.contrast,
                                                borderRadius: 5
                                            }}>
                                                Sign in
                                        </Button>
                                        <button className='textlink' id='forgotpasslink'>Forgot your password?</button>
                                </div>
                                <div id='footercontainer'>
                                    <div id='signuplabel'>
                                        Don't have an account?
                                        <Link to="/signup" >Sign up now.</Link>
                                    </div>
                                </div>
                            </ Paper>
                        </Box>
                    </div>
                </ThemeProvider>
        );
    }

}

export default LoginPage;