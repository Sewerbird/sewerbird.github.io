---
layout: page
subtitle: home
---

<div class="center flex flex_no_wrap demo" style="flex-wrap: nowrap; align-content: stretch">
  <div>
    <!-- Introduction Sidebar -->
    <div class="card">
      <header>
        <object id="siteLogo" 
          class="center" 
          data="assets/animatedsiteLogo.svg" 
          type="image/svg+xml" 
          style="width:100%;padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;" 
          alt="sewerbird" ></object>
      </header>
      <footer>
        Welcome to my site! Here you'll find prose, code, and demos that I've written.
        <h3>Status</h3>
        <li>Last updated: {{site.time | date: '%B %-d  %Y'}}</li>
        <li>Location: Shanghai</li>
        <h3>Me on the Web</h3>
        <li><a href="/about">Resume</a></li>
        <li><a href="https://github.com/sewerbird">Github</a></li>
        <!--li><a href="https://sewerbird.linkedin.com">LinkedIn</a></li-->
        <li><a href="https://www.youtube.com/channel/UCyxXDStUZPtQgQYAZdKo93w?">Youtube (Older)</a></li>
        <h3>Recommended Sites</h3>
        <li><a href="https://tokylabs.com">Tokylabs (Shanghai/Barcelona)</a></li>
        <li><a href="https://coderbunker.com/members">Coderbunker (Shanghai)</a></li>
        <li><a href="https://xinchejian.com">Xinchejian (Shanghai)</a></li>
        <h3>Recent Tech Tinkered With</h3>
        <li><a href="https://moonscript.org">Moonscript</a></li>
        <li><a href="https://love2d.org">Löve2d</a></li>
        <li><a href="https://www.celestron.com/products/skymaster-15x70-binocular">Urban Stargazing</a></li>
      </footer>
    </div>
  </div>
  <div class="center flex flex_wrap demo" style="align-content: flex-start">
    <!-- Featured Cards -->
    {% assign featured_count = 0 %}
    {% for featured_post in site.categories.featured %}
      {% if featured_count < 1 %}
    <a class="featured card" href="{{ BASE_PATH }}{{ featured_post.url }}" style="flex: 2 0px;" >
      <header>
        <h2>{{ featured_post.title }}</h2>
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
        <a class="cardtitle" href="{{ BASE_PATH }}{{ project.project_page }}"><h2>{{project.name}}</h2>
        <span style="position:absolute;bottom:0.5rem;right:0.5rem;"><small>(more)</small></span></a>
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
</div>
