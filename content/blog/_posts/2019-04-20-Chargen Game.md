---
layout: post
date: '2019-04-20T00:16:00.000+08:00'
title: 'Chargen Game'
tagline: Where you never really start!
assets: 'assets/CharGenGame'
categories: blog
---

I've been messing around with ideas around a character generator, since I am thinking of doing another game jam this month. 

## The Process

Inspired by [a game where character generation is the whole game](https://beschizza.github.io/charactercreationisthewholegame/), I'll make a crack at a similar project for the game jam. I've always loved character generation in roleplaying games (virtual and analog), to the point where I am certain that I have spent at least three times as long in the character screen than any game's main gameplay. This person's attempt to just make the character generation the entire point resonated!

The thing that caught my eye most was that you could tint and clothe your character as you pleased, and I wondered how they achieved the effect. I dug into the code, and hacked together a similar prototype, doing a per-pixel walk of the image data and tinting it. To distinguish myself, and go a step further than them, I cut apart the character into bits: arms, legs, torso, and head. I then gave them a rudimentary breathing animation: the effect is pretty good for how primitive the code is. 

There is no game framework here, just raw DOM and Canvas manipulation with javascript.

## The Prototype

<table style="float: right; background-color: #888888; width: 100%; float: right">
  <tr>
    <td rowspan="8">
      <canvas id="portrait" width="330" height="630"> </canvas>
    </td>
    <td>
    </td>
  </tr>
  <tr>
    <td>
    </td>
    <td>
      Click on the colored boxes to tint different parts of the character!
    </td>
  </tr>
  <tr>
    <td> </td>
    <td>
      Main:
      <span onclick="tint('main','#0000FF')" style="float: right; color: #0000FF">&#9608;</span>
      <span onclick="tint('main','#FF0000')" style="float: right; color: #FF0000">&#9608;</span>
      <span onclick="tint('main','#00FF00')" style="float: right; color: #00FF00">&#9608;</span>
      <span onclick="tint('main','#FFFF88')" style="float: right; color: #FFFF88">&#9608;</span>
      <span onclick="tint('main','#FFFFFF')" style="float: right; color: #FFFFFF">&#9608;</span>
      <span onclick="tint('main','#000000')" style="float: right; color: #000000">&#9608;</span>
      <span onclick="tint('main','#993322')" style="float: right; color: #993322">&#9608;</span>
    </td>
  </tr>
  <tr>
    <td> </td>
    <td>
      Accent:
      <span onclick="tint('accent','#0000FF')" style="float: right; color: #0000FF">&#9608;</span>
      <span onclick="tint('accent','#FF0000')" style="float: right; color: #FF0000">&#9608;</span>
      <span onclick="tint('accent','#00FF00')" style="float: right; color: #00FF00">&#9608;</span>
      <span onclick="tint('accent','#FFFF88')" style="float: right; color: #FFFF88">&#9608;</span>
      <span onclick="tint('accent','#FFFFFF')" style="float: right; color: #FFFFFF">&#9608;</span>
      <span onclick="tint('accent','#000000')" style="float: right; color: #000000">&#9608;</span>
      <span onclick="tint('accent','#993322')" style="float: right; color: #993322">&#9608;</span>
    </td>
  </tr>
  <tr>
    <td> </td>
    <td>
      Skin:
      <span onclick="tint('skin','#0000FF')" style="float: right; color: #0000FF">&#9608;</span>
      <span onclick="tint('skin','#FF0000')" style="float: right; color: #FF0000">&#9608;</span>
      <span onclick="tint('skin','#00FF00')" style="float: right; color: #00FF00">&#9608;</span>
      <span onclick="tint('skin','#FFFF88')" style="float: right; color: #FFFF88">&#9608;</span>
      <span onclick="tint('skin','#FFFFFF')" style="float: right; color: #FFFFFF">&#9608;</span>
      <span onclick="tint('skin','#000000')" style="float: right; color: #000000">&#9608;</span>
      <span onclick="tint('skin','#993322')" style="float: right; color: #993322">&#9608;</span>
    </td>
  </tr>
  <tr>
    <td> </td>
    <td>
      Hair:
      <span onclick="tint('hair','#0000FF')" style="float: right; color: #0000FF">&#9608;</span>
      <span onclick="tint('hair','#FF0000')" style="float: right; color: #FF0000">&#9608;</span>
      <span onclick="tint('hair','#00FF00')" style="float: right; color: #00FF00">&#9608;</span>
      <span onclick="tint('hair','#FFFF88')" style="float: right; color: #FFFF88">&#9608;</span>
      <span onclick="tint('hair','#FFFFFF')" style="float: right; color: #FFFFFF">&#9608;</span>
      <span onclick="tint('hair','#000000')" style="float: right; color: #000000">&#9608;</span>
      <span onclick="tint('hair','#993322')" style="float: right; color: #993322">&#9608;</span>
    </td>
  </tr>
  <tr>
    <td> </td>
    <td>
      Eye:
      <span onclick="tint('eye','#0000FF')" style="float: right; color: #0000FF">&#9608;</span>
      <span onclick="tint('eye','#FF0000')" style="float: right; color: #FF0000">&#9608;</span>
      <span onclick="tint('eye','#00FF00')" style="float: right; color: #00FF00">&#9608;</span>
      <span onclick="tint('eye','#FFFF88')" style="float: right; color: #FFFF88">&#9608;</span>
      <span onclick="tint('eye','#FFFFFF')" style="float: right; color: #FFFFFF">&#9608;</span>
      <span onclick="tint('eye','#000000')" style="float: right; color: #000000">&#9608;</span>
      <span onclick="tint('eye','#993322')" style="float: right; color: #993322">&#9608;</span>
    </td>
  </tr>
  <tr>
    <td> </td>
    <td>
      
    </td>
  </tr>
</table>
<script src="{{site.url}}/{{page.assets}}/main.js"></script>

Neat!

## Implementation

Frankly, half of the hair-pulling get this to work was making the assets.

- I had to find an image online that looked easy enough to slice apart and had a neutral lighting
- I had to bring the image into GIMP (urgh)
- Then, I grayscaled the entire image and adjusted the brightness/contrast a bit
- The image got sliced into different layers, a layer for each body part
- A layer was created for each 'material' I expected to use in the code: that's what you see in the demo's controls
- Then, by hand, I had to color these material layers such that, when overlaid on the body part layers, it tinted them
- Then, for each body part, I had to export a PNG for use in the web demo: GIMP doesn't make this easy

The javascript itself is fairly benign: I use `setInterval` to queue up timers that run the simplistic animations, which mostly just jiggle the loaded images up and down. Feel free to [look at the source]({{site.url}}/{{page.assets}}/main.js) to get right at the guts of it. The most interesting bit is where hidden canvases on this page are used to dump the images' pixel data into, and then process the canvas into a data_url for my main script to use as assets: I knew of this technique before, but I have largely avoided actually doing it, seeing how I rely on game engines for most of my game prototypes. I've actually left them visible for you to see: they should be floating at the bottom of this page, hah!

## Results

The result is pretty good for only 8 hours of work: the basic tinting is there, and works great! The main barrier to having it be truly 'wow-ing' is allowing a better color pallete, and better artistic sense on my part. I don't like how 'jagged' the image looks, and the colors can get washed out in the lighter areas of the character: this is mostly me not fine-tuning the grayscale image in GIMP sufficiently. Dynamic lighting of the character would be a tall order, since the light intensity is essentially 'baked' into the image I make in GIMP.

I'd say that this code would be useful in my coming game jam with a bit of a refactor, and that I'd err towards a different art style when drawing my own assets: I'd have difficulty drawing nuanced and enticing lighting, which is critical for this particular approach to look pleasing. It'd be quite straightforward to set alternate images for the different body parts: this would cause the outfit to change, or even allow showing a different perspective if I wanted the character to shift their stance more. But for today I'm done: hope you've enjoyed this little ramble!

