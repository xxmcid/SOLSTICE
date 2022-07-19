// Main Boilerplate for how a generic solar system needs to look like
// All code in here will be from the P5 dependency

// THIS IS NOT A REACT SCRIPT!!!
export default function sketch(p5) {

    // Universal Variables controlling literally space and time
    // Gravitional Constant
    let G = 10;
    let numPlanets = 5;

    // Default Astral bodies
    let defaultPlanets = [];
    // let defaultSun = new Body(100, p5.createVector(0, 0), p5.createVector(0, 0), '#f1c232', 'defaultSun');
    let defaultSun;
    let planetsArray = [];
    let bodies = [];

    // Setup Variables
    let canvas;
    let width;
    let height;

    // Global State variables passed down from Solstice.js
    let expandsidepanel;
    let setselections;

    // Wrapper component in Solstice.js passes the planets recieved from
    // database into the global planets array for the canvas renderer.
    // VERY IMPORTANT ** This method is automatically called whenever
    // the props from the parent change OR when the component rerenders.
    p5.updateWithProps = props => { 

        // Link all local states to solstice.js states
        expandsidepanel = props.expandsidepanel;
        // Planets Array also needs to be set up here via props.
        planetsArray = props.planets;
        // Selection states to populate sidepanel when a planet is clicked.
        setselections = props.setselections;

        if (planetsArray.length > 0)
        {
            // Makes sure that previous state of solar system is reset
            bodies.length = 0;

            for (let i = 0; i < planetsArray.length; i++)
            {
                let name = planetsArray[i]?.name;
                let mass = planetsArray[i]?.mass;
                let color = planetsArray[i]?.color;
                let distance = planetsArray[i]?.distance;

                if (name == 'Sun')
                {
                    console.log("Sun found in planet list, setting defaultSun");
                    defaultSun = new Body(mass, p5.createVector(0, 0), p5.createVector(0, 0), color, name);
                    continue;
                }

                // Setting random default planet position
                let radius = distance;
                let theta = p5.random(p5.TWO_PI);
                let randomPos = p5.createVector(radius*p5.cos(theta), radius*p5.sin(theta));

                // Setting velocity vector for planet to travel in.
                let planetVel = randomPos.copy();
                planetVel.rotate(p5.HALF_PI);
                planetVel.setMag(p5.sqrt(G * defaultSun.mass / randomPos.mag() ))

                bodies.push(new Body(mass, randomPos, planetVel, color, name));
            }
        }
    }

    // Sets up our main solar system canvas for drawing
    p5.setup = () => {
        updateCanvasDimensions();
        
        // create canvase
        canvas = p5.createCanvas(width, height);
        canvas.parent("canvaswrapper");
        //OLD
        // for (let i = 0; i < numPlanets; i++)
        // {
        //     // Setting random default planet position
        //     let radius = p5.random(defaultSun.r, p5.min(width/2, height/2));
        //     let theta = p5.random(p5.TWO_PI);
        //     let randomPos = p5.createVector(radius*p5.cos(theta), radius*p5.sin(theta));

        //     // Setting velocity vector for planet to travel in.
        //     let planetVel = randomPos.copy();
        //     planetVel.rotate(p5.HALF_PI);
        //     planetVel.setMag(p5.sqrt(G * defaultSun.mass / randomPos.mag() ))

        //     defaultPlanets.push(new Body(25, randomPos, planetVel, '#f1c232', 'defaultPlanet'));
        // }
    }

    // This function is called repeatedly by P5 to give the illusion of
    // an animation.
    p5.draw = () => {
        // ensure canvas fits window (could be more efficient)
        updateCanvasDimensions();
        p5.resizeCanvas(width, height); 

        p5.translate(width/2, height/2);
        p5.background('black');

        // OLD
        // for (let i = 0; i < defaultPlanets.length; i++) {
        //     defaultSun.pulls(defaultPlanets[i]);
        //     defaultPlanets[i].refresh();
        //     defaultPlanets[i].reveal();
        // }

        if (bodies.length > 0)
        {
            for (let i = 0; i < bodies.length; i++)
            {
                defaultSun.pulls(bodies[i]);
                bodies[i].refresh();
                bodies[i].reveal();
            }

            defaultSun.reveal();
        }
    }

    // Generic Function for creating an astral body
    function Body(_mass, _pos, _vel, _fill, _name){

        this.mass = _mass;
        this.pos = _pos;
        this.vel = _vel;
        this.name = _name;
        // Mass will be used for size of bodies.
        this.r = this.mass;
        this.color = _fill;

        // Actually "paints" our new planet
        this.reveal = function() {
            p5.noStroke();
            p5.fill(this.color);
            p5.ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }

        // Updates the position of a body
        this.refresh = function() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }

        this.pulls = function(child) {

            // Newton's Law of Universal Gravitation
            // Force = (GravitationalConstant) * ( (mass1 * mass2) / (distance between objects)^2 )
            // No joke this is actually being used to calculate the orbit...
            let r = p5.dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);

            // Creates a vector in the direction from child TO sun
            let F = this.pos.copy().sub(child.pos);

            // Calculates the gravity of the child pulling on the sun.
            F.setMag( (G * this.mass * child.mass) / (r * r));

            // Applies gravity FROM CHILD TO SUN
            child.applyGravity(F);
        }

        // Takes in the force calculated in the pulls function.
        this.applyGravity = function(F) {

            // Force = Mass * Acceleration
            // Therefore, Acceleration = Force / Mass
            this.vel.x += F.x / this.mass;
            this.vel.y += F.y / this.mass;
        }

        // Click Handler for planets
        this.clicked = function()
        {
            let xOffset = p5.mouseX - (width / 2);
            let yOffset = p5.mouseY - (height / 2);
            let d = p5.dist(xOffset, yOffset, this.pos.x, this.pos.y)
            if (d < this.r)
            {
                // Applying pythagorean theorem to get straight-line distance.
                let convertedDist = p5.sqrt((this.pos.x * this.pos.x) + (this.pos.y * this.pos.y));
                setselections(this.name, this.mass, G, convertedDist, this.color, null);
            }
        }

    }

    // P5 Function that detects a mouse press GLOBALLY
    // It's up to us to decide what to do with each INSTANCE
    // of a planet. That's why this global function calls
    // another function inside of the body object
    p5.mousePressed = function() {
        // This for loop goes through all the planets
        // and checks where the mouse was clicked and which
        // planet the x and y coordinates are within bounds.
        
        // OLD
        // for (let i = 0; i < defaultPlanets.length; i++)
        // {
        //     defaultPlanets[i].clicked();
        //     defaultSun.clicked();
        // }
        for (let i = 0; i < bodies.length; i++)
        {
            bodies[i].clicked();
        }
        defaultSun.clicked();
    }

    const updateCanvasDimensions = () => {
        // calculate wrapper rect
        const wrapperRect = document.getElementById('canvaswrapper').getBoundingClientRect();

        // get height and width of canvase
        width = wrapperRect.width;
        height = wrapperRect.height
    }
}