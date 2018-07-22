---
layout: post
title:	"Goldeneye Writeup"
date:	2018-07-14 03:00:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - vulnhub
---
<head>
	<title> Goldeneye Writeup | Vulnhub </title>
</head>

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/logo.png)

##i. Port Scan

Using unicornscan to scan all TCP ports:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/ports.png)

~~~
$ unicornscan -Iv -r 160 -mT 10.0.2.10:a

If you are unsure of what the command does, refer to my other writeup which explains it in more detail:
https://ch4n3l.github.io/writeups/blacklight/
~~~

`Ports 80 (http), 25 (smtp), 55006 (unknown) & 55007 (unknown) found. `

##ii. Enumeration

Starting off with port 80, we browse to the host and are presented with:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/http.png)


