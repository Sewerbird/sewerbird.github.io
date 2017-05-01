---
layout: project
title: Project
tagline: the world of kyahida
---

{% capture target_category %}kyahida_wiki{% endcapture %}

<h2>All {{site.data.ed_projects[include.category].name}} Posts</h2>

{{site.data.ed_projects[include.category].frontpage_blurb}}

<ul class="flex">
{% for post in site.categories[target_category] %}
	<div>
	<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
	{% if post.tagline %}<small> {{post.tagline}}</small>{% endif %}
	</div>
{% endfor %}
</ul>