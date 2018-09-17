---
layout: post
title:	"Beep Writeup"
date:	2018-09-13 03:00:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - hackthebox
---
<head>
	<title> Beep Writeup | HackTheBox </title>
</head>

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/logo.png)

Note: This machine has multiple ways of root.

## i. Port Scan

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/ports.png)

## ii. Enumeration / Low Priv Shell

Port 10000 (Webmin) looked interesting to me.

Navigating in the browser:



~~~
Sources / Links:
[0]: https://www.symantec.com/connect/blogs/shellshock-all-you-need-know-about-bash-bug-vulnerability
[1]: https://security.stackexchange.com/questions/68122/what-is-a-specific-example-of-how-the-shellshock-bash-bug-could-be-exploited
[2]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[3]: https://netsec.ws/?p=337
~~~


