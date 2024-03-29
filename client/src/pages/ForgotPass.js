// Base Import
import React from 'react';
import axios from 'axios';

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

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            errMsg: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Clear error message
        this.setState({errMsg: ''});
        
        const data = {
            email: this.state.email.trim()
        };

        try {
            // Send login to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/forgot-password`,
                data
            );

            // Tell the user an email has been sent
            window.location.href = '/forgot-password-success'
        } catch(err) {
            console.log(err);

            if (err?.response?.data?.error)
                this.setState({errMsg: err.response.data.error})
            else 
                this.setState({errMsg: "something went wrong"})
        }
    };

    render() {
        console.log("Rendering Forgot Password Page...");
       
        return(
            <ThemeProvider theme={getTheme()}>
                <TitleHeader/>
                <Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2}>
                    <Grid container id='forgotPassContainer' columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
                        <Grid item xs={4} justifyContent={'center'}>
                            <Typography align='center' fontWeight={'bold'} variant="h4">Forgot Password?</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography align='center'>Enter your email address below. You will receive a reset password email.</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                error={this.state.errMsg !== ''}
                                helperText={this.state.errMsg}
                                onChange={(e) => this.setState({ email: e.target.value })} id="emailinput" size="small" label="Email" type="text" sx={{ width: '100%', borderRadius: 2 }}/>
                        </Grid>

                        <Grid item xs={2}>
                            <Link to={'/'}>
                                <Button size='large' sx={{ borderRadius: 2, width: '100%', color: 'primary.contrastText'}}>
                                    <FontAwesomeIcon icon={faChevronLeft}/> &nbsp; Go Back
                                </Button>
                            </Link>
                        </Grid> 
                        <Grid item xs={2}>
                            <Button variant='contained' size='large' onClick={this.handleSubmit}
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