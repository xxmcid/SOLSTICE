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
            password: '',
            confirmPassword: '',
            token: '',
            errMsg: ''
        };

        if (window.location.href.includes('?token='))
            this.setState({token: window.location.href.split('?token=')[1]})

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.state.password !== this.state.confirmPassword)
            return this.setState({errMsg: 'The passwords do not match!'});

        // Clear error message
        this.setState({errMsg: ''});

        let token = '';
        if (window.location.href.includes('?token='))
            token = window.location.href.split('?token=')[1];

        const data = {
            password: this.state.password,
            token: token
        };

        try {
            // Send login to the server.
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/api/reset-password`,
                data
            );

            // Go to the sign in page.
            window.location.href = '/reset-password-success';
        } catch(err) {
            console.log(err);

            if (err?.response?.data?.error)
                this.setState({errMsg: err.response.data.error})
            else 
                this.setState({errMsg: "something went wrong"})
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
                            <TextField
                                type="password" 
                                size="small" 
                                label="New Password" 
                                error={this.state.errMsg !== ''}
                                sx={{ width: '100%', borderRadius: 2 }}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField 
                                type="password" 
                                size="small"
                                label="Confirm New Password" 
                                error={this.state.errMsg !== ''}
                                helperText={this.state.errMsg}
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