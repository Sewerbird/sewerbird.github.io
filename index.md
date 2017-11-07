---
layout: default
subtitle: home
---

<div class="flex flex_center_justified one two-600 three-900 four-1200 demo">
	<!-- Introductory Jumbo -->
	<div class="noback card">
		<img class="center" src="assets/icon250px.png" alt="sewerbird" >
		<h1 class="center">Sewerbird</h1>
		<h2 class="center"><small>Blog &amp; Miscellenae</small></h2>
	</div>
	<!-- Featured Card -->
	{% assign featured_count = 0 %}
	{% for featured_post in site.categories.featured %}
		{% if featured_count < 1 %}
	<a class="borderless card" href="{{ BASE_PATH }}{{ featured_post.url }}" >
		<header>
			<h2>{{ featured_post.title }}</h2>
		</header>
		<footer>
			<h2><small>{{ featured_post.tagline }}</small></h2>
			<p class="featured_text">{{ featured_post.excerpt | markdownify | strip_html }}</p>
			<span style="float:right;margin-bottom:1.0em">...click for more!</span>
		</footer>
	</a>
		{% endif %}
	{% endfor %}
	<!-- Project Cards -->
	{% for con in site.data.projectorder %}
	{% assign project = site.data.ed_projects[con] %}
	<div class="project card">
		<header>
			<a href="{{ BASE_PATH }}{{ project.project_page }}"><h2>{{project.name}}</h2></a>
		</header>
		<footer>
			<small>{{project.frontpage_blurb}}</small>
			<ul>
			{% assign linkcount = 0 %}
			{% for post in site.categories.[project.category] %}
				{% if linkcount < 5 %}
				<li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
				{% endif %}
		  		{% assign linkcount = linkcount | plus: 1 %}
			{% endfor %}
			</ul>
		</footer>
	</div>
	{% endfor %}
</div>
