---
layout: post
date: '2017-12-09T00:00:00+08:00'
title: Ludum Dare 40 Post-Mortem
tagline: Picking Over the Code
assets: assets/LudumDare40PostMoretem
category: featured
---

Today, I do a code-review for myself where I critique the code I wrote for the Ludum Dare: time constraints don't lead to pristine code, so I'm sure there's plenty to critique!

## Classes

I'll start with going through each class I wrote for Cad Simulator, and then make more general remarks.

### Board

Board had a lot of pathfinding frustration in it, so there's some evidence of that

- `getPath` is unused, and wanted to implement A-star pathfinding
- `findAtWorldspace` is commented out in testLineOfSight. It wanted to implement BVH lookup
- `search` is very heavily used, and is probably the main way I retrieved Tiles and Pieces
- `searchByDesignation` is lightly used to access a special identifier for Tiles. I think it could be rolled into the search function.
- `getSampledLine` feels like it should be in my math_extensions
- `testLineOfSight` is the only instance of pathfinding that actually got a function
- `sendNewDate` feels a bit out of place, but Board felt like the logical place to stow the logic. It should've lived in the Level class I think.'

In general, the Board ended up trying to solve several problems that my base code isn't supporting: querying of the game state, pathfinding, and transforming between coordinate spaces. I definitely need to add more core support for that kind of querying, rather than forcing my game-specific code to implement it.

### Date

Date actually ended up holding most of the logic in the game. It moves the Date, adjusts her meters, and allows meters to be affected. There is also a big giant chunk of Behaviours being plugged into the state machine.

The behaviours *really* cluttered up the constructor, but were incredibly useful to be able to just plug in. Looking at how to refactor this to reduce unneeded empty functions would be a really good idea. States+Behaviours do proliferate quite quickly though: the Date had 16 states! I can easily imagine much more tricky entities...

### The Cad & The Taxi

The Cad has kind of a funky bit of code slammed into his `moveToTile` function, which grabs the Date and puts her in the opposite chair when he sets himself into a chair. I would've liked to instead publish a 'Sitting Down' event that the Date listened to, if I did it again.

The Cad's motion doesn't even try to use the inputQueue to ease his movement animation, which is sad: I should make it less intimidating to use such events for translative animation.

Similarly, the Taxi relied on markers on the map to determine how to translate its motion, and it'd've been nice to have a proper Pathfinding.

### Tile

Tiles ended up with two funky things being slapped onto it: tag and path_distance_to_exit. Path_distance_to_exit was how I baked in pathfinding without using a real method for it, relying instead on a pre-calculated heatmap. Totally unscalable, but a clever hack.

Tags were kind of an artifact of how I loaded the map data, and I would do it differently a second time around. I would instead make the importer more robust, and change the `searchByDesignation` Board function to just be a 'filter' on the normal `search`. 

### Level

This got added a bit too late into the game, and should've been the logical location of a some behaviour that currently exists in Board and the Date. It's mostly fine though, serving as a scene-level state machine. I would've liked to have more time to have it manage Main Menu, Options, Paused, and Game Over screens.'

## General Remarks

In retrospect, I definitely was struggling to build up a basic toolkit to use while also trying to push out some facsimile of a game, and this ended up frustrating my ability to make something worth showing off. One noteworthy annoyance was that the `Stead` class used to represent position in the World, on the Screen, and on the Board was quite annoying to initialize and transform, and it's the main thing I circumvented with my heavy use of the `Board:search` method. I'll have to spend some more time meditating on how to make it easier on myself in the future.

Working at Coderbunker was a pretty good choice, since snack breaks were very reliable, and that helped me keep focused. However, my own home was better for creative work, since I was in a more relaxed and less austere environment. The biking forced by going to Coderbunker was great for waking up in the morning, though, so I'm sure next Ludum Dare I'll go to Coderbunker again.

I may consider giving up making my own custom engine code, and instead learn a proficiency in a Javascript game engine, Unity, or something else. I find certain aspects of engine writing to be very fun, but when my enthusiasm flags it definitely gets in the way of me getting the 'game creation' actually done. I'm just a hobbyist game creator, so I have the luxury of using inefficient tool stacks: I'd not roll my own engine if I had a paying client relying on me.

