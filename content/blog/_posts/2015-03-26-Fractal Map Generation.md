---
layout: post
date: '2015-03-26T01:13:00.000+08:00'
title: Fractal Map Generation
tagline: Land Grab
featured: 0
---

A quick doodle with Midpoint Displacement. I am instead going to use perlin noise for this kind of thing, but was fun to (badly) implement the noise function myself! I've left this quick demo here for posterity.

## The Demo

**Click on the image** to regenerate a new terrain. This is all done in-browser with javascript, and the code is entirely available in the page source. Let me know if you fix the axial artifacts in the image: I didn't quite nail the 'diamond' part of the square-diamond algorithm.

<canvas id="display" width="600" height="600" onClick="run()"></canvas>

<script>
var d_count = 0;
var r_count = 0;
var max_depth = 1000000;
function run(options){
	d_count = r_count = 0;
	var map = generateFractalMap(options);
	displayFractalMap("display",map.ds)
	console.log(map);
}
function displayFractalMap(canvas, map)
{
	var canvas = document.getElementById(canvas);
	var ctx = canvas.getContext("2d");
	for(var i = 0; i < map.length; i ++)
	{
		for(var j = 0; map[i] && j < map[i].length; j++)
		{
			var v = map[i][j]
			if(v <=0.15 )
				ctx.fillStyle = "rgb(30,"+Math.floor(125 * (6.66 * v))+",235)"
			else if(v <= 0.35)
				ctx.fillStyle = "rgb("+Math.floor(255*(1.0-(2.0*(v-0.15))))+",190,30)"
			else if(v <= 1.0)
				ctx.fillStyle = "rgb(30,"+(Math.floor(205 * v)+30)+",70)"
			else
				ctx.fillStyle = "rgb(255,125,125)"
			ctx.fillRect(i,j,1,1);
		}
	}
}

var pixGrid = function(map){
	this.ds = map;
}
pixGrid.prototype.get = function(x,y){
	if(this.ds[x] !== undefined && this.ds[x][y] !== undefined)
		return this.ds[x][y]
	else
	{
		return undefined;
	}
}
pixGrid.prototype.set = function(x,y,val){
	if(x >= 0 && y >= 0 && this.ds[x])
		this.ds[x][y] = val;
}
function generateFractalMap(options){
	options = options?options:{}
	options.width = options.width?options.width:600
	options.height = options.height?options.height:600
	options.roughness = options.roughness?options.roughness:0.95

	//TODO: datastructure is a preinitialized array in the target raster resolution. Can be smarter/better/adaptive!
	var ds = []
	for(var i = 0; i < options.width; i++)
	{
		ds[i] = []
		for(var j = 0; j < options.height; j++)
		{
			ds[i][j] = undefined
		}
	}
	var px = new pixGrid(ds)

	return normalize(midpointDisplacement(px, options));
}

function midpointDisplacement(pixGrid, options)
{
	options.roughness /= options.scale?options.scale:1.0

	var x1 = y1 = 0
	var x2 = options.width-1
	var y2 = options.height-1

	//Seed corners
	pixGrid.set(x1,y1,Math.random())
	pixGrid.set(x1,y2,Math.random())
	pixGrid.set(x2,y2,Math.random())
	pixGrid.set(x2,y1,Math.random())


	//Start recursion
	midpointDisplacementR(pixGrid, x1, y1, x2, y2, options)

	//Return result
	return pixGrid
}
//Calculates midpoint displacement based on corners (rectangle)
function midpointDisplacementR(pixGrid,x1,y1,x2,y2,options)
{
	r_count++;
	if(r_count+d_count > max_depth) return;
	var w = Math.floor(x2-x1)
	var h = Math.floor(y2-y1)
	var cx = Math.floor(w/2 + x1)
	var cy = Math.floor(h/2 + y1)
	if(pixGrid.get(cx,cy) !== undefined) 
	{
		return;
	}
	var rat = (((y2-y1)/options.height) + ((x2-x1)/options.width))/2.0

	//Neighbors of rectangle ABCD
	/*
			A - - - B
			|   |   |
			|-- M --|
			|   |   |
			D - - - C
	*/
	var a = pixGrid.get(x1,y1)
	var b = pixGrid.get(x2,y1)
	var c = pixGrid.get(x2,y2)
	var d = pixGrid.get(x1,y2)

	var p = pixGrid.get(cx,y1-Math.floor(h/2))
	var q = pixGrid.get(x2+Math.floor(w/2),cy)
	var r = pixGrid.get(cx,y2+Math.floor(h/2))
	var s = pixGrid.get(x1-Math.floor(w/2),cx)

	//Mid point
	var M = average(a,b,c,d) + genErr(options.roughness,rat)
	pixGrid.set(cx,cy,M)


	//Sides
	pixGrid.set(cx,y1,average(a,b))
	pixGrid.set(x2,cy,average(b,c))
	pixGrid.set(cx,y2,average(c,d))
	pixGrid.set(x1,cy,average(d,a))

	//Recurse
	if(w > 1 || h > 1)//space to split
	{
		midpointDisplacementR(pixGrid,cx,cy,x2,y2,options)
		midpointDisplacementR(pixGrid,x1,cy,cx,y2,options)
		midpointDisplacementR(pixGrid,x1,y1,cx,cy,options)
		midpointDisplacementR(pixGrid,cx,y1,x2,cy,options)
	}
	
}
function genErr(r,rat)
{
	return r * rat * (Math.random() * 2 - 1.0)
}
function normalize(pixGrid)
{
	var max = Number.NEGATIVE_INFINITY;
	var min = Number.POSITIVE_INFINITY;
	for(var i = 0; i < pixGrid.ds.length; i++)
	{
		for(var j = 0; j < pixGrid.ds[i].length; j++)
		{
			if(pixGrid.ds[i][j] > max)
			{
				max = pixGrid.ds[i][j]
			}
			if(pixGrid.ds[i][j] < min)
			{
				min = pixGrid.ds[i][j]
			}
		}
	}
	var shift = -min;
	var scale = 1.0/(max-min)
	for(var i = 0; i < pixGrid.ds.length; i++)
	{
		for(var j = 0; j < pixGrid.ds[i].length; j++)
		{
			pixGrid.ds[i][j] += shift;
			pixGrid.ds[i][j] *= scale;
			if(pixGrid.ds[i][j] > 1) pixGrid.ds[i][j] = 1;
			if(pixGrid.ds[i][j] < 0) pixGrid.ds[i][j] = 0;
		}
	}
	return pixGrid;
}
function average()
{
	var array = arguments;
	var cnt = 0;
	var sum = 0;
	for(var i = 0; i < array.length; i++)
	{
		if(array[i] !== undefined)
		{
			cnt++;
			sum += array[i]
		}
	}
	if(cnt > 0) return sum / cnt;
	else return undefined;
}
run()
</script>
