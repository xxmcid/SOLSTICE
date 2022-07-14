// Base Import
import { React, Component } from 'react';

// MUI Components
import { Grid, Typography } from '@mui/material';

export default class TitleHeader extends Component {
  render() {
    return(
      <Grid container height={56 * 3} justifyContent={'space-around'} alignItems={'center'}>
        <Grid item>
          <Typography color={'white'} fontWeight={'bold'} variant="h2">
            SOLSTICE
          </Typography>
        </Grid>
      </Grid>
    );
  }
}