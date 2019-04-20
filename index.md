---
layout: page
subtitle: home
---

<table class="toc" cellpadding="0" border="0" cellspacing="0">
  <tr>
      <th style="width:30px">
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
        <a href="/about" class="button">About</a>
      </th>
  <tr>
  <table class="toc">
    {% assign linkcount = 1 %}
    {% for post in site.posts %}
    <tr> 
        <td>
          {{linkcount}}.
        </td>
        <td>
          <a href="{{ BASE_PATH }}{{ post.url }}">
            {{ post.title }}
          </a>
        </td>
        <td>
          <span>{{ post.excerpt | markdownify | strip_html | truncate: 80 }}</span>
        </td>
        <td>
          <a href="#">{{ post.category }}</a>
        </td>
    </tr>
    {% assign linkcount = linkcount | plus: 1 %}
    {% endfor %}
  </table>
</table>
