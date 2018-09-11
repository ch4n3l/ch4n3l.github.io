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

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/logo.png)

## i. Port Scan

Using nmap to scan the ports:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/portscan.png)

`Ports 80 (http) & 22 (ssh) are open.`

## ii. Enumeration

Starting off with port 80, we browse to the host and are presented with:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/http.png)

We can see that Wordpress is running, which means it's time for wpscan!

wpscan returns the Wordpress Version, and other vital information such as vulnerabilities, themes, plugins, and users.

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/wpscan.png)

All the vulnerabilities, require an authenticated user, and we can see that wpscan returns a user:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/wpscan-user.png)

We can also use wpscan to bruteforce the user:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/wpscan-bruteforce.png)

I'm going to save you some time, the password is not in rockyou... so let's move on.

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/wpscan-userforce.png)

~~~
Sources / Links:

[0]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[1]: https://www.vulnhub.com/entry/goldeneye-1,240/
~~~




