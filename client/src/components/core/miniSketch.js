import earthTex from '../../assets/Earth.gif';
import dryTex from '../../assets/Dry.gif';
import GasTex from '../../assets/Gas.gif';
import GasTex2 from '../../assets/Gas2.gif';
import iceTex from '../../assets/Ice.gif';
import moonTex from '../../assets/Moon.gif';
import waterTex from '../../assets/Water.gif';
import sunTex from '../../assets/Sun.gif';
import background from '../../assets/Background.png';
import blackholeTex from '../../assets/Blackhole.gif';

const textureMap = new Map();
// This is the P5 script for rendering the clicked planet in the side panel.
export default function miniSketch(p5) {

    // Setup Variables
    let canvas;
    let width;
    let height;

    // Planet Cosmetic variables
    let planetMass;
    let planetColor;
    let planetTexturePreset;

    p5.preload = () => {
        if (!textureMap.has('earth'))
            textureMap.set('earth', p5.loadImage(earthTex));
        if (!textureMap.has('dry'))
            textureMap.set('dry', p5.loadImage(dryTex));
        if (!textureMap.has('gas1'))
            textureMap.set('gas1', p5.loadImage(GasTex));
        if (!textureMap.has('gas2'))
            textureMap.set('gas2', p5.loadImage(GasTex2));
        if (!textureMap.has('ice'))
            textureMap.set('ice', p5.loadImage(iceTex));
        if (!textureMap.has('water'))
            textureMap.set('water', p5.loadImage(waterTex));
        if (!textureMap.has('moon'))
            textureMap.set('moon', p5.loadImage(moonTex));
        if (!textureMap.has('sun'))
            textureMap.set('sun', p5.loadImage(sunTex));
        if (!textureMap.has('background'))
            textureMap.set('background', p5.loadImage(background));
        if (!textureMap.has('blackhole'))
            textureMap.set('blackhole', p5.loadImage(blackholeTex));
    }

    p5.updateWithProps = props => {
        planetMass = props.mass;
        planetColor = props.color;
        planetTexturePreset = props.texturePreset;
    }

    p5.setup = () => {

        updateCanvasDimensions();
        
        // create canvas
        canvas = p5.createCanvas(width, height, p5.WEBGL);
        canvas.parent("sideCanvasWrapper");
    }

    p5.draw = () => {

        updateCanvasDimensions();
        p5.resizeCanvas(width, height);
        p5.clear();

        p5.beginShape();
        p5.texture(textureMap.get('background'));
        p5.rect(-width/2, -height/2, width, height);
        p5.endShape();


        p5.texture(textureMap.get(planetTexturePreset));
        let c = hexToRgbA(planetColor || '#FFFFFF');
        p5.tint(c.r, c.g, c.b);
        p5.ellipse(0, 0, planetMass, planetMass);

    }

    // This should really be added to a library, since it's also used in sketch.js
    const hexToRgbA = (hex) => {
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            let color = {};
            color.r = (c>>16)&255;
            color.g = (c>>8)&255;
            color.b = c&255;
            //return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
            return color;
        }
        let color = {}
        color.r = 0;
        color.g = 0;
        color.b = 0;
        return color;
    }

    const updateCanvasDimensions = () => {
        // calculate wrapper rect
        const wrapperRect = document.getElementById('sideCanvasWrapper').getBoundingClientRect();

        // get height and width of canvas
        width = wrapperRect.width;
        height = wrapperRect.height
    }

}