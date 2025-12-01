---
layout: archive
title: 归档
permalink: /archive/
---

{% assign posts_by_year = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}

{% for year in posts_by_year %}
### {{ year.name }} 年
  {% assign posts_by_month = year.items | group_by_exp:"post", "post.date | date: '%m'" %}
  {% for month in posts_by_month %}
#### {{ month.name }} 月
<ul>
    {% for post in month.items %}
    <li>{{ post.date | date: "%Y-%m-%d %H:%M" }} — <a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
  {% endfor %}
{% endfor %}