// Base Import
import { React, Component } from 'react';

// Styling Imports
import '../../styles/solstice.css';

// MUI Components
import { Drawer } from '@mui/material';



class SidePanel extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
        };
    }


    render()
    {
        return(
            <Drawer 
                id='sidepanel' 
                open={this.props.open}
                hideBackdrop
                PaperProps={{ 
                    style: { 
                        height: '90vh', 
                        position: 'absolute', 
                        top: '10%', 
                        width: '15%', 
                        opacity: '75%', 
                        backgroundColor: '#323031',
                        color: 'white',
                        borderRadius: 5 } }}>
            </Drawer>
        );
    }
}

export default SidePanel;