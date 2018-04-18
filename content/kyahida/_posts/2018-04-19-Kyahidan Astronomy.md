---
layout: post
date: '2018-04-19T00:06:00.000+08:00'
title: 'Kyahidan Astronomy'
assets: "assets/Planisphere2018"
tagline: Astronomy
category: featured
---

Today I present a bird's eye view of the region of Kyahidah, like before, except now looking up to the heavens!

## Planisphere

A [Planisphere](https://en.wikipedia.org/wiki/Planisphere) is a neat little tool that gives a map of the night sky on any particular night. You may have owned or used one as a kid, to learn about constellations: it comprises of two disks, one with a star chart and one that is a 'viewer' with a hole in it to let you see the night's stars. I've made a virtual planisphere showing the nightsky over Jezevel, an important place in Kyahida. "Tonight" is marked by the 'midnight' marker at the bottom: I recommend zooming in on your device if you want to look closer.

<figure style="width: 100%">
  <img
   src="{{site.url}}/{{page.assets}}/stars-black.svg"
   alt="Interactive planisphere of a Kyahidan sky"
   width="100%"
   />
</figure>

There are 23 named constellations, and 11 unnamed constellations, comprised of about 230 (randomly-named and positioned) stars. I generate the planisphere using Ruby code to spit out the animated vector image you see here: took some effort!

It's really quite accurate too: I used the proper math for just about everything, even down to the distribution of how many high-magnitude vs. low-magnitude stars there are. All the names are in proper Kyahidan, and the planisphere is very reasonably close to accurate in its shape and plotting: the only thing not set in stone is the longitude of the ascending node, which I might change later in order to reposition the constellations with respect to the seasons. I'm quite proud of it for now, though.

## But Why?

I'm intending to create some myths to go along with the night sky, to serve as a cultural starting point for my work on Kyahida. Already, there are some cool scenes to play with: 

* I have a mighty duel between The Traitor, The Hero, and the Swordsman that takes up a whole season.
* There is a cheeky sailboat that takes half a year to cross the sky: maybe it signals good sailing season?
* There are some geese that come and go on a cycle that could maybe go with bird migrations for real
* There is a polar wyrm/wind that can serve as a locus for a 'North is cold!'
* There is a menagerie of mythical monsters that takes up a season
* There are a lot of sea-fishing constellations towards the edge of the planisphere (the Ocean south)
* There is a Big Dipper in the form of The Vase and The Splash: perhaps it could talk about rain seasons

And so on. Doing the night sky in detail helps me time seasonal activities, animal migrations, plant harvests, calendars, and even sets firmly the orbital characteristics of the planet. Aside all that, it's also a good exercise of my coding technique.'
