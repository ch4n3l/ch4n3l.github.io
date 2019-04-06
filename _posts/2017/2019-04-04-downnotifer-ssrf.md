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

DownNotifier periodically scans your websites and notifies you if your website has gone down.

With that in mind, I thought of some bugs that would work with this sort of lksadfal;skdfdls.

So in mind came SSRF.

# ii. SSRF Explanation

SSRF, sometimes prounced *Surf*, stands for Server Side Request Forgery. 

Essentially, with SSRF you are technically able to send requests originating from the server, which you can then leverage and use to read local files, or even enumerate services on the system.

Within SSRF, an exists subattack you can perform which is known as XSPA *(Cross Site Port Attack)*

Using XSPA, you can either use response times, response output to fingerprint if local services are running on the server such as `ftp, mysql`


# iii. Exploiting XSPA to Enumerate Local Services

Luckily for us, due to the type of application logic `downnotifier` was using, it was a lot easier for us to perform an XSPA attack.

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

`ftp` is running.


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
