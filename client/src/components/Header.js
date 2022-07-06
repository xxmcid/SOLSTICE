// Base Import
import { React, Component } from 'react';

// MUI Components
import InfoIcon from '@mui/icons-material/Info';
import { Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import Clock from '../components/Clock';
import Info from './Info';
import { getTheme } from '../styles/mainTheme';

class Header extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            infopagevisible: false
        };

        this.toggleInfoPage = this.toggleInfoPage.bind(this);
    }

    theme = getTheme();

    toggleInfoPage() {
        console.log("Info page visible: " + !this.state.infopagevisible);

        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    render() {
        return(
            <ThemeProvider theme={this.theme}>
                <Grid container 
                    paddingLeft={2}
                    paddingRight={2}
                    height={56}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    columns={{ xs: 4, sm: 8}}
                >
                    {
                        // Info panel: only shown when toggled
                        this.state.infopagevisible ? <Info onClose={this.toggleInfoPage}/> : null 
                    }

                    <Grid item xs={2}>
                        <Typography color={'white'} fontWeight={'bold'} variant="h4">
                            SOLSTICE
                        </Typography>
                    </Grid>

                    <Grid item xs={4} sx={{[this.theme.breakpoints.down('sm')]: {'display': 'none'}}}>
                        <Clock />
                    </Grid>

                    <Grid item xs={2} alignContent={'center'}>
                        <IconButton sx={{ float: 'right' }} size={'large'}
                            onClick={this.toggleInfoPage}>
                            <InfoIcon fontSize='inherit' color={'action'}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default Header;