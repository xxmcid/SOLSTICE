// Base Import
import { React, Component } from 'react';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling imports (May not be needed since App.js already imports it, but lets be safe)
import { getTheme } from '../styles/mainTheme';
import'../styles/loginpage.css';

// MUI Components
import { Paper, Button, TextField, ThemeProvider, Typography, Grid }from '@mui/material';

// Custom Components
import Header from '../components/Header';
import Positioner from '../components/Positioner';

class LoginPage extends Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
            infopagevisible: false,
            email: "",
            password: "",
        };

        this.emailChanged = this.emailChanged.bind(this)
        this.passwordChanged = this.passwordChanged.bind(this)
        this.signin = this.signin.bind(this)
    }

    setvisibility()
    {
        console.log("Info page visible: " + !this.state.infopagevisible);
        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    emailChanged(event) {
        this.setState({
            email: event.target.value,
        })
    }

    passwordChanged(event) {
        this.setState({
            password: event.target.value,
        })
    }

    // This function returns a promise which must be caught with a .then
    async doSignin(email, password) {
        // Generate Login Request
        const request = {
            "email": email,
            "password": password,
        }

        // Response is a promise that must be waited for
        const response = await fetch('http://localhost:8080/api/signin/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(request),
        }).catch(err => console.log('Error: ' + err));

        // returning a promise
        return response.json();
    }

    signin() {
        const email = this.state.email;
        const password = this.state.password;
        console.log("logging in with " + email + " and " + password);

        this.doSignin(email, password).then(response => {
            console.log(response);
        })
    }

    render() {
        console.log("Rendering LoginPage");
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
                            <TextField onChange={this.emailChanged} size="small" label="Email" type="text" sx={{ width: '100%'}}/>
                        </Grid>

                        <Grid item xs={5}>
                            <TextField onChange={this.passwordChanged} size="small" label="Password" type="password" sx={{ width: '100%'}}/>
                        </Grid>

                        <Grid item xs={2}>
                            <Button onClick={this.signin} variant='contained' size={'large'} sx={{borderRadius: 5, float: 'right'}}>Sign in</Button>
                        </Grid>

                        <Grid item xs={3} textAlign={'center'} margin={'auto'}>
                            <Link to="/forgotpassword">Forgot your password?</Link>
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