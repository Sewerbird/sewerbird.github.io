---
layout: page
title: Welcome!
tagline: Let me show you around
---
{% include JB/setup %}


<div class="row">
	<div class = "col-md-12">
	Thanks for looking around my personal site: I store some of my hobby projects' output here, and hope you find something of interest. I've tracked down as many old forum posts and blog pages of mine as I could scrounge up and slipped them into categories here.
	</div>
</div>

<div class="row">

	<div class = "col-sm-6 col-md-4 col-lg-3">
	<h2>Recent</h2>
	<!--Here are my most recent postings.-->

		<ul class="posts">
			{% for post in site.posts %}
				{% assign recentCNT = 0 %}
		  			{% capture recentCNT %}{% increment recentCNT %}{% endcapture %}
		  			{% assign recentCNT = recentCNT | plus: 0 %}
		      		{% if recentCNT <= 5 %}	
	    <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
	    			{% endif %}
			{% endfor %}
		  <li><a>...more...</a></li>
		</ul>
	</div>

	<div class = "col-sm-6 col-md-4 col-lg-3">
	<h2>Nendsame RPG</h2>
	<!--I worked on a reboot of a prior table-top role-playing game I had designed myself and played with my friends in college in a blog in late 2012. I pulled the posts off the blog and placed them here.-->
		<ul class="posts">
		  {% for post in site.posts %}
		     {% assign nendsamerpgCNT = 0 %}
		  	{% for pc in post.categories %}
		  		{% if pc == "nendsame rpg" %}
		  			{% capture nendsamerpgCNT %}{% increment nendsamerpgCNT %}{% endcapture %}
		  			{% assign nendsamerpgCNT = nendsamerpgCNT | plus: 0 %}
		      		{% if nendsamerpgCNT <= 5 %}
		    <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
		    		{% endif %}
		  		{% endif %}
		  	{% endfor %}
		  {% endfor %}
		  <li><a href="{{BASE_PATH}}categories.html#nendsame rpg-ref">...more...</a></li>
		</ul>
	</div>

  	<div class="clearfix visible-sm"></div>

	<div class = "col-sm-6 col-md-4 col-lg-3">
	<h2>Kyahida</h2>
	<!--Kyahida was a fictional language whose syntax I worked on for a while in early 2014 on the <a href="http://www.incatena.org">zompist bulletin boards</a>. I'll likely revisit it at some point!-->
		<ul class="posts">
		  {% for post in site.posts %}
		     {% assign kyahidaCNT = 0 %}
		  	{% for pc in post.categories %}
		  		{% if pc == "kyahida" %}
		  			{% capture kyahidaCNT %}{% increment kyahidaCNT %}{% endcapture %}
		  			{% assign kyahidaCNT = kyahidaCNT | plus: 0 %}
		      		{% if kyahidaCNT <= 5 %}
		    <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
		    		{% endif %}
		  		{% endif %}
		  	{% endfor %}
		  {% endfor %}
		  <li><a href="{{BASE_PATH}}categories.html#kyahida-ref">...more...</a></li>
		</ul>
	</div>

  	<div class="clearfix visible-md"></div>

	<div class = "col-sm-6 col-md-4 col-lg-3">
	<h2>Old Hobby Blog</h2>
	<!--I had a sporadic blog where I talked about my hobbies when I had moved back to the US. Has some Dungeons & Dragons and Warhammer.-->
		<ul class="posts">
			{% for post in site.posts %}
				{% assign oldHobbyCNT = 0 %}
				{% for pc in post.categories %}
					{% if pc == "oldblog" %}
			  			{% capture oldHobbyCNT %}{% increment oldHobbyCNT %}{% endcapture %}
			  			{% assign oldHobbyCNT = oldHobbyCNT | plus: 0 %}
			      		{% if oldHobbyCNT <= 5 %}	
		    <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
		    			{% endif %}
		    		{% endif %}
				{% endfor %}
			{% endfor %}
		  <li><a href="{{BASE_PATH}}categories.html#oldblog-ref">...more...</a></li>
		</ul>
	</div>

  	<div class="clearfix visible-lg"></div>
  	<div class="clearfix visible-sm"></div>

	<div class = "col-sm-6 col-md-4 col-lg-3">
	<h2>China Blog</h2>
	<!--I kept a pretty regular blog of my first time living in China. I've exported it from its old site and put it here for posterity. Mostly for personal and historical interest :-) -->
		<ul class="posts">
			{% for post in site.posts %}
				{% assign prcblogCNT = 0 %}
				{% for pc in post.categories %}
					{% if pc == "prcblog" %}
			  			{% capture prcblogCNT %}{% increment prcblogCNT %}{% endcapture %}
			  			{% assign prcblogCNT = prcblogCNT | plus: 0 %}
			      		{% if prcblogCNT <= 5 %}	
		    <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
		    			{% endif %}
		    		{% endif %}
				{% endfor %}
			{% endfor %}
		  <li><a href="{{BASE_PATH}}categories.html#prcblog-ref">...more...</a></li>
		</ul>
	</div>
</div>