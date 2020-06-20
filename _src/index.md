---
---

<% @thoughts.keys.sort.reverse.take(1).each do |thought_key| %>
<blockquote>
  "<%= @thoughts[thought_key]['text'] %>" 
  <footer>- a thought I had <%= Kronic.format(DateTime.parse(@thoughts[thought_key]['time'])).downcase %></footer>
</blockquote>
<% end %>
[[Learn Kyahidan!]](kyahidan language)
<h3 style="float:right; font-size:1.0em">Featured Article</h3>
<section id="featured_article">
  <h1><%= @featured_post[:frontmatter]['title'] %></h1>
  <%= @featured_post[:html] %>
</section>
