// Base Import
import { React, Component } from 'react';
import axios from 'axios';

// Routing Imports


// Styling Imports
import { getTheme } from '../styles/mainTheme';
import '../styles/resetpass.css';

// Mui Components
import { ThemeProvider, Paper, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';

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
            window.location.href = '';
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
                <div id='titlecenterheader'>
                    <div id='resetpagetitle' className='large'>SOLSTICE</div>
                </div>
                <Box sx={{
                    display: 'flex',
                    '& > :not(style)': {
                    m: 1,
                    width: 128,
                    height: 128,
                    },
                }}>
                    <Paper
                        id="resetpasscontainer"
                        variant='outlined'
                        square
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 5
                        }}>
                        <div id="resetpasstitle">Reset Password</div>
                        <div id="instructprompt">Enter a new valid password below.</div>
                        <div id ="resetlabelcontainer">
                        <div  id="resetlabel" className="label">New Password</div>
                        <TextField
                            onChange={(e) => this.setState({ password: e.target.value })}
                            id="passinput" 
                            sx=
                            {{  
                                backgroundColor: 'none',
                                width: 350,
                                borderRadius: 2,
                                marginBottom: '10%'
                            }}
                        />
                        <div id="resetlabel" className="label">Confirm New Password</div>
                        <TextField 
                            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                            id="confirmpassinput" 
                            sx=
                            {{  
                                backgroundColor: 'none',
                                width: 350,
                                borderRadius: 2,
                                marginBottom: '10%'
                            }}
                        />
                        </div>
                        <div id='updatebuttoncontainer'>
                            <Button 
                                variant='contained'
                                size='large'
                                onClick={this.handleSubmit}
                                sx=
                                {{ 
                                    textTransform: 'none',
                                    backgroundColor: 'black',
                                    borderRadius: 5
                                }}>
                                    Update
                            </Button>
                        </div>
                    </Paper>
                </Box>
            </ThemeProvider>
        );
    }
}

export default ResetPass;