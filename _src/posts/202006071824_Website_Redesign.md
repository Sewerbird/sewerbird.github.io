---
datetime: 2020-06-07 18:24:54 -0500
title: Website Redesign
tagline: Yet Another Reboot
assets: 'assets/'
type: post
---

I swear, I remake this website more often than I contribute to it. There is a reason for that though: it's relatively high friction to add to. 

<blockquote>But how can that be? You just need to `git push` and github pages will publish it!
<footer>
- Imaginary You
</footer>
</blockquote>

Yes, that's true, but I have to create a new file, make sure its fiddly metadata is set correctly, tag its category, and set it as featured or not, and then type it up, and then etc, etc etc. The proof is in the pudding: I simply don't post to the site, despite having a full Moleskine of musings written out by hand.

The point of this redesign is to fix that: for a man who is at his text editor all day, there is no good reason I shouldn't be able to spin off more stuff for my personal site. Here are the important changes:

- __New 'Thoughts' Section__: This is basically a Twitter minus all the social stuff. Through literally the command `sewer thought "I like pizza"` at my terminal, it will now create that thought, add it to my code repository, and publish to the web. Couldn't be easier, and encourages me to write not-blog-worthy content, and keep the website 'in mind' and in my life. Thoughts can easily be converted into blogs later, since I'll see them and might be inspired by them.
- __New 'Arcade' Section__: I want to be able to showcase my programming toys easier, and so I've divorced them from the act of creating a blog post in favor of a simple section that only requires a blurb, and a web-ready page containing the game.
- __New Visual Design__: Honestly, after the afterglow wore off, I found the site's last revision to be ugly looking, and I didn't enjoy looking at it.
- __Portability Consideration__: Another big inhibition is that I can't write notes to myself when I'm on my work computer since it's too annoying to grab my personal computer. Through the existing design of this site, and bringing over a shell function to my work computer, I can now jot off Thoughts while at work, so I can address them more fully off-the-clock.
- __Handrolled Site Generation__: This is a little controversial, but... I run so many different kinds of servers during the course of the day, I usually forget how to spin up Jekyll. I also usually forget how it works in general. But a simple site generation script fits in one vim buffer, and I don't need much more in terms of features, so I've decided to write all the static generation code myself. It doesn't hurt that it's a bit of a flex and lets me use normal `*erb` templating for my markdown.
- __Reduced Archive__: I might revise this decision later, but I've not included old posts into this version of the site. For now, it makes the site feel 'hungry' for new content. Eventually I'll likely add a nostalgic section hosting all the old stuff, but not for now.
- __Fresh Coat of Paint__: I am trying out a classless css framework, and its looking pretty nice for having zero markup. I'm optimistic that this will future-proof to a higher degree my posts' innards.

I think that about covers it. I would like to add dyanamic elements to the site (comments, signin-only sections for friends/family, and wikis for my writing work are the features I'd like most), but I need to figure out a hosting solution first for that, and a lot more work to do so in a way that is respectful of my time and others' privacy.

