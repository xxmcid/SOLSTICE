// Base Import
import { React, Component } from 'react';

// Routing Imports
import { Link } from 'react-router-dom';

// Styling Imports
import '../styles/resetpass.css';

// Mui Components
import { ThemeProvider, createTheme, Paper, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';



class ResetPass extends Component
{
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


        return(
            <ThemeProvider theme={theme}>
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