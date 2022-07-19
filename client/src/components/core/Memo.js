import React from "react";

//P5 Core
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from './sketch';

function Memo(props) {
    return(
        <div id="canvaswrapper">
            <ReactP5Wrapper 
                sketch={sketch} 
                planets={props.planets}
                setsizingparams={props.setsizingparams}
                setselections={props.setselections}
            ></ReactP5Wrapper>
        </div>
    )
}

function areEqual(prevProps, nextProps) 
{
    return (prevProps.planets == nextProps.planets);
}

export default React.memo(Memo, areEqual);