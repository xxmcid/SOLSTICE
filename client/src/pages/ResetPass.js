// Base Import
import { React, Component } from 'react';
import axios from 'axios';

// Routing Imports


// Styling Imports
import { getTheme } from '../styles/mainTheme';
import '../styles/resetpass.css';

// Mui Components
import { ThemeProvider, TextField, Button, Typography, Grid } from '@mui/material';
import TitleHeader from '../components/TitleHeader';
import Positioner from '../components/Positioner';

class ResetPass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // JSON Payload for reset password
            password: '',
            confirmPassword: '',
            token: ''
        };

        if (window.location.href.includes('?token='))
            this.state.token = window.location.href.split('?token=')[1];

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        // TODO: compare this.state.password and this.state.confirmPassword!!!!
        
        const data = {
            password: this.state.password,
            token: this.state.token
        };

        try {
            // Send login to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/reset-password`,
                data
            );

            // Go to the sign in page.
            window.location.href = '/password-reset-success';
        } catch(err) {
            console.log(err);
            // TODO: Display error messages in red text to users.
            // this.setState({ signuperror: err.response.data.error, signuperrorVisible: true });
        }
    };

    render() {

        console.log('Rendering Reset Password page!');

        // TODO: check and validate token before rendering the page

        return (
            <ThemeProvider theme={getTheme()}>
                <TitleHeader/>
                <Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2}>
                    <Grid container columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
                        <Grid item xs={4}>
                            <Typography align='center' fontWeight={'bold'} variant="h4">Reset Password</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography align='center'>Enter a new valid password below</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField type="password" size="small" label="New Password" 
                                sx={{ width: '100%', borderRadius: 2 }}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField type="password" size="small" label="Confirm New Password" 
                                sx={{ width: '100%', borderRadius: 2 }}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <Button 
                                align={'center'}
                                variant='contained'
                                size='large'
                                onClick={this.handleSubmit}
                                sx={{ 
                                    textTransform: 'none', 
                                    borderRadius: 2, 
                                    padding: 'auto',
                                    backgroundColor: 'primary.main',
                                    left: '50%',
                                    transform: 'translate(-50%,0%)',
                                }}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Positioner>
            </ThemeProvider>
        );
    }
}

export default ResetPass;