---
layout : post
date : '2017-08-06T11:00:00.000+8:00'
title : 'Kyahidan Geneology'
tagline: 'Part One: Around the Village' 
category: kyahida
---

I've been working on the automatic creation of people to live in Kyahida, and part of this is about generating their family histories. Here's an overview of my progress!

## Context

My Kyahida project has a pretty deep scope, and includes among its objectives a detailed model of its inhabitants' circumstances: where does a Kyahidan live? who do they live with? who are their partners and children? what are their daily tasks? and where are they from? To answer this, I've written up a simple simulation in the Lua scripting language that takes a set of ancestors and runs 'through time', having these ancestors reproduce, raise families, and pass away. Some number of years later, I halt the script and have a list of people who are related to each other, achieving a basic census with geneological information. I've also made a kind of map that will show where people live using this output!

## Methods

To start with, I define a couple 'tribes'. These are merely population buckets, amongst which I distribute some randomly-created people. Each person has an age, gender, genome (more on this in a bit), and name. With this initial random population sorted amongst tribes, I start to simulate time.

Each year, I have defined a probability of different events happening for an individual. For example, individuals of marriageable age have a chance of marrying; married couples have a chance of producing a child or perhaps getting a divorce; elderly might move in with their children when their spouse passes away; and so on. So, for each year I simulate, I check each person to see if the various events they are eligible for happen.

Everyone ages each year, and death is always a possibility. Since I'm simulating a pre-modern society, infant mortality rates are quite high, with a second bump in mortality rate for young men (combat) and young women (pregnancy). If you survive to adulthood, however, I have the actuarial rates set up that you'll live to a pretty decent age.

Another thing that happens is mating. Each year, I simulate a 'marriage market' which all eligible bachelors and bachelorettes (and unfaithful spouses) have a chance of participating in. For the year, all participants are partitioned by Gender, and then sorted by a general attractiveness figured by their genome, and paired off (handsomest with the most beautiful, next handsomest with the next most beautiful, etc) until there are no more Male-Female pairs to marry off. Remaining grooms (or brides) are left single, and can try again the next year. Marriage markets are local, and sometimes people travel to another location to participate in their marriage market.

Married couples have a chance of conceiving in one year, and either birthing or miscarriaging the next year. This is done until the wife hits menopause.

Finally, everyone has a 'genome' of traits. I have traits right now for how people look: the color of their hair, shape of their eyes, facial shape, and nose. I can expand this arbitrarily, which will be cool (perhaps even personality traits!). But for now it's just physiognomy for a brief description.

## Output

Aside a big ol' data file, I decided to make the data a bit more visual: no one likes to read a big data file. So, I use the graphViz package to create a DOT file from the census data. For each person alive right now, I draw a square (for men) or circle (for women) and then connect them by their relationship. Let's look at a family: 

{:refdef: style="text-align: center;"}
![Graph of Brierton Family. A notched square labelled 'Odus Brierton' points to a circle labelled 'Zoe Nazarian' with a red arrow. The circle points to several other shapes with blue lines, and the square points to shapes outside the image with purple lines. ]({{site.url}}/assets/BriertonFamily.svg)
{: refdef}

Here, we see the family of Odus Brierton and his wife, Zoe Nazarian. The red arrow shows that the two are married, and the blue arrows show Zoe's children: two boys, two girls, and one infant girl who was born just this year. Odus had a wife before Zoe, but she passed away: that's represented by the notched corners of his square. Further, three purple lines lead out of the picture to his three sons by his first wife, each of whom is roughly Zoe's age! Odus is 53 and Zoe is 36 years old.

There are other kinds of relationships not present in the Brierton household: I also show affairs (bright green lines), adoptions (orange lines) and divorces (cyan lines). You can see that in the full 'Town Map' here: you may want to zoom in to explore it better!

{:refdef: style="text-align: center;"}
![Very large graph in the manner of the Brierton Family, with many shapes connected by varied-color lines]({{site.url}}/assets/Briertown.svg)
{: refdef}

A blue line points from a mother to a child. a red line points from a husband to his spouse. orange people are orphans whose parents have died, and orange lines point from an adopter to their foster child. purple lines point from a father to his children if the mother has died, and a green arrow signifies an affair. finally, everyone is grouped into boxes representing households: everyone in the same box 'live with each other' as a family unit.

Finally, I can also spit out the traditional family tree for an individual, like so:

{:refdef: style="text-align: center;"}
![Traditionally shaped family tree showing one person's ancestors (and their ancestors and so on) above as well as descendents below]({{site.url}}/assets/MillyMoralis.svg)
{: refdef}

In this diagram, Milly Moralis is shown in orange with her two kids below her in blue. Her father (going up the red arrow for 'father') is Xavier Moralis and her mother is Diana Vanstraten (going up the blue arrow for 'mother'). Her dead grandparents and great grandparents are shown above that in gray in a similar fashion. As in the prior graphs, each person is listed with their current age, or the age at which they died (if their outline is gray). We can see by the lines that Cassius Seger is Milly's grandfather as well as great grandfather, and this reflects the scandalous fact that Cassius cuckolded two generations of Vanstratens: Mrs. Sucharski's husband John Vanstraten and his second nephew Michael Vanstraten.

## Next Goals

This has been a really fun bit of code to put together, and is quite extensible: you can model matriarchal lineages, show more data (my visualization doesn't show all the data I generate), and change the parameters for marriage, death, and birth rates. 

- I'd like to extend this model with 'spatial awareness' and modify how difficult it is to visit another town. 
- The names are taken from a real-world name list, but I'd like to replace them with real Kyahidan names.
- Further, I'd like to use the same framework to model non-familial relationships, such as professional and trade networks. 
- Finally, I'd like to place each household directly onto a map, and simulate the creation of little townships and pastoral locations.

By layering a bunch of data, I kind of hope that I can detail small fishing villages at quite a high fidelity. This would be neat for getting a sense of the different dramas that might be playing out in a town. 
