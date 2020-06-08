---
---

# Thoughts

I keep my personal twitter here. These are fired off by a one-liner in my terminal!

<ul>
<% @thoughts.keys.sort.reverse.each do |thought_key| %>
  <li>
  (<%= Kronic.format(DateTime.parse(@thoughts[thought_key]['time'])) %>): <%= @thoughts[thought_key]['text'] %> 
  </li>
<% end %>
</ul>
