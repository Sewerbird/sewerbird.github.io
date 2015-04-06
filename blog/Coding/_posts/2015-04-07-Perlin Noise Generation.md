---
layout: post
date: '2015-04-07T01:13:00.000+08:00'
title: Perlin Planet Production
tagline: Hills are Alive
featured: 1
---

Arbitrary planetary maps of imaginary worlds - simple as static!

##Development##

Wanting to acquaint myself better with terrain generation, I quickly found myself wanting to create a whole world map. There is a lot of room for tinkering with such a thing, such as modelling plate tectonics, erosion, and climate - and I certainly will be returning to such exercises. But for now I simply wanted something that would churn out a convincing enough heightmap of a terran planetoid, using [perlin noise](http://en.wikipedia.org/wiki/Perlin_Noise). Here is a snapshot of what I eventually got going (interactive demo at the bottom though, so read through!):

<canvas id="snapshot" width="600" height="300"></canvas>

###Starting Out###

The first thing I did was find a noise library for javascript: I'm not so concerned with reinventing the wheel! Towards this end, I found the lovely [Noise.js](https://github.com/josephg/noisejs) library - it provides two and three-dimensional noise functions in simplex and Perlin varieties. That's the annoying bit done!

###Getting Static###

Sitting down, I immediately realized I wanted to avoid as much cartographic math as possible. You see, the simplest way to generate random terrain would be to create a rectangle of noise and project it onto a sphere. However, this would cause unsightly distortions on the sphere, particularly a 'pinch' at the poles. This is related to the cartographical dilemma implied by the [Theorema Egregium](http://en.wikipedia.org/wiki/Theorema_Egregium).

Projecting things is super annoying and un-fun, so I had to consider a different approach. Seeing that Noise.js supplied a three-dimensional noise function, a thought occurred to me: what would I do with a cube of Perlin noise?

- Imagine a cube of Perlin Noise
- Any point in this space will have a noise gradient that is a-ok for me to use
- Choose a point in the middle of the cube: let this be the center of the planet
- Choose a radius for the planet
- Having this, any point `radius` meters from the center point lies on the surface of the planet
- Any such point has a suitable noise gradient, since it is a subset of all points in the cube!

This is wonderful! I can now generate the planet's surface in 3d, rather than futz around plastering 2d noise on a sphere. However, I still need to show you a pretty 2-dimensional image in this web browser, so we've another step to go.

###The Projection###

The first thing I do is to choose the map projection I will display the map with: the [Equirectangular/Plate Carée](http://en.wikipedia.org/wiki/Equirectangular_projection). This is done deliberately to make my life easier: the transformation from cartographical coordinates to pixel coordinates is incredibly simple, and the result is a rectangle that fills up the canvas entirely. The reason it is useful for the map to fill the canvas entirely is so that I can simply go over every pixel in the canvas and query the 3d noise for the terrain information: when the canvas is full, I know I'm done!

Here are the relevant transformations:

{% highlight javascript %}
//Convert a pixel {x,y} to a coordinate {latitude, longitude}
function pxCoordToLatLng(x,y,width,height){
	//assumes width = 2 * height
	return {
		lat : Math.PI * ((y - (height/2)) / height),
		lon : Math.PI*2 * ((x - (width/2)) / width)
	}
}
//Convert a coordinate {latitude, longitude} to a position in 3-space {x,y,z}
function latLngTo3D(lat,lon,rad,alt)
{
	f  = 0 //flattening
	ls = Math.atan(Math.pow((1 - f),2) * Math.tan(lat))

	return {
		x : rad * Math.cos(ls) * Math.cos(lon),
		y : rad * Math.cos(ls) * Math.sin(lon),
		z : rad * Math.sin(ls)
	}
}
{% endhighlight %}

The idea here is simple: I take the pixel coordinate and pass it into pxCoordToLatLng to get back a latitude and longitude. I then take that latitude and longitude and find a three-dimensional point in space. Once I have this 3-vector, I know where to ask my perlin noise function to retrieve a noise value! We'll use this to know what to draw on our map at each pixel.

###Order From Chaos###

Noise by itself doesn't look much like a planet, of course - terrain has more structure than noise. The first observation about terrain is that it has low frequency bumps (long rolling hills, plains, coastlines) as well as high frequency bumps (craggy bits, mountain tops, coastal jaggedness). Therefore, at each point there are a number of different frequencies we will weigh: how 'rolly' vs. how 'craggy' vs. how 'rocky' and such. Here is the bit of code that does that, for each point:

{% highlight javascript %}
	var summand = 0;
	var weights = [0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625]
	var ll = pxCoordToLatLng(i,j,pxWidth,pxHeight);
	var pos = latLngTo3D(ll.lat,ll.lon,800.0);
	for(var lvl = 0; lvl < weights.length; lvl++)
	{
		var freq = 800/(Math.pow(2,lvl))
		summand += weights[lvl] * noise.simplex3(pos.x/freq,pos.y/freq,pos.z/freq)
	}
	var v = normalize(summand,-1.0,1.0)
{% endhighlight %}

This is very simply a weighted average of 8 kinds of noise at the point on the surface of our planet. The first kind of noise is long an rolling, and further has the largest contribution to the point's elevation - it reflects the fact that terrain exhibits large scale patterns. However, each successive noise is twice as 'jittery' but is also two times more 'local'. This gets us bumpiness at many scales, from a mountain range to a hillock. I then quickly make sure the pixel's elevation is ready to render into a color reflecting its altitude, and we're done other than assigning a the color.

###Paint Brush###

The final step is to make a colors scheme. Each pixel now has a value between 0 and 1, where 'zeroes' reflect the lowest trenches of the oceans and 'ones' are the tallest peaks. In the demo, there are three color domains: the oceans, the lower altitudes above sea level, and the higher altitudes above the tree line.

{% highlight javascript %}
	if(v <= seaLevel )
		ctx.fillStyle = "rgb(30,"+Math.floor(125 * (6.66 * v))+",235)"
	else if(v <= treeLevel)
		ctx.fillStyle = "rgb(30,"+Math.floor(165*normalize(v,treeLevel,seaLevel)+90)+",70)"
	else if(v <= 1.0)
		ctx.fillStyle = "rgb("+Math.floor(30 + 205 * v)+","+(Math.floor(205 * v)+30)+","+Math.floor(70 + 205 * v)+")"
	else
		ctx.fillStyle = "rgb(255,125,125)"
{% endhighlight %}

##Interactive Demo##

Here is the finished code, for you to play with. **Click on the map** to regenerate a new one using the settings.

<table>
	<tbody>
		<tr>
			<td>
				<canvas id="display" width="500" height="250" onClick="run()"></canvas>
			</td>
			<td>
				<div class="input-group">
					<span class="input-group-addon" id="seaLvlLabel">Sea Level <small>(0-1)</small></span>
					<input type="number" id="seaLvlINP" value="0.52"></input>
				</div>
				<div class="input-group">
					<span class="input-group-addon" id="treeLvlLabel">Tree Line<small>(0-1)</small></span>
					<input type="number" id="treeLvlINP" value="0.8"></input>
				</div>
			</td>
		</tr>
	</tbody>
</table>


##Going Forward##

Don't think this is the last of it - there is still a lot to continue with. There are neither climates nor rivers on this world, and certainly no coloring of them. Further, there are no tectonic plates leaving their characteristic mark on these simulated Earth cousins, and no vulcanism or crater impacts. Expect more of that stuff the next time I fiddle with terrain generation.

<script>
	function run(){
		displayNoise('display',{width:500,height:250});
	}
	function displayNoise(canvas, map){
		var pxWidth = map.width;
		var pxHeight = map.height
		var canvas = document.getElementById(canvas);
		var seaVAL = parseFloat(document.getElementById("seaLvlINP").value)
		seaVAL = seaVAL !== undefined && seaVAL >= 0 && seaVAL <= 1.0 ? seaVAL : undefined
		var treeVAL = parseFloat(document.getElementById("treeLvlINP").value)
		treeVAL = treeVAL !== undefined && treeVAL >= 0 && treeVAL <= 1.0 ? treeVAL : undefined
		var ctx = canvas.getContext("2d");
		noise.seed(Math.random());
		ctx.fillStyle="rgba(128,128,128,255)" 
		ctx.fillRect(0,0,pxWidth,pxHeight);
		for(var i = 0; i < pxWidth; i ++)
		{
			for(var j = 0; j < pxHeight; j++)
			{
				var summand = 0;
				var weights = [0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625]
				var ll = pxCoordToLatLng(i,j,pxWidth,pxHeight);
				var pos = latLngTo3D(ll.lat,ll.lon,800.0);
				for(var lvl = 0; lvl < weights.length; lvl++)
				{
					var freq = 800/(Math.pow(2,lvl))
					summand += weights[lvl] * noise.simplex3(pos.x/freq,pos.y/freq,pos.z/freq)
				}
				var v = normalize(summand,-1.0,1.0)

				var seaLevel = seaVAL || 0.52;
				var treeLevel = treeVAL || 0.8;

				if(v <= seaLevel )
					ctx.fillStyle = "rgb(30,"+Math.floor(125 * (6.66 * v))+",235)"
				else if(v <= treeLevel)
					ctx.fillStyle = "rgb(30,"+Math.floor(165*normalize(v,treeLevel,seaLevel)+90)+",70)"
				else if(v <= 1.0)
					ctx.fillStyle = "rgb("+Math.floor(30 + 205 * v)+","+(Math.floor(205 * v)+30)+","+Math.floor(70 + 205 * v)+")"
				else
					ctx.fillStyle = "rgb(255,125,125)"

				ctx.fillRect(i,j,1,1);
			}
		}
	}
	function pxCoordToLatLng(x,y,width,height){
		//assumes width = 2 * height
		return {
			lat : Math.PI * ((y - (height/2)) / height),
			lon : Math.PI*2 * ((x - (width/2)) / width)
		}
	}
	function latLngTo3D(lat,lon,rad,alt)
	{
	    f  = 0 //flattening
		ls = Math.atan(Math.pow((1 - f),2) * Math.tan(lat))

		return {
			x : rad * Math.cos(ls) * Math.cos(lon),
			y : rad * Math.cos(ls) * Math.sin(lon),
			z : rad * Math.sin(ls)
		}
	}
	function normalize(val,max,min)
	{
		var range = max - min;
		return (val - min)/range
	}
/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

(function(global){
  var module = global.noise = {};

  function Grad(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }
  
  Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

  Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
  };

  var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
               new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
               new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

  var p = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  // To remove the need for index wrapping, double the permutation table length
  var perm = new Array(512);
  var gradP = new Array(512);

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  module.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };

  module.seed(0);

  /*
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }*/

  // Skewing and unskewing factors for 2, 3, and 4 dimensions
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;

  // 2D simplex noise
  module.simplex2 = function(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin)*F2; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var t = (i+j)*G2;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1=1; j1=0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1=0; j1=1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1 + 2 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;
    var gi0 = gradP[i+perm[j]];
    var gi1 = gradP[i+i1+perm[j+j1]];
    var gi2 = gradP[i+1+perm[j+1]];
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  module.simplex3 = function(xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin+zin)*F3; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = gradP[i+   perm[j+   perm[k   ]]];
    var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
    var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
    var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

    // Calculate the contribution from the four corners
    var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);

  };

  // ##### Perlin noise stuff

  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  module.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };

  // 3D Perlin Noise
  module.perlin3 = function(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255; Z = Z & 255;

    // Calculate noise contributions from each of the eight corners
    var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
    var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    // Interpolate
    return lerp(
        lerp(
          lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
          lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };

})(this);
</script>
<script>
	displayNoise('snapshot',{width:600,height:300});
	run()
</script>