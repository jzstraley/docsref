---
title: Cardiovascular-Renal
author: J. Austin Straley, DO
layout: post
date: 2023-03-30
published: true
permalink: /cardiovascular-renal
resource: true
categories: [Medications]
---

<ul>
  {% for page in site.pages %}
    {% if page.resource == true %}
      {% for pc in page.categories %}
        {% if pc == "Cardiovascular-Renal" %}
          <li><a href="{{ page.url }}">{{ page.title }}</a></li>
        {% endif %}   <!-- cat-match-p -->
      {% endfor %}  <!-- page-category -->
    {% endif %}   <!-- resource-p -->
  {% endfor %}  <!-- page -->
</ul>