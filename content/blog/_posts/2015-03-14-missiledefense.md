---
layout: post
date: '2015-03-14T23:13:00.000+08:00'
title: Missile Defense
tagline: High Stakes Stress!
featured: 1
---

Try your luck at stopping an endless barrage of thermonuclear missiles!

## The Game

Play a round of the game here! Click anywhere to launch a missile towards that point

<table class="table-bordered">
  <tr>
    <td align="center">
      <h5><small>Sewerbird</small>Missile Defense</h5>
    </td>
  </tr>
  <tr>
    <td>
      <div id="display"></div>
    </td>
  </tr>
</table>

## Background

The main impetus for developing this game was to have more than one entry in my 'Coding' section on this site, really. However, I wanted to continue messing around with manually manipulating SVG displays with Javascript, and was looking to step up from the simplicity of Mastermind.

## Development

I started working on this at about 4pm, and finished it (and this blog post) around 11:30pm of the same day, today. I'm pretty pleased with how quickly it came together! The code itself could certainly be a bit more efficient - even a small refactoring of the `update` loop would likely reduce the time complexity by a significant constant factor. That said, for about 5 true work hours spent on it, I am more than satisfied with the smooth play on my own browser.

Further, the draw code for this is really pretty insane. Out of a pigheaded desire to not use a `canvas` element or an external scene library, every single frame of game is displayed via a generated SVG image. It's nice to have smooth vector graphics in my little code toys, but I grimace to think of how many more operations is needed for Sewerbird Missile Defense compared to its Atari inspiration. I'm actually quite curious if older mobile devices can handle the game as it stands.

## Source
You can get the source on github [here](https://github.com/sewerbird/MissileDefense)

<script type='text/javascript' src="https://cdn.firebase.com/js/client/2.2.3/firebase.js"></script>
<script type='text/javascript' src="/scripts/missiledefense/lib/lodash.js"></script>
<script type='text/javascript' src="/scripts/missiledefense/client.js"></script>
<script>
  var lastMissile = 0.0;
  setInterval(function(){
    if(gameState.HOPE_LIVES)
    {
      update(gameState,0.01)
      showField("display",gameState)
      if(gameState.time - lastMissile > 2)
      {
        gameState.missiles.push(spawnMissile(gameState.time,Math.random()*600,10,Math.random()*30-15,30))
        lastMissile = gameState.time;
      }
    }
  },10)
</script>
