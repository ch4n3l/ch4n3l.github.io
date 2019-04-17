---
layout: blog
title: "notes"
permalink: /notes/
---
<head>
    <title> notes </title>
</head>
<div class="row">
  <div class="col-lg-8 col-lg-offset-2">
    <div class="menu">
      <ul>
          <li><a href="{{ site.baseurl }}/">home</a></li>
          <li><a href="{{ site.baseurl }}/notes">notes</a></li>
          <li><a href="{{ site.baseurl }}/writeups">writeups</a></li>
          <li><a href="{{https://www.google.com}/oscp-notes">oscp-notes</a></li>
      </ul>
    </div>
  </div>
</div>
<ul class="posts">
    {% for post in site.categories.notes %}
        <li>
            <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
            ::
            <a class="post-link" href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
            @ {
            {% assign tag = post.tags | sort %}
            {% for category in tag %}<span><a href="{{ site.baseurl }}category/#{{ category }}" class="reserved">{{ category }}</a>{% if forloop.last != true %},{% endif %}</span>{% endfor %}
            {% assign tag = nil %}
            }
        </li>
    {% endfor %}
</ul>
