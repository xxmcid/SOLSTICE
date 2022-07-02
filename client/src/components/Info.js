// Base Import
import { React, Component } from "react";

// Styling Imports
import { ThemeProvider, createTheme } from '@mui/material';

// MUI Components
import { Paper, Button, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


class Info extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            infopageHandler: this.props.onClick
        }
    }

    render()
    {
        const theme = createTheme(
            {
              palette: 
              {
                // Dark Mode Palette
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
                <Paper
                    id='infoContainer'
                    variant="outlined"
                    square 
                    sx=
                    {{ 
                        backgroundColor: 'white',
                        borderRadius: 5
                    }}>
                    <div id='infoheader'>
                        About
                        <Button 
                            id='closebutton' 
                            variant='contained'
                            onClick={this.state.infopageHandler}
                            sx=
                            {{
                                height: 'fit-content',
                                borderRadius: 7
                            }}>
                            <CloseIcon />
                        </Button>
                    </div>
                    <Divider 
                        variant='middle'
                        sx=
                        {{
                            borderBottomWidth: 5,
                            backgroundColor: 'black',
                            marginLeft: 6,
                            marginRight: 5 
                        }}/>
                    <div id='infobody'>
                        <br />
                        Graphics
                        <br />
                        Background by Material UI, protected by Creative Commons.
                    </div>
                </Paper>
            </ThemeProvider>
        );
    }
}

export default Info