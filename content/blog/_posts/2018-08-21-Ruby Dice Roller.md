---
layout : post
date : '2018-08-21T16:55:00.000+08:00'
title : 'Ruby Dice Roller'
tagline: Crazy Dice in the Terminal
assets: assets/Sewerdice2018
---

A few weeks ago, I decided to roll my own custom dice roller, and use it to analyze the statistical properties of various dice rolls common in roleplaying games.

## Parsing

It is common in tabletop roleplaying games to roll dice, and the procedure for rolling dice can be surprisingly ornate. Towards this end, we can specify a 'syntax' that describes the procedure: common expressions like `1d20+3`, for example, means to roll a single twenty-sided dice and add 3 to the result. This is essentially a language, so I decided to create a parser and evaluator for a hand-rolled dice syntax.

The first step is to create a [BNF](https://en.wikipedia.org/wiki/Backus–Naur_form) grammar describing the dice syntax. Here is what I came up with:

```
expression := ( expression ) | expression operator expression | dicestatement
dicestatement := rollmagnitude d dicesize verblist | naturalnumber
verblist := 0 | verb verblist
rollmagnitude := natural_number
dicesize := natural_number
verbparameter := natural_number
verb := modifier verbparameter
comparator := > | < | >= | <= | ==
operator := + | - | * | / | % | ^ | > | < | >= | <= | == | and | or
modifier := D | DL | DH | K | KL | KH | R | RL
  Note: P is the numeric parameter passed in
    D -> drop lowest P dice
    DH -> drop highest P dice
    DL -> drop lowest P dice
    K -> keep highest P dice
    KH -> keep highest P dice
    KL -> keep lowest P dice
    R -> reroll dice <= P
    RR -> repeatedly reroll dice <= P
    m -> set dice lower than P to P
    E -> explode dice >= P
    RE -> repeatedly explode dice >= P
naturalnumber := 1, 2, 3, ...
```

This leads pretty naturally to how we can implement a parser: for every definition, we implement a parse function. For example, here is the function for the `dicestatement`

```ruby
DiceStatement = Struct.new(:dice_size, :roll_magnitude, :verbs) do end
# ...
def parse_dicestatement(scanner)
  mag = parse_rollmagnitude(scanner)
  z = scanner.skip(/d/)
  if z.nil? then #not a dice statement, but a literal!
    return mag.to_i
  end
  die = parse_dicesize(scanner)
  verbs = []
  verb = parse_verb(scanner)
  while not verb.nil? do
    if verb then verbs << verb end
    verb = parse_verb(scanner)
  end

  DiceStatement.new(die,mag,verbs)
end
```

Here, the `scanner` is an object that is consuming the input string character by character, and deciding what to do based on what itfinds. This follows very closely our BNF: a dice statement expects a `rollmagnitude`, a `d`, and then a `dicesize`, then a list of verbs. It can also be a literal number instead of a dice roll, so you see the check that `d` is present: if not, we assume it's a number, since that's the only valid alternative.

Similar functions are written for each other grammar definition: it's fairly straightforward for each particular function, but when they work together it produces very useful results. The goal of each function is to return a 'node' representing a bit of computation to do. These nodes might be a single value, represent a numeric operation to perform, or to group subsequent terms into a bigger unit. These are then connected in a tree structure, by specifying LEFT and RIGHT descendent nodes: an `add` operator has a left and right node, representing the two operands for it to add together, for example.

## Evaluating

In a similar way to parsing, we can then write a function for each kind of node we expect to see. For our dice roller, we always expect to see a dicestatement of some kind, or an expression involving them:

```ruby
def eval (tree,options)
  puts "Evaluating #{tree}" if options[:verbose]
  if tree.is_a?(DiceStatement)
    eval_dicestatement(tree,options) 
  elsif tree.is_a?(Expression)
    eval_expression(tree,options)
  else #literal
    tree
  end
end
```

For expressions, we have the general behaviour of applying an operation to a left and right hand side. You can see that transparently in the code below: it asks what the values of its left and right-hand side are, and then figures out what operation to perform based on the node's `op`:

```ruby
def eval_expression(exp,options)
  puts "Evaluating expression #{exp}" if options[:verbose]
  l = exp[:lefthand]
  l = if l.is_a?(DiceStatement) then 
        eval_dicestatement(l,options)
      elsif l.is_a?(Expression) then
        eval_expression(l,options)
      else
        l
      end
  r = exp[:righthand]
  r = if r.is_a?(DiceStatement) then 
        eval_dicestatement(r,options) 
      elsif r.is_a?(Expression) then
        eval_expression(r,options) 
      else
        r
      end
  op = exp[:op]
  if op then
    if op == :+ then
      l + r
    elsif op == :- then
      l - r
    elsif op == :* then
      l * r
    elsif op == :/ then
      l / r
    elsif op == :% then
      l % r
    elsif op == :^ then
      l ^ r
    elsif op == :>= then
      l >= r
    elsif op == :<= then
      l <= r
    elsif op == :> then
      l > r
    elsif op == :< then
      l < r
    elsif op == :and then
      l and r
    elsif op == :or then
      l or r
    end
  end
end
```

The most fun operation is that for the `dicestatement`: it applies all the tricky dice manipulations we want to support, like dropping the lowest dice, re-rolling 6's, rolling extra dice if we roll high, and so on. We set it up with:

```ruby
def eval_dicestatement(ds,options)
  puts "Evaluating dicestatement #{ds}" if options[:verbose]
  rolls = ds[:roll_magnitude].times.map do 
    if ds[:dice_size] >= 1 then rand(ds[:dice_size])+1 else 0 end
  end
  #Sort for convenience
  rolls.sort!
  raw_rolls = rolls
  #Do Verb
  ds[:verbs].each do |verb|
    op = verb[:op]
    p = verb[:param]
```

And then we go through all the verbs associated with the `dicestatement` and implement their behaviour: 

### Dropped/Kept Dice

```ruby
    if op == :D || op == :DL then
      rolls = rolls.slice(p,rolls.size)
		elsif op == :DH then
      rolls = rolls.slice(0,rolls.size-p)
    elsif op == :K || op == :KH then
      rolls = rolls.slice(rolls.size-p,rolls.size)
    elsif op == :KL then
      rolls = rolls.slice(0,p)
```

Here we take off the lowest dice, taking advantage of the fact we sorted the array of dice rolls. We do the opposite for dropping the highest dice. "Keep Highest/Lowest" are very similar in concept, so are implemented similarly.

### Rerolled Dice

```ruby
		elsif op == :R then
			rolls = rolls.map {|e| 
			  e = rand(ds[:dice_size])+1 if e <= p
				e 
			}
		elsif op == :RR then
			rolls = rolls.map {|e| 
				while e <= p do e = rand(ds[:dice_size])+1 end
				e 
			}
```

Re-rolled dice are implemented by running over the list of rolls and re-doing the roll. Simple!

### Exploding Dice

```ruby
    elsif op == :E then
      rolls.select {|e| e >= p}.each do |e| 
        last_roll = rand(ds[:dice_size])+1
        puts "Exploding dice (#{e}) yields a #{last_roll}" if options[:show_rolls]
        rolls << last_roll
        rolls.sort!
      end
    elsif op == :RE then
      rolls.select {|e| e >= p}.each do |e| 
        last_roll = rand(ds[:dice_size])+1
        puts "Exploding dice (#{e}) yields a #{last_roll}" if options[:show_rolls]
        rolls << last_roll
        rolls.sort!
        while last_roll >= p do
          last_roll = rand(ds[:dice_size])+1
          puts "Exploding dice (#{e}) yields a #{last_roll}" if options[:show_rolls]
          rolls << last_roll
          rolls.sort!
        end
      end
```

Some game systems let you add a new dice to the roll if you roll a 6 or such. We implement that here by first checking if any dice are above or beyond the 'explode' threshold, adding it to the roll array.


Finally, we add up all the dice and return the result. Once we run `eval` on our input string, that's all we need.

## Execution

You can see it in action here, where I roll 4 ten-sided dice and reroll 6's:

<figure style="width: 100%">
  <img
   src="{{site.url}}/{{page.assets}}/SewerdiceScreenie01.png"
   alt=""
   width="100%"
   />
</figure>

In this screenshot, I have the program be very verbose about how it evaluates the expression, and you can see it break it down into smaller chunks as it traverses the tree. It then reports the rolls, and then the final total. Full source is available [HERE]({{site.url}}/{{page.assets}}/sewerdice).

This was a fun bit of ad-hoc scripting, but there are better ways to go about it, particularly in parsing. Most efforts to create a parser involve a tokenizer, which I skipped over to hack out this script. In reality, though, a proper tokenizer makes the parsing functions much easier to right, because they then are operating over logical 'words' rather than individual characters. It also avoids a large class of bugs you might run into trying to author without. I'm sure I'll revisit this at some point, and do it correctly, possibly with something like [ANTLr](http://www.antlr.org). Thanks for reading this quick writeup!
