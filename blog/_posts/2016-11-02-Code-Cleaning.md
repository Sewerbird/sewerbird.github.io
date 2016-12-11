---
layout: post
date: '2016-11-01T22:40:11+08:00'
title: Code-cleaning
tagline: Preparing for Collaboration
featured: 0
---

Some first steps towards making the project easier to contribute to this week

## Outside Interest

After some very promising talks with [Coderbunker](http://www.coderbunker.com), it seems I am very likely to have an active paid contributor to my [Helios2400 game project](https://www.github.com/Sewerbird/Helios2400). With additional man hours becoming available, I can potentially have a minimally-playabe game by Christmas, provided I can effectively manage my own and the intern's time.

Naturally, the scrambling to be presentable has begun.

Thing is, the Helios2400 project is definitely in an embryonic state: it's the reboot of a previous effort I was making this summer. I tend to throw about 5 hours a week at it, which means very slow progress. And most importantly, I've had no other collaborators working on the source code. This means I needed to do things this week like write a readme with installation instructions and contribution guidelines.

## Update

Therefore, this week has seen me fill in most of the most visible parts of the github repository website. More importantly, I've also identified code changes required before I can confidently onboard new people:

- [Showing Onscreen Statistics](https://github.com/Sewerbird/Helios2400/pull/8)
- [Writing the Readme](https://www.github.com/Sewerbird/Helios2400/issues/11)
- [Writing the Tests](https://www.github.com/Sewerbird/Helios2400/issues/9)
- [Implement SelectableSystem](https://www.github.com/Sewerbird/Helios2400/issues/6)

As of this writing, the Readme is completed and the large part of the SelectableSystem is rudimentarily implemented. That leaves me with the task of writing unit tests for the whole codebase and finishing up unit/city selection this weekend. I also hope to sneak in some unit pathfinding and movement if I've the time once work is done for the week, but we'll have to see.

## Selectable System

In addition to all the stuff above, I've really been digging into the implementation of the Map View lately. The last blog post left off with the view being pannable. This week, the ability to visually select units & cities is nearing completion. 

I've implemented a basic cursor that highlights the edge of the selected hex-tile. It achieves this by having a SelectableSystem that keeps track of a cursor object. When a game object in the scene graph possessing a touch handler that allows selection, the SelectableSystem is informed of the selection. The system then detaches the cursor from the scene graph (if attached), and then attaches it to the notifying game object.

I need to make the [process of making an object selectable easier](https://github.com/Sewerbird/Helios2400/issues/10), but perhaps more importantly I'd like to investigate making this process use a Pub-Sub model. This player interaction is the first instance in Helios2400 where systems need to speak to each other (in this case, Interfaceable and Selectable), so I'd like to get the idiom correct.

Once I've figured out how I want this kind of interaction to occur, it'll set the pattern throught the rest of the codebase, so it's important to nail it down before I can really inform others how best to achieve such events in Helios2400.