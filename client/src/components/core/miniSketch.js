// This is the P5 script for rendering the clicked planet in the side panel.
export default function miniSketch(p5) {

    // Setup Variables
    let canvas;
    let width;
    let height;

    // Planet Cosmetic variables
    let planetMass;
    let planetColor;

    p5.updateWithProps = props => {
        planetMass = props.mass;
        planetColor = props.color;
    }

    p5.setup = () => {

        updateCanvasDimensions();
        
        // create canvas
        canvas = p5.createCanvas(width, height);
        canvas.parent("sideCanvasWrapper");
    }

    p5.draw = () => {

        updateCanvasDimensions();
        p5.resizeCanvas(width, height); 
        p5.translate(width/2, height/2);

        p5.fill(planetColor);
        p5.ellipse(0, 0, planetMass, planetMass);

    }

    const updateCanvasDimensions = () => {
        // calculate wrapper rect
        const wrapperRect = document.getElementById('sideCanvasWrapper').getBoundingClientRect();

        // get height and width of canvas
        width = wrapperRect.width;
        height = wrapperRect.height
    }

}