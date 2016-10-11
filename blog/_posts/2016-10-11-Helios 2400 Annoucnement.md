---
layout: post
date: '2016-10-11T16:12:05+08:00'
title: Helios 2400
tagline: Status Update & Game Announcement
featured: 1
---

Been a while! But I return with a game announcement! 
![My helpful screenshot]({{ site.url }}/assets/helios2400_minipic1.png)

## A Game Project

I've been working on a strategy game for a while now, off-and-on as time allows, called [Helios2400](http://github.com/sewerbird/Helios2400). It is a turn-based strategy game in the spirit of [Emperor of the Fading Suns](http://en.wikipedia.org/wiki/Emperor_of_the_Fading_Suns), [Diplomacy](http://en.wikipedia.org/wiki/Diplomacy_(game)), and [Masters of Orion](http://en.wikipedia.org/wiki/Master_of_Orion) (in roughly descending order of influence).

I am programming the game in [Lua](http://www.lua.org), using the [löve2d](http://love2d.org) game engine. I like Lua for this application because it has fine tradition and learning resources, lets me choose my own code paradigm decisions, and is relatively performant for a scripting language. Löve2d is a pleasant lightweight game engine that gives me a game loop and a two-dimensional canvas then gets out of my way, with a few tidbits I can leverage to make my life a bit easier without having to conform to their game idioms (as Unity tends to feel like). Löve2d also lets me target all desktops, Android phones, and (with a bit of elbow grease) Apple phones and the Web.

## The Game Concept

The game is set in the year 2400, when Mankind has colonized the Solar System in large numbers, but hasn't reached beyond it other than with unmanned probes. The worlds are all under the political hegemony of the High Terran Seat, a position held by only one House at a time: the players are one such House. Each House has a number of holdings on each planet, from Mercury to Uranus: units of various kinds and control over cities. Every five years, a vote is held amongst the players about who will be in the High Terran Seat. The person in the High Terran Seat can declare the First Interstellar Empire: if that player stays in power for ten years, then all Houses acquiesce to the claim and that player Wins! This is all very heavily impacted by the fact that the votes of each player are capturable units... and whoever holds the votes casts the vote.

So yeah: this game is basically Emperor of the Fading Suns, but simplified to exclude the Church, Symbiots, Vau, and League and instead focus on the inter-house conflict. The 'neutral NPC' element is instead replaced by a rich ability to cause civil unrest, defection, and revolution in other players' cities using special psychological ops units. Of course, the old standbys of rich mixed-doctrine armies and spaceship battles are left intact!

## Contributions

It is an open-source project, although I haven't taken the steps necessary yet to really facilitate open-source collaboration: the state of the code is really very early. However, I've consistently worked on it for several months now bit-by-bit, so I'm quite heartened that it hasn't become abandoned like I've tended to do with my little games in the past. I will be putting up some formal milestones on github soon, and musing about some of the design/programming experience here as seems appropriate.

Feel free to contact me if you are interested in lending a helping hand, big or small!