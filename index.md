---
layout: page
subtitle: home
---

<table class="toc" cellpadding="0" border="0" cellspacing="0">
  <tr>
      <th>
        <object id="siteLogo" 
          class="center" 
          data="assets/animatedSiteLogo.svg" 
          type="image/svg+xml" 
          style="width:30px;" 
          alt="sewerbird" ></object>
      </th>
      <th>
        <span class="title">Sewerbird</span>
      </th>
      <th>
        <a href="/about" class="about_button">About</a>
      </th>
  </tr>
  <tr>
    <td class="featured" colspan="3">
      {% assign featured_count = 0 %}
      {% for featured_post in site.categories.featured %}
        {% if featured_count < 1 %}
      <a class="featured card" href="{{ BASE_PATH }}{{ featured_post.url }}">
        <div>
        {{ featured_post.title }} <span class="tagline">{{ featured_post.tagline }}</span> <span class="featured_tag">Featured</span>
        </div>
        <div class="excerpt">{{featured_post.excerpt | markdownify | strip_html | truncate: 250}}</div>
      </a>
        {% endif %}
      {% endfor %}
    </td>
  </tr>
  <tr><td class="break" colspan="3"></td> </tr>
  <tr>
    <table class="toc">
      {% assign linkcount = 1 %}
      {% for post in site.posts %}
      <tr> 
          <td>
            {{linkcount}}.
          </td>
          <td>
            <a class="post_title" href="{{ BASE_PATH }}{{ post.url }}"> {{ post.title }}
            <span class="tagline">{{ post.tagline | markdownify | strip_html | truncate: 50 }}</span>
            </a>
          </td>
          <td>
            <a href="/content/{{post.category}}">{{ post.category }}</a>
          </td>
      </tr>
      {% assign linkcount = linkcount | plus: 1 %}
      {% endfor %}
    </table>
  </tr>
</table>
