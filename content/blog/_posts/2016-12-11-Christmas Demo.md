---
layout: post
date: '2016-12-11T20:40:11+08:00'
title: Christmas Demo
tagline: Helios In Your Stocking!
---

Lots of work in November means holiday rewards!

![My helpful screenshot]({{ site.url }}/assets/Screen%20Shot%202016-12-11%20at%2019.47.06.png)

## The Last Month

November and December bring the cold of winter to Shanghai, and so I've been driven indoors and able to focus very intently on Helios. In fact, on top of my full-time job, I've been putting in 30-hour weeks on Helios getting all sorts of stuff in order for the game! A big help has been the student developer I've hired to the team, Thimo, who has implemented the asset and path-finding system. This has let me focus on architectural and user-interface code: less sexy, but crucial for a game!

All of this effort is aimed at one thing: **the Christmas Demo**. This demo is basically the minimal-viable product for Helios: a scenario where players engage in a King of the Hill match, using units to fight over and control a central city. Whoever holds the central city for 5 turns wins! 

The technological support needed to put together such a scenario hits lots of the early sweet spots I want to hit:

- Showing units and where they are, particularly on a map, is the quickest way to 'show' the game
- All actions only really need to be implemented as 'what happens when a dude moves onto a X'
- The full game really isn't much more than King Of The Hill, except with a voting system instead
- Lots of the internal coding practices can be test-run

Further, by choosing (and holding myself to) a hard-and-set Christmas deadline helps my motivation and gives me a scope-of-work to prepare against. I also find it's helpful in figuring out what tasks to prioritize for Thimo

## Update

Given all the above (and particularly the steady man-hours), here's a 'highlight' list of issues that've closed since last post:

- [Debug Music](https://www.github.com/Sewerbird/Helios2400/issues/16): game plays background music!
- [Asset Loader](https://www.github.com/Sewerbird/Helios2400/issues/23): Thimo's first closed issue, loads up music & images for use in the game code
- [Save Format](https://www.github.com/Sewerbird/Helios2400/issues/24): The demo can load/save its game
- [Basic UI](https://www.github.com/Sewerbird/Helios2400/issues/16): Tons of architecture needed for this!
- [Move Army](https://www.github.com/Sewerbird/Helios2400/issues/35): Some pretty slick EFS-like tiles implemented with plenty of engine work
- [Cleanup Dataflow](https://www.github.com/Sewerbird/Helios2400/issues/40): First engine refactor already
- [Hotseat Gameplay](https://www.github.com/Sewerbird/Helios2400/issues/45): This makes the game 'multiplayer' for the first time, even if only hotseat

## Coming Up

The main bits left for the demo are unit combat, unit production, bug-hunting & cleaning, and some asset upgrades. This post marks the 2-week warning, but I'm confident we'll be able to meet the goal!
