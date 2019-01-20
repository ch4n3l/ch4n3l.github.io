---
layout: post
title:	"Dummy Writeup | Wizard-Labs"
date:	2019-01-20 03:00:00
categories:
    - writeups
tags:
    - ctf
    - boot2root
    - wizardlabs
---
<head>
	<title> Dummy Writeup | Wizard-Labs </title>
</head>
![Screenshot]({{ site.baseurl }}/images/posts/2017/dummy/logo.jpg)

## i. Port Scan

![Screenshot]({{ site.baseurl }}/images/posts/2017/dummy/ports.png)

## ii. Enumeration

First, we can start off by listing the SMB shares to see if there is anything interesting:

![Screenshot]({{ site.baseurl }}/images/posts/2017/dummy/smbshares.png)

Seems like guests are not allowed to view shares...



Moving onto the next port... 8000.

Nmap's service detection shows that the service is `Icecast streaming media server`.

To confirm that the service is indeed Icecast, we can visit port 8000 in the browser:

![Screenshot]({{ site.baseurl }}/images/posts/2017/dummy/error.png)

If you google the error, you will see Icecast help forums pop up.

![Screenshot]({{ site.baseurl }}/images/posts/2017/dummy/search.png)

With the information in mind, we can use searchsploit to see if there are any Icecast exploits.

![Screenshot]({{ site.baseurl }}/images/posts/2017/dummy/searchsploit.png)

As we do not know the version number, we will have to guess. Though looking at the exploits, the only ones that look viable are remote code execution.


#a. Metasploit

Module: https://www.rapid7.com/db/modules/exploit/windows/http/icecast_header

![Screenshot]({{ site.baseurl }}/images/posts/2017/dummy/msf.png)



#b. Manual

laskdfjlasdfkjlasdfjlaksdjflasfjlksjf






##iii. Privilege Escalation

ipsum

##iv. Conclusion

lorum ipsum


Sources/Links:
~~~
[0]: 3
[1]: a
[2]: 3
[3]: 1
~~~


