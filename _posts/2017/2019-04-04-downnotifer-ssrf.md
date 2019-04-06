---
layout: post
title:	"DownNotifier SSRF"
date:	2019-04-04 03:00:00
categories:
    - notes
tags:
    - bug_hunting
    - bug_writeup
    - openbugbounty
---
<head>
	<title> downnotifer.com SSRF Bug Writeup </title>
</head>
![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/logo.png)


# i. Introduction
DownNotifier has an open bug bounty progam hosted on `https://openbugbounty.org`.

DownNotifie is a service which periodically scans your websites and notifies you if your website has gone down.

Due to the nature of the website and the service it provides, I thought about some application logic bugs which might work, 

So in mind came `SSRF`.

# ii. SSRF Explanation

SSRF, sometimes prounced *Surf*, stands for Server Side Request Forgery. 

Essentially, with SSRF you are able to send requests originating from the web-server, in which you can leverage to read local files, or even enumerate services on the local system.

Within SSRF, an exists subattack you can perform which is known as XSPA *(Cross Site Port Attack)*

Using XSPA, you can either use response times, response output to fingerprint if local services are running on the server such as `ftp, mysql, redis`

A great source to read about `SSRF` and ever


# iii. Exploiting XSPA to Enumerate Local Services

Luckily for us, due to the type of application logic `DownNotifier` was using, it was a lot easier for us to perform an XSPA attack.

When browsing to `downnotifier` we are greeted with:

![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/index.png)

Trying usual loopback addresses like `localhost` and `127.0.0.1` does not seem to work too well:

![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/localhost.png)

Also trying to grab files using `file://` turned out as expected:

![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/file.png)

I tried some more payloads I found from `PayloadAllThings` SSRF payload page and found that `0.0.0.0` seemed to be accepted.
~~~
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Request%20Forgery
~~~

![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/accepted.png)

Though, even if it bypassed the filter, will it still work?

To see if it would, I added some common ports.

30 seconds later, we can see that we indeed did get an SSRF and were able to perform an XSPA to enumerate local services. 

![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/proof.png)

`ftp` and `http` are running.


# iv. Conclusion

I reported the report to `DownNotifier` and they responded in less than 24 hours with a patch.

![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/email.png)

![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/acknowledgement.png)

I would like to thank `DownNotifier` for the acknowledgement and the quick patch.

Thank you for reading,
- mqt

~~~
Sources:
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server Side Request Forgery
~~~
