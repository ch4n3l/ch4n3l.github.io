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

Navigating to `/sev-home`:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/http.png)

We are presented with basic authentication. 

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/basic.png)

If we look at the source of the index, we see there is a javascript file: `terminal.js`

Navigating to the file, we see a comment:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/comment.png)

~~~
[insert message here]
~~~

The password looks like it is encoded in HTML.

We can use Burp to decode the string:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/decode.png)

We now have credentials, `boris:InvincibleHack3r`

Attempting to use the credentials for /sev-home/:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/access.png)

We are able to gain access.

sev-home seems tobe a landing page which has a couple hints:

Hint #1: ~~~ Please email a qualified GNO supervisor to receive the online GoldenEye Operators Training to become an Administrator of the GoldenEye system ~~~

which is followed up by:

Hint #2: ~~~ Remember, since security by obscurity is very effective, we have configured our pop3 service to run on a very high non-default port ~~~
