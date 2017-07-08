---
layout: post
date: '2015-03-11T11:13:00.000+08:00'
title: Mastermind
tagline: Fun Puzzler
featured: 1
---

While visiting my mother's, I was diverted by implementing the game 'Mastermind' in javascript!

## Rules

Mastermind is played in rounds, where you try to guess the color and position of a series of round pegs. 

Click on the circles to change their color between <span id="redR" title="red"></span>, <span id="orangeR" title="orange"></span>, <span id="greenR" title="green"></span>, <span id="blueR" title="blue"></span>, <span id="yellowR" title="yellow"></span>, and <span id="whiteR" title="white"></span> 

When you're ready, submit your guess. 

In response, you will see your guess appear alongside 0 to 4 little circles, which gives you information about how correct your guess was:

- A red little circle <span id="lilredR" title="little red"></span> means that you guessed a position of the code's color correctly, and you get such a circle for each position you got totally right.
- A white little circle <span id="lilwhiteR" title="little white"></span> means that you have one of the colors of a position in the code, but it is in the wrong position. Again, you get such a circle for each color that you guess corresponding with a correct color in the code.
- A lack of any circles means that you failed to guess any of the right colors.

Therefore, your task is to get 4 red little circles in response to your guesses. When you do you've won!

## The Game

Play a round of the game here! Click on the circles repeatedly to change their guess color.

<table class="table-bordered">
  <tr>
    <td align="center">
      <h5><small>Sewerbird</small>Mastermind</h5>
    </td>
  </tr>
  <tr>
    <td>
      <div id="description"></div>
    </td>
  </tr>
  <tr>
    <td>
      <div id="input"></div>
    </td>
  </tr>
</table>

## Background

I had an official version of this game when I was young, with a ton of little plastic pegs and a cribbage-like board. It was one of my favorites, especially since it was one of the few games I could convince my siblings to play with me, since it wasn't really very competitive. I've never really figured out a human-optimal way to play, although I know there are proofs by quite famous people about the theoretical quickest generalized strategies. Myself, since I always play where a color can be duplicated (the rules reflected above), will usually play a couple feeler guesses. I usually play <span id="rrgg"></span>, followed by <span id="bbww"></span>, and then maybe <span id="yyoo"></span>: I can infer if there is a duplicate color, what it might be, and sometimes get lucky with lots of red feedback.

## Development

This is admittedly a very rudimentary little implementation, but it proved a fun diversion. I've rarely done any significant user interface, and almost none using a web stack - my prior experience is mostly with things like iOS development and Java Swing interfaces. So figuring out how to assemble svg circles and making them clickable was a new thing for me. All told, the game took about 4 hours to do, with just about all that time being spent on different iterations of the game's interface. The scoring function, the meat of the actual game, took about 3 minutes ;-)

If I revisit this bit of code, it'll be to add a new game mode. I have an idea where the game begins with a number of random guesses already made for you, and you get only one guess (or more?) to figure the code out. Conceptually, I think it might feel similar to the mode in Tetris where some amount of the level starts out filled with junk tetris blocks.

## Source
You can get the source on github [here](https://github.com/sewerbird/Mastermind)

<script type='text/javascript' src="/scripts/mastermind/lib/lodash.js"></script>
<script type='text/javascript' src="/scripts/mastermind/client.js"></script>
<script>
  var ccc = generateNewCode(4)
  showColorInput("input")
  var ruleCircleSize = 8
  document.getElementById('redR').appendChild(makeCircle('redx','red',ruleCircleSize))
  document.getElementById('orangeR').appendChild(makeCircle('orangex','orange',ruleCircleSize))
  document.getElementById('yellowR').appendChild(makeCircle('yellowx','yellow',ruleCircleSize))
  document.getElementById('greenR').appendChild(makeCircle('greenx','green',ruleCircleSize))
  document.getElementById('blueR').appendChild(makeCircle('bluex','blue',ruleCircleSize))
  document.getElementById('whiteR').appendChild(makeCircle('whitex','white',ruleCircleSize))
  document.getElementById('lilwhiteR').appendChild(makeCircle('lilwhitex','white',ruleCircleSize / 2))
  document.getElementById('lilredR').appendChild(makeCircle('lilredx','red',ruleCircleSize / 2))
  constructGuessLineUI(['red','red','green','green'], {}, 'rrgg',"span")
  constructGuessLineUI(['blue','blue','white','white'], {}, 'bbww',"span")
  constructGuessLineUI(['yellow','yellow','orange','orange'], {}, 'yyoo',"span")
</script>
