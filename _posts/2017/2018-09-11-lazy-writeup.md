---
layout: post
title:	"Lazy Writeup"
date:	2018-09-11 03:01:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - hackthebox
---
<head>
	<title> Lazy Writeup | HackTheBox </title>
</head>

![Screenshot]({{ site.baseurl }}/images/posts/2017/lazy/logo.png)

## i. Port Scan

Using nmap to scan the ports:

![Screenshot]({{ site.baseurl }}/images/posts/2017/lazy/portscan.png)

`Ports 80 (http) & 22 (ssh) are open.`

## ii. Enumeration

Browsing to the host on port 80:

![Screenshot]({{ site.baseurl }}/images/posts/2017/lazy/http.png)

We then register an account, and are automatically logged in:

![Screenshot]({{ site.baseurl }}/images/posts/2017/lazy/slime.png)

If we reload the page and intercept the request with Burp, we see a interesting cookie:

![Screenshot]({{ site.baseurl }}/images/posts/2017/lazy/request.png)

Modifying the cookie and resubmitting the page:

![Screenshot]({{ site.baseurl }}/images/posts/2017/lazy/modified.png)

An interesting error occurs:

![Screenshot]({{ site.baseurl }}/images/posts/2017/lazy/invalid.png)

Due to the error, we see that the website is vulnerable to an Oracle Padding Attack.

~~~
For more information on how the attack works:
https://www.owasp.org/index.php/Testing_for_Padding_Oracle_(OTG-CRYPST-002)
https://pentesterlab.com/exercises/padding_oracle
~~~

PadBuster is a tool in which can automate Oracle Padding Attacks.

~~~
https://github.com/GDSSecurity/PadBuster
~~~

We can use PadBuster to decrypt the cookie to see the format it is in:


Then use Padbuster again to encrypt the cookie in the format we need:








~~~
Sources / Links:

[0]: https://vagmour.eu/cve-2015-6668-cv-filename-disclosure-on-job-manager-wordpress-plugin/
[1]: http://www.cables.ws/cracking-rsa-private-key-passphrase-with-john-the-ripper/
~~~




