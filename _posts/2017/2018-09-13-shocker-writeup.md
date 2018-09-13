---
layout: post
title:	"Shocker Writeup"
date:	2018-09-13 03:00:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - hackthebox
---
<head>
	<title> Blacklight Writup | Vulnhub </title>
</head>
<title> Blacklight Writeup </title>
![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/logo.png)

## i. Port Scan

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/ports.png)

## ii. Enumeration

Starting off with http, browsing to host:

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/http.png)

Nothing interesting, let's see if we can find any hidden directories using `gobuster`

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/gobuster1.png)

Wait... nothing found? That's because of two reasons: 
- gobuster by default does not show pages with 403 Status Codes (Forbidden). 
- the way that this apache is setup is that it'll report directories that do not have a / appended as 404.

Luckily for us, gobuster has those switches built-in. `-f to append directory flashes, and -s <status> for custom status codes`

Running gobuster with those two options:

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/gobuster2.png)

~~~
$ gobuster -u http://10.10.10.56 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 25 -f -s 403
~~~





~~~
Sources / Links:

[0]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[1]: https://www.vulnhub.com/entry/blacklight-1,242/
~~~


