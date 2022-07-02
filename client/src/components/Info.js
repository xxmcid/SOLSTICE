// Base Import
import { React, Component } from "react";

// Styling Imports

// MUI Components
import { Paper, Divider, IconButton, Typography, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// Style
import { mainTheme } from "../mainTheme";

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
        return(
            <Paper id='infoContainer' variant="outlined" square 
                sx={{ 
                    padding: 3,
                    borderRadius: 5, 
                    backgroundColor: mainTheme.palette.primary.main,
                    color: mainTheme.palette.primary.contrastText,
                }}>

                <Grid container alignItems="top">
                    <Grid item xs>
                        <Typography variant="h3">About</Typography>
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

                <Divider color={mainTheme.palette.primary.contrastText} sx= {{ marginTop: 1, marginBottom: 1 }}/>

                <Typography variant="h5">
                    Graphics
                </Typography>

                <Typography>
                    Background by Material UI, protected by Creative Commons.
                </Typography>
            </Paper>
        );
    }
}

export default Info