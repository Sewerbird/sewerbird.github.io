---
layout: page
title: Sewerbird
tagline: Blog & Miscellenae
---
{% include JB/setup %}

<div class="row">
<!-- 0 -->
	{% assign numfeatured = 0 %}
	{% for post in site.posts %}
		{% if post.featured == 1 and numfeatured == 0%}
		{% assign content = post.excerpt %}
		{% assign numfeatured = 1 %}
	<a href="{{ BASE_PATH }}{{ post.url }}" id="featured">
		<div class = "col-sm-6 col-md-4 col-lg-3 frontbox featured well">
			<blockquote>
			  <h2>{{ post.title }}<small>New Post!</small></h2>
			  <p>{{ content }}</p>
			</blockquote>
		</div>
	</a>
		{% endif %}
	{% endfor %}
<!-- 1 -->
	<div class = "col-sm-6 col-md-4 col-lg-3 frontbox">
		<h2>Recent</h2>
		Here are some other recent postings
		<ul class="posts">
			{% for post in site.posts %}
				{% assign recentCNT = 0 %}
		  			{% capture recentCNT %}{% increment recentCNT %}{% endcapture %}
		  			{% assign recentCNT = recentCNT | plus: 0 %}
		      		{% if recentCNT <= 5 %}	
			<li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
					{% endif %}
			{% endfor %}
		  <li><a href="{{BASE_PATH}}archive.html">...more...</a></li>
		</ul>
	</div>

<!-- 2 -->
  	<div class="clearfix visible-sm"></div>
<!-- x -->

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
<!-- x -->

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
<!-- x -->

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
<!-- x -->

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

<!-- 7 -->
	<div class = "col-sm-6 col-md-4 col-lg-3 frontbox">
		<h2 id="ytheader">SewerbirdLP <a href="https://www.youtube.com/channel/UCyxXDStUZPtQgQYAZdKo93w"><img src="http://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png" width="42" height="30"></img></a></h2>
		Here's my latest video: enjoy!
		<div id="ytfeatured"> </div>
	</div>

</div>
<script>
/*
	Stuff for the embedded featured youtube video of mine
*/
var request = new XMLHttpRequest();
request.open('GET', 'https://gdata.youtube.com/feeds/api/users/UCyxXDStUZPtQgQYAZdKo93w/uploads?max-results=1&alt=json&orderby=published', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    for(var i in data.feed.entry){
		var link = data.feed.entry[i].id["$t"].split("/")
		link = link[link.length-1]
		var tgt = document.getElementById("ytfeatured");
		var twid = window.getComputedStyle(tgt).width
		var frame = document.createElement("iframe")
		frame.setAttribute("title","YouTube video player")
		frame.setAttribute("width",twid);
		frame.setAttribute("height",twid / (4.0/3.0));
		frame.setAttribute("src","http://www.youtube.com/embed/"+link)
		frame.setAttribute("frameborder",0)
		frame.setAttribute("allowfullscreen",true)
		frame.setAttribute("id","ytfeaturedplayerrecent")
		//var titletgt = document.getElementById("ytheader")
		//var title = document.createTextNode(data.feed.entry[i].title["$t"])
		//titletgt.appendChild(title)
		tgt.appendChild(frame)
	}
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  /* There was a connection error of some sort */
};

request.send();

window.onresize = resize;

function resize(){
	var con = document.getElementById("ytfeatured");
	console.log(twid)
	var twid = window.getComputedStyle(con).width;
	if(typeof twid !== "number") twid = twid.replace(/px/g,'');
	var tgt = document.getElementById("ytfeaturedplayerrecent");
	console.log(twid)
	tgt.setAttribute("width",Math.min(twid,1920));
	tgt.setAttribute("height",Math.min(twid / (4.0/3.0),1080));
}
</script>