window.chosen_colors = {
  main: [0,255,255],
  accent: [255,0,0],
  skin: [200,150,100],
  hair: [200,200,128],
  eye: [0,0,255]
}
var canvas = document.getElementById('portrait'),
context = canvas.getContext('2d');
let body_parts = []
load_body_parts();
draw_loop = setInterval(function(){draw_portrait(body_parts)},15)
breath_loop = setInterval(function(){breath(body_parts)},15);

function breath(body_parts){
  body_parts = body_parts.map(function (part){
    if(part.animation){
      part.animation.t += part.animation.t_step;
      if(part.animation.t > part.animation.duration)
      {
        part.animation.t = part.animation.duration;
        part.animation.t_step = -part.animation.t_step;
      }
      if(part.animation.t < 0)
      {
        part.animation.t = 0;
        part.animation.t_step = -part.animation.t_step;
      }
      part.off_x = (part.animation.t / part.animation.duration) * part.animation.dx;
      part.off_y = (part.animation.t / part.animation.duration) * part.animation.dy;
    } 
    return part
  })
}

function reset()
{
  clearInterval(draw_loop)
  clearInterval(breath_loop)
  body_parts = [];
  load_body_parts();
  draw_loop = setInterval(function(){draw_portrait(body_parts)},15)
  breath_loop = setInterval(function(){breath(body_parts)},15)
}

function tint(target,hex)
{
  var c = hex.replace('#','');
  var	r = parseInt(c.substring(0,2), 16);
  var	g = parseInt(c.substring(2,4), 16);
  var	b = parseInt(c.substring(4,6), 16);
  var targetRGB = [+r, +g, +b];	

  window.chosen_colors[target] = targetRGB;
  console.log("TINTED " + target + " to " + hex)
  reset()
}

function load_body_parts()
{
  let result = []
  let body_part_list = [
    "Torso_Lower",
    "Torso_Upper",
    "Leg_Left",
    "Leg_Right",
    "Arm_Left",
    "Arm_Right",
    "Arm_Right_Forearm",
    "Head",
    "Hair_Front"
  ];
  let i = 0;
  body_part_list.forEach(function(part, idx) {
    let tag = part;
    let base_image = new Image();
    base_image.src="/assets/CharGenGame/assets/"+part+".png"
    let z = i + 0;
    base_image.onload = function(){
      base_image = colorize(base_image, "#FFFFFF", part);
      obj = { tag: part, image: base_image, x: 0, y: 0, w: 322, h: 600, z: idx, off_x: 0, off_y: 0}
      if(tag == "Torso_Upper")
      {
        obj.animation = { t: 0, t_step: 15, duration: 500, off_x: 0, off_y: 0, dx: 0, dy: -3}
      }
      if(tag == "Torso_Lower")
      {
        obj.animation = { t: 0, t_step: 15, duration: 500, off_x: 0, off_y: 0, dx: 0, dy: 0}
      }
      if(tag == "Hair_Front")
      {
        obj.animation = { t: 0, t_step: 15, duration: 500, off_x: 0, off_y: 0, dx: 0, dy: -6}
      }
      if(tag == "Head")
      {
        obj.animation = { t: 0, t_step: 15, duration: 500, off_x: 0, off_y: 0, dx: 0, dy: -4}
      }
      if(tag == "Arm_Left" || tag == "Arm_Right" || tag == "Arm_Right_Forearm")
      {
        obj.animation = { t: 0, t_step: 15, duration: 500, off_x: 0, off_y: 0, dx: 0, dy: -2}
      }
      if(tag == "Leg_Left")
      {
        obj.animation = { t: 0, t_step: 15, duration: 500, off_x: 0, off_y: 0, dx: 2, dy: 0}
      }
      body_parts.push(obj);
      base_image.onload = null;
    }
    i++;
  })
}

function draw_portrait(body_parts)
{
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle="rgb(128,128,128)"
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle="rgb(255,255,255)"
  context.globalCompositeOperation = "source-over";
  body_parts.sort((a,b) => a.z > b.z ? 1 : -1)
  body_parts.forEach(function(part){
    let scale = 1.0
    context.drawImage(part.image, part.x, part.y, part.w, part.h, 0+part.off_x, 40+part.off_y, part.w * scale, part.h * scale);
  })
}

function colorize(base_image, hex, tag) {
  
    // Turn the Hex value supplied by our intrepid developer into an RGB value
    var c = hex.replace('#','');
    var	r = parseInt(c.substring(0,2), 16);
    var	g = parseInt(c.substring(2,4), 16);
    var	b = parseInt(c.substring(4,6), 16);
    var targetRGB = [+r, +g, +b];	

    // Create an invisible canvas element to do our wicked work
    var e = document.getElementById("colorizeThe"+tag)
    var canvas = e ? e : document.createElement('canvas')
    canvas.id     = "colorizeThe"+tag;
    canvas.width  = base_image.width; 
    canvas.height = base_image.height;
    var context = canvas.getContext('2d');
    context.drawImage(base_image, 0, 0);				//draw the image in our temporary canvas
    document.body.append(canvas)

    // for each pixel...
    var imgData=context.getImageData(0,0,canvas.width,canvas.height);
    var hue_bins = {}
    for (var i=0;i<imgData.data.length;i+=4) { // each pixel's value serialized as r g b a  

      //...figure out the material, extract it, and then grayscale it
      var r = imgData.data[i];
      var g = imgData.data[i+1];
      var b = imgData.data[i+2];
      var hsl = rgbToHsl(r,g,b)
      var h = hsl[0];
      var s = hsl[1];
      var l = hsl[2];

      var color_to_use = [255,255,255];
      var x = h*360 //hue in degrees 0-360
      if( Math.abs(x-0) < 5) //Accent Color
      {
        color_to_use = [255,0,0];
        color_to_use = window.chosen_colors['accent']
      }
      if( Math.abs(x-50) < 5) //Hair Color
      {
        color_to_use = [216,200,100];
        color_to_use = window.chosen_colors['hair']
      }
      if( Math.abs(x-123) < 5) //Main Color
      {
        color_to_use = [200,200,255];
        color_to_use = window.chosen_colors['main']
      }
      if( Math.abs(x-17) < 5) //Skin Color
      {
        color_to_use = [180,125,125];
        color_to_use = window.chosen_colors['skin']
      }
      if( Math.abs(x-224) < 5) //Eye Color
      {
        color_to_use = [0,0,255];
        color_to_use = window.chosen_colors['eye']
      }

      //...then apply desired tint
      var average =  (imgData.data[i] +  imgData.data[i+1] +  imgData.data[i+2]) /3; // get the grayscale value		
      
      var rcurve = (average*2) - (255-color_to_use[0]);	// this turns grayscale into nice saturated colors
      var gcurve = (average*2) - (255-color_to_use[1]);	// without white getting darkened to the target color
      var bcurve = (average*2) - (255-color_to_use[2]);	// unlike most other color-tint js stuff 
                                                        
      imgData.data[i]=rcurve; 						//red
      imgData.data[i+1]=gcurve; 						//green
      imgData.data[i+2]=bcurve; 						//blue
    }
      
    context.putImageData(imgData,0,0); 					//draws the new pixels onto the canvas
    
    var url = canvas.toDataURL(); 						//turns the canvas into a data url
    
    base_image.src = url; 									//and puts it back into the original html img
    return base_image;
}

// rgb:char -> hsl:float
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

// hsl:float -> rgb:char
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
