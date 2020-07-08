---
datetime: 2020-07-03 08:22:54 -0500
title: Me and the I Ching
tagline: Fishing the Mind 
assets: 'assets/'
type: post
---

I first met the I Ching in 2006, when I was experimenting with Crowleyist occultism: my faith in God had been slowly falling apart, and this dive into the occult was about seeing if I could salvage my watchmaker Deism of 2005 by trying to access hermeneutic knowledge outside scripture. Although this attempt failed (for the next 7 years, I was a very committed New Atheist), I learned a lot about divination methods: I hungrily analyzed my dreams, laid out Tarot tableaus, read omens, counted the words to turn them into numbers, and threw the coins of the I Ching. This last one has endured as my divination of choice, and today I'll share with you some thoughts on it.

The I Ching is a divining method, an oracle, that uses three coins (or a bundle of yarrow stalks) to derive a glyph made of six broken and/or unbroken lines, arranged bottom to top. This glyph is called a hexagram. If approached with a meditative mind and a sense of prayerful seriousness, the hexagram generated can serve as a focus on which to interpret what changes are at play in your situation, and yield recommendations for the kind of action amenable to it. The oracle acts on the principle of synchronicity: that the fall of coins and that of your spirit's movement are not causally related, but instead meaningfully related, by merit of their togetherness in space and time.

## An Example

It's a bit simpler to go through how I tend to consult the I Ching by example. I'm a total geek, so I have written a short bit of code that generates a hexagram in the same manner as would be produced by the coins: I don't ascribe mystical value to a coin that I wouldn't also assign a transistor. Here is the code (in Ruby):

<div class="sourceCode">
<pre class="sourceCode ruby">
<code>
  LINES = {
    9 => "========= * ",
    8 => "=========",
    7 => "===   ===",
    6 => "===   === * "
  }
  GRAMS = {
    "sss" => "Chi'en",
    "ssw" => "Tui",
    "sww" => "Chen",
    "sws" => "Li",
    "www" => "K'un",
    "wsw" => "K'an",
    "wss" => "Sun",
    "wws" => "K'en",  
  }
  casts = 6.times.collect{ 3.times.collect{ rand() >= 0.5 ? 3: 2 }.sum }
  top = GRAMS[casts[3..5].collect{|e| e==7 || e==6 ? "w" : "s"}.join("")]
  bottom = GRAMS[casts[0..2].collect{|e| e==7 || e==6 ? "w" : "s"}.join("")]

  puts casts.collect {|e| LINES[e]}.reverse.join("\n")
  puts "#{top} over #{bottom}"
</code>
</pre>
</div>

Running that now, I get Chi'en over Tui:

> #☰ <span style="font-size: 40%">Chi'en (4 and 5 moving)</span>
> #☱ <span style="font-size: 40%">Tui (3 moving)</span>

The lines are counted from bottom to top, so I also note that the third weak line in Tui is moving, and the fourth and fifth strong lines in Chi'en are moving.

Consulting the I Ching book I have, this hexagram is that of "Lu / Treading [Conduct]". There are three parts to the description of each hexagram in the I Ching:

- The Judgement, which predicts one's fortune and alludes to the tensions and harmonies of the hexagram.
- The Image, which considers the image of nature represented by the two trigrams: the top and bottom three lines each have an 'elemental' interpretation.
- The Lines, which addresses the implications of the 'moving' lines of the hexagram, usually addressing some more specific aspect of the situation considered.

In "Lu", the Judgment is

> TREADING. Treading upon the Tail of the tiger.
> It does not bite the man. Success.

The Image is

> Heaven above, the lake below:
> The image of TREADING.
> Thus the superior man discriminates between high and low,
> And thereby fortifies the thinking of the people.

And our moving lines are

> Six in the third place means:
> A one-eyed man is able to see,
> A lame man is able to tread.
> He treads on the tail of the tiger.
> The tiger bites the man.
> Misfortune.
> Thus does a warrior act on behalf of his great prince.
>
> Nine in the fourth place means:
> He treads on the tail of the tiger,
> Caution and circumspection
> Lead ultimately to good fortune.
>
> Nine in the fifth place means:
> Resolute conduct.
> Perseverance with awareness of danger.

There are also commentaries on each of these sections, which I won't reproduce here out of a desire for brevity: they help interpret these somewhat inpenetrable allusions. Now to the meditation.

## An Interpretation

Having already focused on the casting of the oracle, and calmly consulting the text, I read the Judgement and notice my emotional reaction to it: the Judgement is terse, and should provoke a response from your current state. It's important I think to not try to control or mediate this reaction, but instead to proceed in proper course to the Image, and lay that reaction over the vision it portrays of a scene, usually of nature or something humble. 

In this case, there is a great contrast between the heights of Heaven and the low-seeking nature of water: the Yin and the Yang are not gray at all, but the brightest of white and the darkest of black. This is a difficult situation, because the strong and the weak are right next to each other, the weak infringing on the strong. The strong, the I Ching says, are to endure this with magnanimity and decorum: a confident tiger won't swat at the mouse. The commentaries on the Judgement and the Image in the I Ching, here, note the playfulness this interaction can have, like when an adult lets a child climb over them: fortune comes through forebearance.

Having read this part, I spend a minute to let these concepts free-associate with whatever seems to leap into my mind, and rotate the scene around in my head a bit and note what is most evocative. I tend to make sure to at least 'suggest' topics of family, work, love, and anxieties I might have at the time, but I don't linger or try to force it: the aim is to see what resonates most. Today, I found myself thinking of a few people in my life who are testing me in different ways, as well as a person whom I might be vexing now, and contemplating how I can encourage a playful rather than fraught interaction with them.

I find that the last step is to consult the moving Lines, as they will help provide context for how to address the general situation described in the Judgement and the Image, although sometimes they instead serve to change the nature of the hexagram entirely: in the latter case, the image I formed in the prior step is a 'setup' to be shocked by the contrast in what the hexagram is moving into. That is the case somewhat in today's reading.

Our lines suggest that the playfulness in the Treading is a bit lacking: the adult is getting annoyed at the roughhousing child, and patience is being tested. The six in the third place is particularly resonate: perhaps I am at risk of being hamfisted and awkward in dealing with others, my good intentions causing unrest in others. I should Tread lightly, and be more aware of the small things I do. Further, the commentaries recommend that I know whether I am the Tiger or the Treader, and to behave with forebearance if I am the Tiger: to forgive people who vex me.

I hold back some of my musings here because this is a public blog, and there is quite a lot of personal introspecting during a self-reading that I don't care to share. But suffice to say it gives me a focus and theme by which to reflect on the people who are figuring prominently in my life and investigating how I feel about them, as well as how I feel about myself in relation to the world.

After a period of contemplation on such, the reading is concluded.

## Final thoughts

The principal point of divination methods is, I believe, to create a focus outside of yourself that you can contrast to how you were previously thinking the world was shaped. Much like prayer after reading scripture for a Christian, or mindful meditation, or pondering nature quietly, it's important for people to have access to a calm conversation with the universe that has freedom to challenge your emotional state. I find divinations the least useful when you use them as a justificatory device: it is precisely the parts of the divination that resonate but are different from how you were thinking about things which you should weigh more heavily.

In short, I think an Oracle is not a predictor of the future, but a person who will sit on the other end of your dialectic.

The I Ching is also an arbitrary fabrication, an artifact of superstition and obscurantism. It's also presumptuous that I have any insight into it at all: I can't even read it in its original language. Despite my inability to defend its mystical claims, I have a respect for it, and would endorse the wisdom it can encourage in yourself if you consult it.
