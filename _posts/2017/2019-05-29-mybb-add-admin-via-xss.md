---
layout: post
title:	"myBB - Add Administrator via XSS"
date:	2019-05-29 03:00:00
categories:
    - notes
tags:
    - bug_hunting
    - bug_writeup
    - openbugbounty
---
<head>
	<title> myBB - Add Administrator via XSS </title>
</head>


# i. Introduction
While browsing Twitter, I happened to come upon [hakluke]'s(https://twitter.com/hakluke) blog post about upgrading an XSS from a medium to a critical bug. Long story short it detailed on how an XSS is able to bypass most CSRF protection mechanisms, and completely bypassing the Same Origin Policy. The most popular anti-CSRF mechanism are CSRF tokens. However, Javascript is able to request the form, parse the token, and then send it along with the subsequent request to perform a sensitive action. 

If you would like to read more about how this works, I highly recommend reading hakluke's blog post which can be found here: https://medium.com/@hakluke/upgrade-xss-from-medium-to-critical-cb96597b6cc4

hakluke included several proof of concepts for popular CMS platforms such as Wordpress and Drupal. I decided I wanted to give it a shot, and try testing it with a forum software that we all know and love... myBB. 

There are several reasons why I chose myBB, however the major one was that developers are able to create their own plugins similar as to Wordpress. By allowing developers to create third party plugins, it opens the door for a plethora of bugs, which XSS seems to be common. 


# ii. Exploitation

I have modified hakluke's original Wordpress script to work with myBB. 


Here is a video proof of concept demonstrating it in action:
[video poc]


As always, thank you for reading,
- mqt
