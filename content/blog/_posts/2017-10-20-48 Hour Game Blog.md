---
layout: post
date: '2017-04-21T21:53:45+08:00'
title: 48 Hour Game Blog
tagline: Really Fast Game Creation
assets: assets/48Hour2017
categories: coding jams
---

Welcome to the blog for my attempt to create a game in 48 hours. I'll be keeping my status and some notes in here, and when I'm done I'll morph it into a post-mortem.

~~You can watch the livestream (if I'm not sleeping) at [Twitch.tv](https://www.twitch.tv/sewerbird)~~

Update: You can play the result of the challenge (if you have a keyboard) [HERE!](/scripts/48hour2017)

## Overview

The goal of this attempt is to create a small game using Love2D, from the initial idea to final conception, within a span of 48 hours. I am beginning right after work on a friday at Coderbunker, here in Shanghai China.

I will be working solely with [Love2D](love2d.org), and may use no external libraries or assets for the game: only what I can type out in 48 hours, and what's built into Love2D.

## Starting: 8:00pm China Standard Time

First I need a game idea: something simple enough for me to pull off in such a brief amount of time. I didn't allow myself to work or even think about the task before I decided to do it. However, I think I can hack together a real brief Final Fantasy or Pokemon-style game. I can do most of the coding Friday and Saturday, and add in-game content and such on Sunday.


### 9:00 Showing Sprites

{:refdef: style="text-align: center;"}
![Transition]({{site.url}}/{{page.assets}}/screen1.png)
{: refdef}

### 9:30 Movement & Impassable Terrain
{:refdef: style="text-align: center;"}
![Transition]({{site.url}}/{{page.assets}}/screen2.png)
{: refdef}

### 10:00 Move Home

### 11:00 Clamping Camera to Level

### 12:00 Improving Sprites. Player Facing

{:refdef: style="text-align: center;"}
![Transition]({{site.url}}/{{page.assets}}/screen3.png)
{: refdef}


### 13:30 Sleep

### 9:00 Wakeup & Coffee

I'm feeling refreshed, having slept well and given myself a clean shave and shower: only coffee left before resuming work. Although I woke up with ideas to make the map isometric, it is more important to sort out a Pokemon-style combat screen as well as a dialog system today for the core game play. I figure today will be focusing on the fundamentals, and Sunday can be spent making levels, sprites, and dialog before the deadline.'

### 10:30 Battlescene Visuals

I've gotten the battle scene to show the player and a badguy against a backdrop. Now to add ui elements.

{:refdef: style="text-align: center;"}
![Transition]({{site.url}}/{{page.assets}}/screen4.png)
{: refdef}

### 12:00 Super Hungry and Distracted

Lost a good chunk of motivation, and so went to clear my head and eat a bit

### 14:00 Done with Lunch & Relax

### 15:00 Drawing a Bear

At this point, it's been a bit of a low-progress day, which is bad, because of the tight time constraint. However, I can't quite get the deep hacker motivation going... so time for a new tactic. I figure if I can't bring myself to code quickly, I can at least spend the time drawing: some art assets could be fun, exercise a different muscle, and still contribute to the goal. So, I opened up my vector graphics editor and spent significant time drawing a bear, and then plugging it into the game. Now, you run into a bear at random as you wander the map and do combat against it!

{:refdef: style="text-align: center;"}
![Transition]({{site.url}}/{{page.assets}}/screen5.png)
{: refdef}

I also reworked the hero sprite to look marginally better. Combat is super-rudimentary: the AI attacks you with its strike, and you can swipe back or run away. When the bear loses HP it dies: when you lose HP, you run away (no death is possible yet).

### 20:00 Berry Bushes

I've made it so you can pick berries off of bushes to recharge your health, and whipped up the first draft of a merchant character who you can sell bear hides to later.

{:refdef: style="text-align: center;"}
![Transition]({{site.url}}/{{page.assets}}/screen6.png)
{: refdef}

### 10:00 Sunday Begins

There's so much left to do, and not enough time to do it: but I'll try!

### 11:00 Finished Death State

I made it so that when you reach negative health, you get shown a death screen.

### 11:30 Reload the Game

When you die, the game resets to a new level to let you continue playing now.

### 13:00 Inventory Assets

We need inventory icons for the various stuff you have: your torch, your sword, and your health potions. It took a while in the drawing program, but got some put together.

### 15:00 Inventory Usage

The code for selecting an item in your inventory and then using it turned out to be more fiddly than I'd hope, but it works now. You can now use your (unlimited use) sword to attack the bear, use your (one-time) potions to heal yourself, and use your (one-time) torch to scare off the bear.'

### 17:00 Duration Actions

To support animations, I needed to do a significant bit of refactoring to support an EventQueue. Actions in the event queue take up time, and have Begin, During, and Finish events that fire.

### 18:00 Movement Animation

I leveraged the new EventQueue to show the hero moving smoothly across the map, and have the camera follow him

### 19:00 Last Hour!

This being the 47th hour, I had to choose the last thing I wanted to work on before the deadline hits, so I decided to implement a Title Screen and fix what bugs I was aware of, as well as tidy up the BattleScene to show healthbars.

{:refdef: style="text-align: center;"}
![Transition]({{site.url}}/{{page.assets}}/screen7.png)
{: refdef}

## 48 Hours' Time UP!

And that's that! I have a small crappy little game where half the art sucks and half the art is pretty good given my ability. There are only one or two bugs, but mostly it suffers from unimplemented features. The good news is that I can return to work on this game whenever I want to make it more in-depth and interesting... but for now it can be a serviceable death-spiral with a forest full of rabid bears.


You can play it [HERE!](/scripts/48hour2017) if you have a keyboard. Enjoy, and keep your antenna up for game updates/upgrades!


