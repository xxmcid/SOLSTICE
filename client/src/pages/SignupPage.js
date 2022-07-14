// Base Import
import { React, Component } from 'react';
import axios from 'axios';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling imports (May not be needed since App.js already imports it, but lets be safe)
import { getTheme } from '../styles/mainTheme';
import { ThemeProvider } from '@mui/material';
import '../styles/signuppage.css';
import '../styles/loginpage.css';

// MUI Components
import Box from '@mui/material/Box';
import { Paper, Button, TextField } from '@mui/material';

// Custom Components
import Header from '../components/Header';

class SignupPage extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            // JSON Payload for user credentials
            firstName: '',
            lastName: '',
            email: '',
            password: '',

            // page specific states.
            signuperrorVisible: false,
            signuperror: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const signup = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };

        try {
            // Send login to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/signup`,
                signup
            );

            // TODO: Tell the user to verify their email before redirected

            // Go to the sign in page.
            window.location.href = '';
        } catch(err) {
            // Display error messages in red text to users.
            this.setState({ signuperror: err.response.data.error, signuperrorVisible: true });
        }
    };

    render()
    {
        console.log("Rendering Signup Page...");
        return (
            <ThemeProvider theme={getTheme()}>
                <div>
                    <Header/>
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
                            id='signupContainer'
                            variant="outlined" 
                            square 
                            sx={{ 
                                backgroundColor: 'background.default',
                                borderRadius: 5
                            }} >
                                
                            <div id='registerlabel'>Sign Up</div>
                            { this.state.signuperrorVisible ? <div id='errorPrompt'>{this.state.signuperror}</div> : null }
                            <div id='inputcontainer'>
                                <div className="label">First Name</div>
                                    <TextField 
                                        onChange={(e) => this.setState({ firstName: e.target.value })}
                                        id="firstNameinput" 
                                        sx=
                                        {{  
                                            backgroundColor: 'primary.light',
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
                                            backgroundColor: 'primary.light',
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
                                            backgroundColor: 'primary.light',
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
                                            backgroundColor: 'primary.light', 
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
                                    onClick={this.handleSubmit}
                                    sx={{ 
                                        textTransform: 'none',
                                        backgroundColor: 'primary.main',
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