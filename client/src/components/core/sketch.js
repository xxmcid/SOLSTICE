// Main Boilerplate for how a generic solar system needs to look like
// All code in here will be from the P5 dependency

// THIS IS NOT A REACT SCRIPT!!!
export default function sketch(p5) {

    // Universal Variables controlling literally space and time
    // Gravitional Constant
    let G = 10;

    // Default Astral bodies
    let defaultSun;
    let planetsArray = [];
    let bodies = [];

    // Setup Variables
    let canvas;
    let width;
    let height;

    // Global State variables passed down from Solstice.js
    let setsizingparams;
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
        // Set sizing function in solstice.js
        setsizingparams = props.setsizingparams;

        if (planetsArray.length > 0)
        {
            // Makes sure that previous state of solar system is reset
            // before adding another set of planets.
            bodies.length = 0;

            for (let i = 0; i < planetsArray.length; i++)
            {
                let name = planetsArray[i]?.name;
                let mass = planetsArray[i]?.mass;
                let moons = planetsArray[i]?.moons;
                let color = planetsArray[i]?.color;
                let distance = planetsArray[i]?.distance;
                let type = planetsArray[i]?.type;
                let id = planetsArray[i]?._id;

                if (type == 'sun')
                {
                    console.log("Sun found in planet list, setting defaultSun");
                    defaultSun = new Body(mass, p5.createVector(0, 0), p5.createVector(0, 0), type, color, name, id);
                    continue;
                }

                // Setting random default planet position
                let radius = distance;
                let theta = p5.random(p5.TWO_PI);
                let randomPos = p5.createVector(radius * p5.cos(theta), radius * p5.sin(theta));

                // Setting velocity vector for planet to travel in.
                let planetVel = randomPos.copy();
                planetVel.rotate(p5.HALF_PI);
                planetVel.setMag(p5.sqrt(G * defaultSun.mass / randomPos.mag() ));

                bodies.push(new Body(mass, randomPos, planetVel, type, color, name, id));

                if (moons.length > 0)
                {
                    bodies[bodies.length - 1].initMoons(moons);
                }
            }

            // Calculate max/min allowed size for planet distance and size (mass).
            const mindist = (defaultSun.mass + 20);
            const maxdist = (height/2);
            const maxsize = defaultSun.mass;
            setsizingparams(mindist, maxdist, maxsize);
        }
    }

    // Sets up our main solar system canvas for drawing
    p5.setup = () => {
        // Update Dimensions based on viewport size.
        updateCanvasDimensions();
        // Create Canvas
        canvas = p5.createCanvas(width, height);
        canvas.parent("canvaswrapper");
    }

    // This function is called repeatedly by P5 to give the illusion of
    // an animation.
    p5.draw = () => {
        // ensure canvas fits window (could be more efficient)
        updateCanvasDimensions();
        p5.resizeCanvas(width, height); 

        p5.translate(width/2, height/2);
        p5.background('black');

        if (bodies.length > 0)
        {
            for (let i = 0; i < bodies.length; i++)
            {
                defaultSun.pulls(bodies[i]);
                bodies[i].refresh();
                bodies[i].reveal();

                // Update each moon
                for (let j = 0; j < bodies[i].moons.length; j++) {
                    bodies[i].moons[j].forceUpdateMoonPosUsingPlanet(bodies[i]);
                    bodies[i].moons[j].reveal();
                }
            }
        }

        defaultSun?.reveal();
    }

    // Generic Function for creating an astral body
    function Body(_mass, _pos, _vel, _type, _fill, _name, _id){

        this.mass = _mass;
        // Mass will be used for size of bodies.
        this.r = this.mass;
        this.pos = _pos;
        this.vel = _vel;
        this.type = _type;
        this.color = _fill;
        this.name = _name;
        this.id = _id;
        this.moons = [];
        this.angle = 0;
        this.moonSpeed = 0.025;

        this.forceUpdateMoonPosUsingPlanet = function(planet) {

            let planetPos = planet.pos.copy();
    
            let radius = 80;
    
            // Set moon position
            let moonPos = p5.createVector(planetPos.x + radius * p5.cos(this.angle), planetPos.y + radius * p5.sin(this.angle));

            this.pos.x = moonPos.x;
            this.pos.y = moonPos.y;

            this.angle += this.moonSpeed;
        }

        // Moon engine setup
        this.initMoons = function(moons) {
        
            for (let i = 0; i < moons.length; i++)
            {
                // Grab all the moon info.
                let radius = moons[i]?.distance;
                let name = moons[i]?.name;
                let color = moons[i]?.color;
                let type = moons[i]?.type;
                let id = moons[i]?.id;

                // Need current planet position to put moon next to it
                let planetPos = this.pos.copy();

                // Initial moon position
                let moonPos = p5.createVector(planetPos.x + radius * p5.cos(this.angle), planetPos.y + radius * p5.sin(this.angle));

                // Initial moon velocity
                let moonVel = moonPos.copy();
                moonVel.rotate(p5.HALF_PI);
                moonVel.setMag(p5.sqrt(G * this.mass / moonPos.mag() ))

                // Create internal P5 object
                let moon = new Body(20, moonPos, moonVel, type, color, name, id)

                // Add moon to 'this' planets moon array.
                this.moons.push(moon);
            }
        }

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

            // Calculates the gravity of the child pulling on the parent body.
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
                const convertedDist = p5.sqrt((this.pos.x * this.pos.x) + (this.pos.y * this.pos.y));
                // Take the ceiling of the number so its rounded.
                const roundedDist = p5.ceil(convertedDist);
                // Update selected planet in solstice.
                setselections(this.name, this.mass, G, roundedDist, this.type, this.color, null, this.id);
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
        for (let i = 0; i < bodies.length; i++)
        {
            bodies[i].clicked();

            for (let j = 0; j < bodies[i].moons.length; j++)
            {
                bodies[i].moons[j].clicked();
            }
        }
        defaultSun.clicked();
    }

    const updateCanvasDimensions = () => {
        // calculate wrapper rect
        const wrapperRect = document.getElementById('canvaswrapper').getBoundingClientRect();

        // get height and width of canvas
        width = wrapperRect.width;
        height = wrapperRect.height
    }
}