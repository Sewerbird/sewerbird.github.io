---
layout: project
title: Project
tagline: sewerbird blog
---

## All Posts

Here are all the blog posts on the site that do not strictly pertain to any specific project:

<ul class="flex">
{% assign linkcount = 0 %}
{% for post in site.categories.blog %}
	<div>
	<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
	{% if post.tagline %}<small> {{post.tagline}}</small>{% endif %}
	</div>
{% endfor %}
</ul>