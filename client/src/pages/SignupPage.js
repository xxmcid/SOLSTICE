// Base Import
import { React, Component } from 'react';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling imports (May not be needed since App.js already imports it, but lets be safe)
import { ThemeProvider, createTheme } from '@mui/material';
import '../styles/common.css';
import '../styles/signuppage.css';
import '../styles/loginpage.css';

// MUI Components
import Box from '@mui/material/Box';
import { Paper, Button, TextField } from '@mui/material';

// Custom Components
import Clock from '../components/Clock';

class SignupPage extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
    }

    handleSignup(e) 
    {
        const jsonPayload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        
    }

    render()
    {        
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
            },

            lightmode:
            {
              main: '#FEFFFE', // Pearl White
              light: '#E5FCF5', // Light Cyan
              contrast: '#EADEDA', // Timberwolf
              black: '#000000' // Black (For Text)
            }
          }
        });

        return (
                <ThemeProvider theme={theme}>
                    <div>
                        <div id='header'>
                            <div id='title'>SOLSTICE</div>
                            <Clock />
                            <div></div>
                        </div>
                        <Box
                        sx={{
                            display: 'flex',
                            '& > :not(style)': {
                            m: 1,
                            width: 128,
                            height: 128,
                            },
                        }}
                        >
                        <Paper 
                            id='signupContainer'
                            variant="outlined" 
                            square 
                            sx=
                            {{ 
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 5
                            }} >
                                
                            <div id='registerlabel'>Sign Up</div>
                            <div id='inputcontainer'>
                                <div className="label">First Name</div>
                                    <TextField 
                                        onChange={(e) => this.setState({ firstName: e.target.value })}
                                        id="firstNameinput" 
                                        sx=
                                        {{  
                                            backgroundColor: theme.palette.primary.light,
                                            maxWidth: 300,
                                            borderRadius: 2
                                        }}
                                        />
                                    <div className="label">Last Name</div>
                                    <TextField 
                                        onChange={(e) => this.setState({ lastName: e.target.value })}
                                        id="lastNameinput" 
                                        sx=
                                        {{  
                                            backgroundColor: theme.palette.primary.light,
                                            maxWidth: 300,
                                            borderRadius: 2
                                        }}
                                        />   
                                    <div className="label">Email</div>
                                    <TextField 
                                        onChange={(e) => this.setState({ email: e.target.value })}
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
                                        onChange={(e) => this.setState({ password: e.target.value })}
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
                                <Link to="/" className='textlink'>Go Back</ Link>
                                <Button 
                                    variant='contained'
                                    size='large'
                                    onClick={this.handleSignup.bind(this)}
                                    sx=
                                    {{ 
                                        textTransform: 'none',
                                        backgroundColor: theme.palette.primary.contrast,
                                        borderRadius: 5
                                    }}>
                                        Register
                                </Button>
                            </div>
                        </ Paper>
                        </Box>
                    </div>
                </ThemeProvider>
        );
    }
}

export default SignupPage;