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
	<title> Shocker Writeup | Vulnhub </title>
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

Seems like we found a new directory, `cgi-bin`, navigating to it we get the 403 mentioned before.

Let's see if we can use gobuster to find any files in the directory. Typically there are .sh files in /cgi-bin/, so we can use `-x` in gobuster for custom extensions.

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/gobuster3.png)

Navigating to user.sh:

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/download.png)

Downloading the file, and looking at the contents, we can see that the script is executing uptime when being called:

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/uptime.png)

Let's try testing if the page is vulnerable to Shellshock since bash is involved.

~~~
Two great reads on how Shellshock works & how it's exploited:
https://www.symantec.com/connect/blogs/shellshock-all-you-need-know-about-bash-bug-vulnerability
https://security.stackexchange.com/questions/68122/what-is-a-specific-example-of-how-the-shellshock-bash-bug-could-be-exploited
~~~

Using Burp's repeater would make this easier, as we do not have to download the file every time to see the output:

![Screenshot]({{ site.baseurl }}/images/posts/2017/shocker/burp1.png)










~~~
Sources / Links:

[0]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[1]: https://www.vulnhub.com/entry/blacklight-1,242/
~~~


