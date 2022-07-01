// Base Import
import { React, Component } from 'react';

// Styling Imports

// Custom Components
import Header from '../components/Header';


class Solstice extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            infopagevisible: false
        };
    }

    setvisibility()
    {
        console.log("Info page visible: " + !this.state.infopagevisible);
        this.setState({
            infopagevisible: !this.state.infopagevisible
        });
    }

    render()
    {
        return(
            <Header onClick={ this.setvisibility.bind(this) }/>
        );
    }
}