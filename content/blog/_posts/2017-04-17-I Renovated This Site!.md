---
layout: post
date: '2017-4-17T09:21:11+08:00'
title: I Renovated this Site!
tagline: Behind the Scenes
---

I spent this past sunday dusting off the site, having not posted in a few months. I took the opportunity to really clean out the site and change how its structured in its source code: the old arrangement had a lot of cruft that I didn't 'know what it did', and I really hated that. The purpose of this site is to be resistant to degradation over time, and not knowing how it works is a good way for it to eventually be too confusing to post to.

Therefore, I've done the following:

- Tore out JekyllBootstrap and switched to vanilla Jekyll
- Switched to using [PicniCSS](picnicss.com) for layout
- Scorned the use of a `gem` for styling, opting instead to keep all theming source with the web source
- Made the front page generate itself automatically from a list of my projects (in `.yaml`)
- Made post category depend on folder structure, not tags, for their 'general location'
- Gave each project a 'Project Page', and made it easy to associate posts with that project
- Handwritten all the CSS styling
- Rewrote the page templates
- Made little 'feather' picture for bullet lists

I'm not done yet with everything I want to add to the site, but at least now the site is at parity with the old one. There are a few things I want to do next:

- Make the Featured Post on the front page feature a picture
- Customize the Project pages to have more information about the why/what/how of their projects
- Import my tiddlywiki for the Kyahida world
- Make a dedicated Helios game landing page
- Set up a server for serving dynamic content and store a site database

It was a full day's work, although I did enjoy some relaxing in my garden as well. Keep an eye out on this space!
