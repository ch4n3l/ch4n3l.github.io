---
layout: post
title:	"Bank Writeup"
date:	2018-09-13 03:00:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - hackthebox
---
<head>
	<title> Bank Writeup | HackTheBox </title>
</head>

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/logo.png)

## i. Port Scan

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/ports.png)

## ii. Enumeration / Low Priv Shell

Starting off with http, we navigate to the host:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/apache.png)

We see the default apache page. 

The reason we see the default apache page is because Apache is using Virtual Hosting.

~~~
https://httpd.apache.org/docs/trunk/vhosts/examples.html
~~~

If we edit our hosts file (`/etc/hosts`), this is the local DNS in Linux.

We add bank.htb along with the IP:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/hosts.png)

~~~
Knowing to edit the hosts file is a little trivial. I guess DNS being open was some sort of a hint?
~~~

Now navigating to bank.htb:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/bank.png)

Time to run a gobuster, and see if there are any other directories / PHP files:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/gobuster.png)

Navigating to any of these pages redirects us back to /login.php

Let's try grabbing the source of support.php with curl:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/source.png)

Looks like the page has content, but we're being redirected.

The way we can see what's on the page is by using a web proxy.

For some reason Burp was not returning the response code and was automatically sending a GET request to login.php, so I used `zap`.

Navigate to support.php:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/302.png)

Change the 302 to 200, and the page should load without redirecting:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/200.png)

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/fileupload.png)

Looks like we have a place where we can upload files. If we noticed from the source earlier, there's a message:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/htb.png)

So the extension .htb, gets treated as .php. 

I'm going to use a php reverse shell, rename it to shell.htb, and upload the shell.

~~~
http://pentestmonkey.net/tools/web-shells/php-reverse-shell
~~~

After uploading the shell, you will be redirected back to login.php

Now you can access your uploaded shell on `http://bank.htb/uploads/shell.htb' and the listener should catch it:

![Screenshot]({{ site.baseurl }}/images/posts/2017/bank/shell.png)








~~~
Sources / Links:
[0]: https://www.symantec.com/connect/blogs/shellshock-all-you-need-know-about-bash-bug-vulnerability
[1]: https://security.stackexchange.com/questions/68122/what-is-a-specific-example-of-how-the-shellshock-bash-bug-could-be-exploited
[2]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[3]: https://netsec.ws/?p=337
~~~


