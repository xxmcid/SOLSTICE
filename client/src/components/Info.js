// Base Import
import { React, Component } from "react";

// Styling Imports
import { getTheme } from "../styles/mainTheme";
import '../styles/info.css';

// MUI Components
import { Paper, Divider, IconButton, Typography, Grid, ThemeProvider, Box } from "@mui/material";
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

    render() {
        return(
            <ThemeProvider theme={getTheme()}>
                <Box 
                    id="infoContainer"
                    sx={{
                    backgroundColor: 'rgb(0, 0, 0, .8)',
                    position: "fixed",
                    zIndex: 1,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: "100px",
                    width: 'calc(100% - 200px)', // sub for padding
                    height: 'calc(100% - 200px)', // sub for padding
                    [getTheme().breakpoints.down('sm')]: {
                        padding: "20px",
                        width: 'calc(100% - 40px)', // sub for padding
                        height: 'calc(100% - 40px)', // sub for padding
                    }
                }}>
                    <Paper 
                        color={'text.contrast'} 
                        backgroundColor={'background.default'}
                        sx={{
                            width: "calc(100% - 48px)", // sub for padding
                            height: "calc(100% - 48px)", // sub for padding
                            padding: '24px'
                        }}
                    >
                        <Grid container alignItems="top">
                            <Grid item xs>
                                <Typography lineHeight={'3rem'} variant="h3">About</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton id='closebutton' 
                                    onClick={this.props.onClose}
                                    color="error"
                                    sx={{
                                        borderRadius: 2,
                                        height: 'fit-content',
                                        width: 'fit-content',
                                        float: 'right',
                                    }}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>                    
                        </Grid>

                        <Divider backgroundColor={'primary.contrastText'} sx= {{ marginTop: 1, marginBottom: 1 }}/>

                        <Typography variant="h5">
                            Graphics
                        </Typography>

                        <Typography>
                            Background by <a target="_blank" href="https://www.artstation.com/artwork/8ePZ8O">ArtStation</a>.
                        </Typography>

                        <Typography>
                            React components made using <a target="_blank" href="https://mui.com/">Material UI</a>.
                        </Typography>
                    </Paper>
                </Box>
            </ThemeProvider>
        );
    }
}

export default Info