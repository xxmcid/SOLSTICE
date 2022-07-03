// Main Boilerplate for how a generic solar system needs to look like
// All code in here will be from the P5 dependency

// THIS IS THE ONLY FUNCTIONAL COMPONENT IN OUR APP!
export default function sketch(p)
{
    let canvas;
    var width = document.getElementById('canvaswrapper').clientWidth;
    var height = document.getElementById('canvaswrapper').clientHeight;

    // Sets up our main solar system canvas for drawing
    p.setup = () => {
        canvas = p.createCanvas(width, height);
        canvas.parent("canvaswrapper");
        p.noStroke();
    }

    // This function is called repeatedly by P5 to give the illusion of
    // an animation.
    p.draw = () => {
        p.background('black');
        p.ellipse(150, 100, 100, 100);
    }

    // p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    //   if(canvas) //Make sure the canvas has been created
    //     p.fill(newProps.color);
    // }
}