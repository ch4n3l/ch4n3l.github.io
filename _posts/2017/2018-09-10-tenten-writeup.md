---
layout: post
title:	"TenTen Writeup"
date:	2018-09-10 03:01:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - hackthebox
---
<head>
	<title> TenTen Writeup | HackTheBox </title>
</head>

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/logo.png)

## i. Port Scan

Using unicornscan to scan all TCP ports:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/ports.png)

~~~
$ unicornscan -Iv -r 160 -mT 10.0.2.10:a

If you are unsure of what the command does, refer to my other writeup which explains it in more detail:
https://ch4n3l.github.io/writeups/blacklight/
~~~

`Ports 80 (http), 25 (smtp), 55006 (unknown) & 55007 (unknown) found. `

## ii. Enumeration

Starting off with port 80, we browse to the host and are presented with:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/http.png)

~~~
Sources / Links:

[0]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[1]: https://www.vulnhub.com/entry/goldeneye-1,240/
~~~




