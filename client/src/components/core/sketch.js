// Main Boilerplate for how a generic solar system needs to look like
// All code in here will be from the P5 dependency

// THIS IS NOT A REACT SCRIPT!!!
export default function sketch(p)
{
    // Universal Variables controlling literally space and time
    // Gravitional Constant
    let G = 10;
    let numPlanets = 5;

    // Default Astral bodies
    let defaultSun;
    let defaultPlanets = [];

    // Setup Variables
    let canvas;
    var width = document.getElementById('canvaswrapper').clientWidth;
    const height = document.getElementById('canvaswrapper').clientHeight;

    // Sets up our main solar system canvas for drawing
    p.setup = () => {
        canvas = p.createCanvas(width, height);
        canvas.parent("canvaswrapper");

        defaultSun = new Body(100, p.createVector(0, 0), p.createVector(0, 0), p.color(255, 204, 0), 'defaultSun');

        for (let i = 0; i < numPlanets; i++)
        {
            // Setting random default planet position
            let radius = p.random(defaultSun.r, p.min(width/2, height/2));
            let theta = p.random(p.TWO_PI);
            let randomPos = p.createVector(radius*p.cos(theta), radius*p.sin(theta));

            // Setting velocity vector for planet to travel in.
            let planetVel = randomPos.copy();
            planetVel.rotate(p.HALF_PI);
            planetVel.setMag(p.sqrt(G * defaultSun.mass / randomPos.mag() ))

            defaultPlanets.push(new Body(25, randomPos, planetVel, p.color(255, 204, 0), 'defaultPlanet'));
        }
    }

    // This function is called repeatedly by P5 to give the illusion of
    // an animation.
    p.draw = () => {

        p.translate(width/2, height/2);
        p.background('black');
        for (let i = 0; i < defaultPlanets.length; i++)
        {
            defaultSun.pulls(defaultPlanets[i]);
            defaultPlanets[i].refresh();
            defaultPlanets[i].reveal();
        }
        defaultSun.reveal();
    }

    // Generic Function for creating an astral body
    function Body(_mass, _pos, _vel, _fill, _name){

        this.mass = _mass;
        this.pos = _pos;
        this.vel = _vel;
        this.name = _name;
        // Mass will be used for size of bodies.
        this.r = this.mass;

        // Actually "paints" our new planet
        this.reveal = function() {
            p.noStroke();
            p.fill(_fill);
            p.ellipse(this.pos.x, this.pos.y, this.r, this.r);
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
            let r = p.dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);

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
            let xOffset = p.mouseX - (width / 2);
            let yOffset = p.mouseY - (height / 2);
            let d = p.dist(xOffset, yOffset, this.pos.x, this.pos.y)
            if (d < this.r)
            {
                console.log("Clicked on astral body!");
            }
        }

    }

    // P5 Function that detects a mouse press GLOBALLY
    // It's up to us to decide what to do with each INSTANCE
    // of a planet. That's why this global function calls
    // another function inside of the body object
    p.mousePressed = function() {
        // This for loop goes through all the planets
        // and checks where the mouse was clicked and which
        // planet the x and y coordinates are within bounds.
        for (let i = 0; i < defaultPlanets.length; i++)
        {
            defaultPlanets[i].clicked();
            defaultSun.clicked();
        }
    }

    // Wrapper component in Solstice.js passes the planets recieved from
    // database into the global planets array for the canvas renderer.
    // VERY IMPORTANT ** This method is automatically called whenever
    // the props from the parent change OR when the component rerenders.
    p.updateWithProps = props => {
        defaultPlanets = props.planets;
    }
}