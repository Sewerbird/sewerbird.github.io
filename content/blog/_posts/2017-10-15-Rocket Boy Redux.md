---
layout : post
date : '2017-10-15T11:30:00.000+08:00'
title : 'Rocket Boy Redux'
tagline: Lava & Jetpack
assets: "assets/RocketBoy2017"
bigpic: "/assets/RocketBoy2017/RocketBoyScreenie0.png"
categories: coding featured
---

This past week, I revisited an old iOS game I helped work on. You can [play it here]({{site.url}}/scripts/rocketboy) if you have a keyboard.

## Background

Back when I lived in Waltham and was working with my friend Sean Purser-Haskell, we worked to implement a small game called 'RocketBoy' for the iPhone/iPod. In Rocketboy, you control a little dude who has a jetpack by tilting the device: tilt left to go left, right to go right, and away to use his jetpack. The goal is to avoid the rising lava as you navigate difficult terrain hindering your escape to the top of the level. All the art and music was done by our friend Jeff Edwards, and it had a fun little aesthetic to it. 

It was a neat app, went on the App Store for about a year, and was lost to the ages: I believe the only extant copy on a device is on a few family members' devices. It's occasionally bugged me that I didn't save a copy for myself somewhere.

Then, about a week ago, I was searching for something unrelated in my email account. Here, I saw an old mail come up in the search results called 'Delivery 3' - curious, I clicked on it to see what it had been. Inside, I find a few of the assets from RocketBoy! A further search reveals a Delivery 2 and Delivery 4, containing just about everything I need to make a RocketBoy clone.

## Remaking RocketBoy

On a caprice, I fired up my editor and loaded up [Love2D](www.love2d.org) to get a window started. Using their built-in physics, I quickly had a basic platformer put together: small white ball hopping amongst green platforms. RocketBoy is a very simple game, fundamentally just being an obstacle course. After a bit of wrangling, I put in the growing 'lava rectangle' that ends the game if you touch it, and that was the basics.

<figure>
<img alt="Simple Game" src="{{site.url}}/{{page.assets}}/RocketBoyScreenie1.png" style="text-align: center; width: 100%; max-width:600px;"/>
</figure>

Next came the skinning. Armed with all the assets, I wrote up code that would intelligently draw the platforms' graphics, with tops and bottoms and edges getting different images. I changed the small white ball to instead show RocketBoy in his dorky glory, and textured the lava rectangle.

<figure>
<img alt="Simple Game" src="{{site.url}}/{{page.assets}}/RocketBoyScreenie2.png" style="text-align: center; width: 100%; max-width:600px;"/>
</figure>

Another distinguishing aspect of RocketBoy is that it leans on particle effects to make itself more visually interesting. The jetpack's fumes and lava froth took a while for me to recreate, as it was from memory, and I'm not sure I matched 1-to-1 the old game, but I feel they convey the same impact. I also made platforms blacken as the lava approached and consumed them.

<figure>
<img alt="Simple Game" src="{{site.url}}/{{page.assets}}/RocketBoyScreenie3.png" style="text-align: center; width: 100%; max-width:600px;"/>
</figure>

Finally, I had to create the platforms themselves. Up to this point of testing, platforms had just been scattered at random, but the real challenge of RocketBoy is that it threw incredibly annoying hurdles in your way: as much as it was a game about having a jetpack, it was more characterized by lava creeping up on you while your jetpack worked against you smoothly navigating the field. So, I recreated as many of the level segment hurdles I could remember and threw them in.

However, we still needed the Cherry-On-Top. Despite having Deliveries 2, 3, and 4, containing 90% of the original assets, I still didn't have the iconic RocketBoy and Level: I only had the 'alternate versions'. So, I pinged Sean to see if he had the coveted Delivery 1 hidden in his email, and was successful! Now I had everything, and the game was basically done.

## Porting RocketBoy

I showed Sean the application, which at this point was desktop-only, and he suggested more folks might try it out if it was put online in the browser. This sounded like a good idea, but presented an initial difficulty: I had programmed everything in Lua so it could leverage fast C and OpenGL via LuaJIT, but Lua doesn't run in the browser: Javascript rules supreme there. So, how to port it to browser?

My first thought was to rewrite the thing: the source code is only about 400 lines long. However, it leveraged the physics engine of Love2D heavily, and using a new physics setup seemed like it was more effort than it was worth. RocketBoy is cool, but I didn't want to dedicate *proper* time working on it. So, I found a project online called [love.js](https://github.com/TannerRogalsky/love.js/blob/master/readme.md): it uses [Emscripten](https://kripken.github.io/emscripten-site/) to port the entire Love2D engine to the browser. After getting over my initial wariness of running a virtual-machine inside of a virtual-machine, I figured RocketBoy is rudimentary enough that it would play with enough frames-per-second on modern laptops.

The love.js project is really very easy to use, with only a few terminal commands needed to get a Javascript build of the Lua version. However, as I suspected, the framerate was very poor rendering the game unplayable. Thankfully, I hadn't optimized RocketBoy at all for draw performance, so I had ample options for optimization. I did offscreen render culling and reduced the total number of particle effects in such a way that it was much easier on the rendering engine without altering the appearance very much. I also took this opportunity to resize the .wav audio files into .mp3 using [LAME](http://lame.sourceforge.net/index.php) at the terminal. Once I got the framerate to a playable level and the game to below 10MB, I made some tweaks to the jetpack and I called it 'done'.

## Future of RocketBoy

I requested permission from Sean to host the game on my site (since he funded and owns the original project and its assets) and he graciously granted permission. I am happy, therefore, to link you to the game [HERE!]({{site.url}}/scripts/rocketboy). 

I might fiddle with it a bit more as time goes by, with more levels and maybe powerups. For the most part however, I'm pleased that I remade the old game in so brief a time, and feel I've improved the past several years in my coding skills, particularly in terms of 'getting it done'.
