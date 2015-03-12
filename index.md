---
layout: page
title: Sewerbird
tagline: Blog & Miscellenae
---
{% include JB/setup %}

<div class="row">
<!-- 0 -->
	{% assign post = site.posts.first %}
	{% assign content = post.excerpt %}
	<a href="{{ BASE_PATH }}{{ post.url }}" id="featured">
		<div class = "col-sm-6 col-md-4 col-lg-3 frontbox featured well">
			<blockquote>
			  <h2>{{ post.title }}<small>New Post!</small></h2>
			  <p class="lead">{{ content }}</p><p><i>...(more)...</i></p>
			</blockquote>
		</div>
	</a>
<!-- 1 -->

	<div class = "col-sm-6 col-md-4 col-lg-3 frontbox">
		<h2>Recent</h2>
		Here are some other recent postings
		<ul class="posts">
			{% for post in site.posts %}
				{% assign recentCNT = 0 %}
		  			{% capture recentCNT %}{% increment recentCNT %}{% endcapture %}
		  			{% assign recentCNT = recentCNT | plus: 0 %}
		      		{% if recentCNT <= 6 and recentCNT > 1 %}	
			<li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
					{% endif %}
			{% endfor %}
		  <li><a href="{{BASE_PATH}}archive.html">...more...</a></li>
		</ul>
	</div>

<!-- 2 -->
  	<div class="clearfix visible-sm"></div>
<!--   -->

	<div class = "col-sm-6 col-md-4 col-lg-3 frontbox">
		<h2>Kyahida</h2>
		Kyahida was a conlang I made on <a href="http://www.incatena.org">zompist</a> in a series of posts
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

<!-- 3 -->
  	<div class="clearfix visible-md"></div>
<!--   -->

	<div class = "col-sm-6 col-md-4 col-lg-3 frontbox">
		<h2>Nendsame RPG</h2>
		I worked on a reboot of a prior P&P RPG I had designed myself
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

<!-- 4 -->
  	<div class="clearfix visible-lg"></div>
  	<div class="clearfix visible-sm"></div>
<!--   -->

	<div class = "col-sm-6 col-md-4 col-lg-3 frontbox">
		<h2>Code Toys</h2>
		I'm going to be putting some little javascript toys here soon as quick as I can put them together :)
		<ul class="posts">
			{% for post in site.posts %}
				{% assign codingCNT = 0 %}
				{% for pc in post.categories %}
					{% if pc == "coding" %}
			  			{% capture codingCNT %}{% increment codingCNT %}{% endcapture %}
			  			{% assign codingCNT = codingCNT | plus: 0 %}
			      		{% if codingCNT <= 5 %}	
		    <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
		    			{% endif %}
		    		{% endif %}
				{% endfor %}
			{% endfor %}
		  <li><a href="{{BASE_PATH}}categories.html#coding-ref">...more...</a></li>
		</ul>
	</div>

<!-- 5 -->

	<div class = "col-sm-6 col-md-4 col-lg-3 frontbox">
		<h2>Old Hobby Blog</h2>
		I had a sporadic D&D and Warhammer 40k blog on wordpress for a while
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

<!-- 6 -->
  	<div class="clearfix visible-sm"></div>
  	<div class="clearfix visible-md"></div>
<!-- -->

	<div class = "col-sm-6 col-md-4 col-lg-3 frontbox">
		<h2>China Blog</h2>
		I kept a pretty regular blog of my first time living in China. I've exported and put it here for posterity
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

<!-- 7 --
  	<div class="clearfix visible-sm"></div>
  	<div class="clearfix visible-md"></div>
<---->

</div>