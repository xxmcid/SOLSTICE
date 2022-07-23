// Base Import
import { React, Component } from 'react';
import axios from 'axios';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling imports (May not be needed since App.js already imports it, but lets be safe)
import { getTheme } from '../styles/mainTheme';
import { Grid, ThemeProvider, Typography } from '@mui/material';
import '../styles/signuppage.css';
// import '../styles/loginpage.css';

// MUI Components
import { Button, TextField } from '@mui/material';

// Custom Components
import Header from '../components/Header';
import Positioner from '../components/Positioner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class SignupPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            firstNameErr: false,
            firstNameErrMsg: '',

            lastName: '',
            lastNameErr: false,
            lastNameErrMsg: '',

            email: '',
            emailErr: false,
            emailErrMsg: '',

            password: '',
            passwordErr: false,
            passwordErrMsg: '',

            confirmPassword: '',
            confirmPasswordErrorMsg: '',
            
            // page specific states.
            signuperrorVisible: false,
            signuperror: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.password !== this.state.confirmPassword)
            return this.setState({confirmPasswordErrorMsg: 'The passwords do not match!'});

        // Clear error message
        this.setState({confirmPasswordErrorMsg: ''});
        
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

            // Prompt the user to verify their e-mail.
            window.location.href = '/email-verification-sent';
        } catch (err) {
            
            this.setState({
                firstNameErr: false,
                firstNameErrMsg: "",
                lastNameErr: false,
                lastNameErrMsg: "",
                emailErr: false,
                emailErrMsg: "",
                passwordErr: false,
                passwordErrMsg: "",
            })
            
            // Display error messages in red text to users.
            // TODO: figure out why this errors (what are the ? for?):
            const errMsg = err?.response?.data?.error?.toLowerCase(); // `TypeError: a.toLowerCase is not a function`
            if (errMsg) {
                if (errMsg.includes('first name')) {
                    this.setState({
                        firstNameErr: true,
                        firstNameErrMsg: errMsg,
                    })
                } 
                
                if (errMsg.includes('last name')) {
                    this.setState({
                        lastNameErr: true,
                        lastNameErrMsg: errMsg,
                    })
                } 
                
                if (errMsg.includes('email')) {
                    this.setState({
                        emailErr: true,
                        emailErrMsg: errMsg,
                    })
                } 
                
                if (errMsg.includes('password')) {
                    this.setState({
                        passwordErr: true,
                        passwordErrMsg: errMsg,
                    })
                }
            }

            // this.setState({ signuperror: err.response.data.error, signuperrorVisible: true });
        }
    };

    render() {
        console.log("Rendering Signup Page...");
        return (
            <ThemeProvider theme={getTheme()}>
                <Header/>
                <Positioner
                    color={'text.primary'} 
                    backgroundColor={'background.default'} 
                    borderRadius={2}
                    position={'left'}
                >
                    <Grid id="signupContainer"
                        container
                        columns={4} 
                        rowSpacing={3}
                        columnSpacing={2} 
                        alignContent={'center'} 
                        justifyContent={'space-around'} 
                        padding='24px'
                    >
                        <Grid item xs={4}>
                            <Typography textAlign={'center'} fontWeight={'bold'} variant='h4'>Sign Up</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField  onChange={(e) => this.setState({ firstName: e.target.value })}
                                size="small" 
                                label="First Name" 
                                type="text"
                                error={this.state.firstNameErr}
                                helperText={this.state.firstNameErrMsg}
                                sx={{width: '100%'}}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField  onChange={(e) => this.setState({ lastName: e.target.value })}
                                size="small" 
                                label="Last Name" 
                                type="text"
                                error={this.state.lastNameErr}
                                helperText={this.state.lastNameErrMsg}
                                sx={{width: '100%'}}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField  onChange={(e) => this.setState({ email: e.target.value })}
                                size="small" 
                                label="Email" 
                                type="text"
                                error={this.state.emailErr}
                                helperText={this.state.emailErrMsg}
                                sx={{width: '100%'}}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField onChange={(e) => this.setState({ password: e.target.value })}
                                size="small" 
                                label="Password" 
                                type="password"
                                error={this.state.passwordErr}
                                helperText={this.state.passwordErrMsg}
                                sx={{width: '100%'}}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField 
                                type="password" 
                                size="small"
                                label="Confirm New Password" 
                                error={this.state.confirmPasswordErrorMsg !== ''}
                                helperText={this.state.confirmPasswordErrorMsg}
                                sx={{ width: '100%', borderRadius: 2 }}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <Link to={'/'}>
                                <Button size='large' sx={{ borderRadius: 2, width: '100%', color: 'primary.contrastText'}}>
                                    <FontAwesomeIcon icon={faChevronLeft}/> &nbsp; Go Back
                                </Button>
                            </Link>
                        </Grid> 

                        <Grid item xs={2}>
                            <Button variant='contained' 
                                size='large' 
                                sx={{ 
                                    textTransform: 'none', 
                                    borderRadius: 2, 
                                    width: '100%',
                                    backgroundColor: 'primary.main',
                                }}
                                onClick={this.handleSubmit}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </Positioner>
            </ThemeProvider>
        );
    }
}

export default SignupPage;