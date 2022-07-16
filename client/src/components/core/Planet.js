// This is the structure for a basic planet.
var Planet = function(_name, _mass, _gravitationalPull, _distance, _color, _moons) 
{
    this.name = _name;
    this.mass = _mass;
    this.gravity = _gravitationalPull;
    this.distance = _distance;
    this.color = _color;
    this.moons = _moons;
}

export default Planet;