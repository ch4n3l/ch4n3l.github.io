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

Note: This machine has multiple ways to root.

## i. Port Scan

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/ports.png)

## ii. Enumeration / Low Priv Shell

Port 10000 (Webmin) looked interesting to me.

Navigating in the browser:

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/webmin.png)

Webmin uses the local accounts on the server to login. 

While enumerating Webmin, I noticed that requests are processed by CGI:

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/cgi.png)

Could this potentially be vulnerale to Shellshock?

Attempting to use a payload which will print the user if successful:

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/cgi.png)

Looking at the page, it seems that nothing has changed:

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/webmin.png)

Let's try using a blind payload, which does not rely on the output. `An example of some blind commands: sleep, wget.`

I'm going to use wget, and setup a HTTP server using python and see if the request gets made. (Assuming wget is installed on the host)

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/webmin.png)

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/request.png)

We see that the host is trying to download a file off our host, which means we have code execution!

Replacing the Shellshock payload with a `bash reverse shell one-liner`:

~~~
More reverse shell one-liners:
http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
~~~

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/oneliner.png)

After sending the request, if we look at our listener:

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/shell1.png)

We successfully got a reverse shell.

And it looks like we are already root:

![Screenshot]({{ site.baseurl }}/images/posts/2017/beep/root1.png)









~~~
Sources / Links:
[0]: https://www.symantec.com/connect/blogs/shellshock-all-you-need-know-about-bash-bug-vulnerability
[1]: https://security.stackexchange.com/questions/68122/what-is-a-specific-example-of-how-the-shellshock-bash-bug-could-be-exploited
[2]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[3]: https://netsec.ws/?p=337
~~~


