---
---

# Posts

I post stuff time to time on various topics: primarily games, coding, and conworlding.

<ul>
<% @posts.keys.sort.reverse.each do |key| %>
  <% post = @posts[key] %>
  <li>
    (<%= Kronic.format(post[:frontmatter]['datetime']) %>): 
    <a href="/posts/<%=post[:name]%>.html">
      <%= post[:frontmatter]['title'] %> <small><%= post[:frontmatter]['tagline'] %></small>
    </a>
  </li>
<% end %>
</ul>
