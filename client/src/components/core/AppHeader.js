// Base Import
import { React, Component } from 'react';

// MUI Components
import { Button, Grid, IconButton, ThemeProvider, Typography } from '@mui/material';
import Info from '../Info';
import { getTheme } from '../../styles/mainTheme';
import SolarSystemBtn from './SolarSystemBtn';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

class AppHeader extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            infopagevisible: false
        };

        this.toggleInfoPage = this.toggleInfoPage.bind(this);
        this.switchSolarSystem = this.switchSolarSystem.bind(this);
    }

    theme = getTheme();

    toggleInfoPage() {
        console.log("Info page visible: " + !this.state.infopagevisible);

        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    switchSolarSystem(index) {
        this.props.switchSolarSystem(index);
    }

    render() {
        return(
            <ThemeProvider theme={this.theme}>
                <Grid container 
                    paddingX={2}
                    paddingY={1}
                    backgroundColor={'background.dark'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    columns={{ xs: 4, sm: 8}}
                    position={'fixed'}
                    zIndex={1201}
                >
                    {
                        // Info panel: only shown when toggled
                        this.state.infopagevisible ? <Info onClose={this.toggleInfoPage}/> : null 
                    }

                    <Grid item xs={1}>
                        <Typography color={'white'} fontWeight={'bold'} variant="h4" lineHeight={'30px'}>
                            SOLSTICE
                        </Typography>
                    </Grid>

                    <Grid item container xs={6} sx={2} justifyContent={'center'} columnSpacing={2} rowSpacing={2}>
                        {
                            this.props.solarSystems.map((ss) => 
                                <Grid item>
                                    <SolarSystemBtn 
                                        systemName={ss.name} 
                                        switchSolarSystem={() => this.switchSolarSystem(ss._id)}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>

                    <Grid item xs={1} alignContent={'center'}>
                        <IconButton sx={{ float: 'right' }} size={'medium'} onClick={this.toggleInfoPage}>
                            <FontAwesomeIcon icon={faGear}/>
                        </IconButton>
                        <IconButton sx={{ float: 'right' }} size={'medium'}>
                            <FontAwesomeIcon icon={faAngleDoubleDown}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default AppHeader;