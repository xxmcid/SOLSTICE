// Base Import
import { React, Component } from 'react';

// Image 
import image from '../../assets/PixelSolarSystem.jpg'

// MUI Components
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

class SolarSystemBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditingName: false,
      solarSystemName: ""
    }
  }

  handleClick() {
    this.props.switchSolarSystem();
  }

  editName(e) {
    e.stopPropagation()

    if (!this.state.isEditingName) {
      this.setState({
        isEditingName: true,
      })
    } else {
      this.setState({
        isEditingName: false,
      })

      if (this.state.solarSystemName && this.state.solarSystemName !== this.props.systemName) {
        console.log(this.state.solarSystemName)
        this.props.changeSolarSystemName(this.state.solarSystemName);
      }
    }
  }

  removeSolarSystem(e) {
    e.stopPropagation()

    this.props.removeSolarSystem();
  }

  render() {
    return(
      <Button
        variant={'contained'} 
        disableRipple={true}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onClick={this.handleClick.bind(this)}
        sx={{
          width: this.state.isEditingName ? '170px' : '150px',
          height: this.props.isExpanded ? '140px' : '28px', 
          boxShadow: this.props.isExpanded ? '' : 'none', 
          backgroundColor: "background.default",
          transition: 'all .2s ease-in-out'
        }}
      >
        {
          <Box sx={{
            width: "100%",
            height: this.props.isExpanded ? '132px' : '20px',
            transition: 'all .2s ease-in-out',
          }}>
            {(this.state.isEditingName && this.props.isExpanded) ?
              <TextField 
                size={'small'} 
                variant={'standard'} 
                autoFocus={true}
                defaultValue={this.props.systemName}
                onChange={e => this.setState({solarSystemName: e.target.value})}
                sx={{height: '30px', fontSize: '12px'}} 
              /> :
              <Typography variant={'body2'} sx={{
                height: this.props.isExpanded ? '30px' : '20xp',
                lineHeight: this.props.isExpanded ? '30px' : '20xp',
                transition: 'all .2s ease-in-out',
              }}>
                {this.props.systemName}
              </Typography>
            }
            <Box sx={{
              overflow: 'hidden',
              borderRadius: '4px',
              width: '100%',
              height: this.props.isExpanded ? '52px' : '0px',
              marginTop: this.props.isExpanded ? '4px' : '0px',
              marginBottom: this.props.isExpanded ? '4px' : '0px',
              opacity: this.props.isExpanded ? 1 : 0,
              transition: 'all .2s ease-in-out',
            }}>
              <img src={image} height={'100%'} width={'100%'}/>
            </Box>
            <ButtonGroup sx={{
              width: '100%',
              height: this.props.isExpanded ? '24px' : '0px',
              marginTop: this.props.isExpanded ? '4px' : '0px',
              marginBottom: this.props.isExpanded ? '4px' : '0px',
              opacity: this.props.isExpanded ? 1 : 0,
              transition: 'all .2s ease-in-out',
            }}>
              <Button 
                color={'error'} 
                onClick={e => this.removeSolarSystem(e)} 
                disableRipple={true}
              >
                remove
              </Button>
              <Button 
                color={'success'} 
                onClick={e => this.editName(e)}
                disableRipple={true}
              >
                {this.state.isEditingName ? "save" : "edit"}
              </Button>
            </ButtonGroup>
          </Box >
        }
      </Button>
    );
  }
}

export default SolarSystemBtn;