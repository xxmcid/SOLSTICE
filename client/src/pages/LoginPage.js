// Base Import
import { React, Component } from 'react';
import axios from "axios";

// Routing Imports
import { Link } from 'react-router-dom';

// Styling imports (May not be needed since App.js already imports it, but lets be safe)
import { getTheme } from '../styles/mainTheme';
import '../styles/loginpage.css';

// MUI Components
import { Button, TextField, ThemeProvider, Typography, Grid }from '@mui/material';

// Custom Components
import TitleHeader from '../components/TitleHeader';
import Header from '../components/Header';
import Positioner from '../components/Positioner';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class LoginPage extends Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
            infopagevisible: false,
            email: "",
            emailErr: false,
            emailErrMsg: "",
            password: "",
            passwordErr: false,
            passwordErrMsg: "",

            // TODO: ask Humza or Isaac why we use States and if the below clientSession and handleSubmit function is necessary here
            clientSession: localStorage.getItem('clientSession')
        };

        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToPage = this.redirectToPage.bind(this);
    }

    setvisibility()
    {
        console.log("Info page visible: " + !this.state.infopagevisible);
        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    emailChanged(e) {
        this.setState({
            email: e.target.value,
        });
    }

    passwordChanged(e) {
        this.setState({
            password: e.target.value,
        });
    }

    // Fixes issues if someone manually adjusted the URL.
    redirectToPage(page) {
        if (!window.location.hash.startsWith('#/'))
            window.location.href = window.location.href.replace('#', '#/') + page;
        else
            window.location.href += page;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const login = {
            email: this.state.email,
            password: this.state.password
        };

        try {
            // Send login to the server.
            const response = await axios.post(
                'http://localhost:8080/api/signin',
                // `${window.location.protocol}//${window.location.host}/api/signin`,
                login
            );
    
            // Set the state of the user
            this.state.clientSession = response.data.token;

            // Store the user in localStorage
            localStorage.setItem('clientSession', response.data.token);

            // Go to the main home screen
            this.redirectToPage('solstice');
        } catch (err) {
            console.log(err.response)

            // Set Error Messages
            if (err && err.response && err.response.data && err.response.data.error) {
                this.setState({
                    emailErr: false,
                    emailErrMsg: "",
                    passwordErr: false,
                    passwordErrMsg: "",
                })

                const error = err.response.data.error.toLowerCase();

                if (error.includes('email')) {
                    this.setState({
                        emailErr: true,
                        emailErrMsg: error
                    });
                } 
                
                if (error.includes('password')) {
                    this.setState({
                        emailErrMsg: "", // remove "email or password incorrect" message 
                        passwordErr: true,
                        passwordErrMsg: error
                    });
                }
            }
        }
    }

    render() {
        console.log("Rendering LoginPage");

        // Validate clientSession token AND CLEAR if invalid / expired...
        if (typeof this.state.clientSession == 'string' && this.state.clientSession.length > 0) {
            axios.get(`${window.location.protocol}//${window.location.host}/api/validate-session/${this.state.clientSession}`)
                .then(response => {
                    // Logout
                    if (response.status != 200) {
                        localStorage.clear();
                        window.location.reload();
                    }

                    // Enter the app
                    this.redirectToPage('solstice');
                })
                .catch(err => {
                    // Logout
                    localStorage.clear();
                    window.location.reload();
                });

            return (
                <ThemeProvider theme={getTheme()}>
                    <TitleHeader/>
                    <Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2}>
                        <Grid container id='forgotPassContainer' columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
                            <Grid item xs={4} justifyContent={'center'}>
                                <Typography align='center' fontWeight={'bold'} variant="h4">Already Signed In</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography align='center'>Please wait while we redirect you...</Typography>
                            </Grid>

                            <Grid item xs={4}>
                            <Link to={'/'}>
                                <Button size='large' sx={{ borderRadius: 2, width: '100%', color: 'primary.contrastText'}}>
                                    <FontAwesomeIcon icon={faChevronLeft}/> &nbsp; Logout
                                </Button>
                            </Link>
                        </Grid>
                        </Grid>
                    </Positioner>
                </ThemeProvider>
            );
        }

        return (
            <ThemeProvider theme={getTheme()}>
                <Header />
                <Positioner 
                    color={'text.primary'} 
                    backgroundColor={'background.default'} 
                    borderRadius={2}
                    position={'left'}
                >
                    <Grid container 
                        id='loginContainer'
                        columns={5} 
                        rowSpacing={4}
                        columnSpacing={2} 
                        alignContent={'center'} 
                        justifyContent={'space-around'} 
                        padding='24px'
                    >
                        <Grid item xs={5}>
                            <Typography textAlign={'center'} fontWeight={'bold'} variant='h4'>Sign In</Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <TextField onChange={this.emailChanged} 
                                size="small" 
                                label="Email" 
                                type="text"
                                error={this.state.emailErr}
                                helperText={this.state.emailErrMsg}
                                sx={{ width: '100%'}}/>
                        </Grid>

                        <Grid item xs={5}>
                            <TextField onChange={this.passwordChanged} 
                                size="small" 
                                label="Password" 
                                type="password" 
                                error={this.state.passwordErr}
                                helperText={this.state.passwordErrMsg}
                                sx={{ width: '100%'}}/>
                        </Grid>

                        <Grid item xs={2}>
                            <Button onClick={this.handleSubmit} variant='contained' size={'large'} sx={{borderRadius: 5, float: 'right'}}>Sign in</Button>
                        </Grid>

                        <Grid item xs={3} textAlign={'center'} margin={'auto'}>
                            <Link to="/forgot-password">Forgot your password?</Link>
                        </Grid>

                        <Grid item xs={5} textAlign={'center'}>
                            <Typography>Don't have an account?</Typography>
                            <Link to="/signup" className='textlink'>Sign up now.</Link>
                        </Grid>
                    </Grid>
                </Positioner>
            </ThemeProvider>
        );
    }

}

export default LoginPage;