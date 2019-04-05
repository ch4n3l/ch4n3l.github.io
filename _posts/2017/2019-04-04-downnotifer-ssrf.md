---
layout: post
title:	"DownNotifier SSRF"
date:	2018-12-28 03:00:00
categories:
    - notes
tags:
    - bug_hunting
    - vuln_writeup
---
<head>
	<title> downnotifer.com SSRF Bug Writeup </title>
</head>
![Screenshot]({{ site.baseurl }}/images/posts/2017/downssrf/logo.gif)


# i. Introduction
dflkasdfjlaskdfjlksdfasdf

# ii. Summary

dsfsadlfkjasldkfjasldkfjdsf

# iii. Exploiting Zeus Cart

Once in the admin panel, under Customers, we are able to see all the registered customers.

![Screenshot]({{ site.baseurl }}/images/posts/2017/zeus-cart/customers.png)

When clicking the "Active" button under the Status column, and intercepting the request we can see:

![Screenshot]({{ site.baseurl }}/images/posts/2017/zeus-cart/request.png)

It is sending a GET request to disable an account with the ID of 1. Which we can infer is the first customer registered in the database.

As you may notice, in the request there is no parameter that validates any sort of tokens.

To abuse this, an attacker can create an HTML page that looks blank, but when the admin clicks on the page, it will send a GET request which in turn will deactivate an account.

From what seems a blank page, there is actually a request going on in the background.

![Screenshot]({{ site.baseurl }}/images/posts/2017/zeus-cart/blank.png)

We can see what's going on by viewing the source.

![Screenshot]({{ site.baseurl }}/images/posts/2017/zeus-cart/source.png)

As we can see, the page create a request by trying to fetch an image, and executes the request in the background.

You can view the PoC on: https://www.exploit-db.com/exploits/46027

Here it is in action:

![Screenshot]({{ site.baseurl }}/images/posts/2017/zeus-cart/csrf.gif)

## https://www.exploit-db.com/exploits/46027

# iv. Conclusion

In conclusion, Zeus Cart is a great way to practice hunting, and building your foundation. Though keep in mind, the software is reaching it's sixth year since it has last been updated. Which means today, applications are more secure as new techniques and methods have been developed. With all that in mind, developers tend to make mistakes and overlook certain functions of an application. Even today the same bugs found in this six year old software, are found on some of the biggest websites.


Thank you for reading.

~~~
Sources:
https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
~~~
