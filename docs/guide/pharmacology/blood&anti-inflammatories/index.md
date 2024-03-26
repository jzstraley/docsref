---
title: Blood & Anti-Inflammatories
author: J. Austin Straley, DO
layout: post
date: 2023-03-30
published: true
permalink: /blood&anti-inflammatories
resource: true
categories: [Medications]
---

<ul>
  {% for page in site.pages %}
    {% if page.resource == true %}
      {% for pc in page.categories %}
        {% if pc == "Blood & Anti-Inflammatories" %}
          <li><a href="{{ page.url }}">{{ page.title }}</a></li>
        {% endif %}   <!-- cat-match-p -->
      {% endfor %}  <!-- page-category -->
    {% endif %}   <!-- resource-p -->
  {% endfor %}  <!-- page -->
</ul>