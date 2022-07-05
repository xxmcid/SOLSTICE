// Main Boilerplate for how a generic solar system needs to look like
// All code in here will be from the P5 dependency

// THIS IS THE ONLY FUNCTIONAL COMPONENT IN OUR APP!
export default function sketch(p)
{
    // Universal Variables controlling literally space and time
    // Gravitional Constant
    let G = 10;

    // Default Astral bodies
    let defaultSun;
    let defaultPlanet;

    // Setup Variables
    let canvas;
    var width = document.getElementById('canvaswrapper').clientWidth;
    const height = document.getElementById('canvaswrapper').clientHeight;

    // Sets up our main solar system canvas for drawing
    p.setup = () => {
        canvas = p.createCanvas(width, height);
        canvas.parent("canvaswrapper");
        defaultSun = new Body(100, p.createVector(0, 0), p.createVector(0, 0), p.color(255, 204, 0));

        // Setting random default planet position
        let radius = p.random(defaultSun.r, p.min(width/2, height/2));
        let theta = p.random(p.TWO_PI);
        let randomPos = p.createVector(radius*p.cos(theta), radius*p.sin(theta));

        // Setting velocity vector for planet to travel in.
        let planetVel = randomPos.copy();
        planetVel.rotate(p.HALF_PI);
        planetVel.setMag(p.sqrt(G * defaultSun.mass / randomPos.mag() ))

        defaultPlanet = new Body(25, randomPos, planetVel, p.color(255, 204, 0));
    }

    // This function is called repeatedly by P5 to give the illusion of
    // an animation.
    p.draw = () => {

        p.translate(width/2, height/2);
        p.background('black');

        defaultSun.pulls(defaultPlanet);
        defaultPlanet.refresh();
        defaultPlanet.reveal();
        defaultSun.reveal();
    }

    // Generic Function for creating an astral body
    function Body(_mass, _pos, _vel, _fill){

        this.mass = _mass;
        this.pos = _pos;
        this.vel = _vel;
        // Mass will be used for size of bodies.
        this.r = this.mass;

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
    }

    // p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    //   if(canvas) //Make sure the canvas has been created
    //     p.fill(newProps.color);
    // }
}