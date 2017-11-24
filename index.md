---
layout: default
subtitle: home
---

<div class="center flex flex_wrap demo">
	<!-- Introductory Jumbo -->
	<div class="noback card">
		<img class="center" src="assets/icon250px.png" style="width:100%;padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;" alt="sewerbird" >
		<!--h1 class="center">Sewerbird</h1>
		<h2 class="center"><small>Blog &amp; Miscellenae</small></h2-->
	</div>
	<!-- Featured Card -->
	{% assign featured_count = 0 %}
	{% for featured_post in site.categories.featured %}
		{% if featured_count < 1 %}
	<a class="featured card" href="{{ BASE_PATH }}{{ featured_post.url }}" >
		<header>
			<h2>{{ featured_post.title }}</h2>
      <span style="position:absolute;top:0.5rem;right:0.5rem;color:#397"><small>featured</small></span>
		</header>
		<footer>
			<h3>{{ featured_post.tagline }}</h3>
			<p>{{ featured_post.excerpt | markdownify | strip_html }}</p>
			<span style="position:absolute;bottom:0.5rem;right:0.5rem;">...click for more!</span>
		</footer>
	</a>
		{% endif %}
	{% endfor %}
	<!-- Project Cards -->
	{% for con in site.data.projectorder %}
	{% assign project = site.data.ed_projects[con] %}
	<div class="project card">
		<header>
			<a class="cardtitle" href="{{ BASE_PATH }}{{ project.project_page }}"><h2>{{project.name}}</h2></a>
		</header>
		<footer>
			<p class="cardtext">{{project.frontpage_blurb}}</p>
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
