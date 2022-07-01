// Base Import
import { React, Component } from "react";

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
        return(
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
        );
    }
}

export default Info