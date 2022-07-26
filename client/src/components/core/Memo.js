import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

// Styling Imports
import { getTheme } from '../../styles/mainTheme';

// Mui Components
import { ThemeProvider, TextField, Button, Typography, Grid } from '@mui/material';
import Positioner from '../Positioner';

// P5 Core
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from './sketch';

function Memo(props) {
    const [hasLoaded, setHasLoaded] = useState(false)

    return (
        <div id="canvaswrapper">
            {!hasLoaded && (<ThemeProvider theme={getTheme()}>
                <Positioner color='text.primary' backgroundColor='background.paper' borderRadius={2} isLoadingScreen={true}>
                    <Grid container columns={4} rowSpacing={2} columnSpacing={2} padding='24px'>
                        <Grid item xs={4}>
                            <Typography sx={{marginBottom: "10px"}} align='center' fontWeight={'bold'} variant="h4">Loading</Typography>
                            <LoadingSpinner />
                        </Grid>
                    </Grid>
                </Positioner>
            </ThemeProvider>)}

            <ReactP5Wrapper 
                sketch={sketch} 
                planets={props.planets}
                selectedSolarSystemId={props.selectedSolarSystemId}
                setsizingparams={props.setsizingparams}
                setselections={props.setselections}
                setHasLoaded={setHasLoaded}
            ></ReactP5Wrapper>
        </div>
    )
}

function areEqual(prevProps, nextProps) 
{
    return (prevProps.planets == nextProps.planets);
}

export default React.memo(Memo, areEqual);