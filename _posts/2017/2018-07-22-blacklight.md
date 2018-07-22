---
layout: post
title:	"Blacklight Writeup"
date:	2018-07-22 03:00:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - vulnhub
---
<title> Blacklight Writeup </title>
![Screenshot]({{ site.baseurl }}/images/posts/2017/blacklight/logo.png)

## i. Port Scan

Full TCP port scan using unicornscan:

![Screenshot]({{ site.baseurl }}/images/posts/2017/blacklight/port.png)

~~~
$ unicornscan -Iv -r 160 -mT IP:a

-Iv = Immediately display results as they are found (-v = verbose)
-r = rate of packets to send per second
-mT = mode TCP
IP = host's ip
a = all (Scan 65535 ports)
~~~

Ports 80 and 9072 are open.

## ii. Enumeration

Starting with port 80, we browse to the host.

![Screenshot]({{ site.baseurl }}/images/posts/2017/blacklight/http.png)

We got a hint, `The web is the way`.

Running a directory search to see if we can find any hidden files or directories:

![Screenshot]({{ site.baseurl }}/images/posts/2017/blacklight/dirsearch.png)

`robots.txt` seems to stand out.

![Screenshot]({{ site.baseurl }}/images/posts/2017/blacklight/robots.png)

Inside, we find flag1.txt and what seems to be a dictionary file.

Navigating to flag1.txt:
![Screenshot]({{ site.baseurl }}/images/posts/2017/blacklight/flag1.png)





















~~~ 

Sources/Links:
~~~
[0]: https://tools.kali.org/information-gathering/unicornscan
[1]: https://www.thegeekdiary.com/what-is-suid-sgid-and-sticky-bit/
[2]: https://unix.stackexchange.com/questions/191940/difference-between-owner-root-and-ruid-euid
~~~


