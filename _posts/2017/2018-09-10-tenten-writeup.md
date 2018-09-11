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

wspcan shows that a plugin named job-manager is installed, and has a vulnerability in which discloses uploaded file names.
~~~
https://vagmour.eu/cve-2015-6668-cv-filename-disclosure-on-job-manager-wordpress-plugin/
~~~


![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/jobmanager.png)

On the index page, we see there is an area to register for a job:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/joblisting.png)

Reading the vulnerability, we see that we can see uploaded resumes if we change the number in the URL.

`Before`:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/parameter.png)

`After`:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/parameterafter.png)

In order to speed things up, I wrote a simple script to return the first 20 pages:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/script.png)

`HackerAccessGranted` looks interesting...

As the article linked above mentions, the upload structure for wordpress is: 
~~~
/wp-content/uploads/%year%/%month%/%filename%
~~~

The article also includes a script which will help bruteforce the extension of the file, as we only have the filename.

Fixing the script to update the years (we can see that the first blog post is in April of 2017):

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/years.png)

Running the script:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/nothing.png)

Nothing gets found! How could that be? Well if we read the script, it only looks for 3 extensions (.docx, .doc, pdf) [common resume  extensions].

Let's add a couple more extensions, such as txt,png,jpg:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/extensions.png)

Rerunning the script:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/hit.png)

Awesome, we got a hit. Navigating to `http://10.10.10.10/wp-content/uploads/2017/04/HackerAccessGranted.jpg`:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/image.png)

Seems to be an image... could it be hiding something?

After downloading the image, we can use steghide to extract any hidden files:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/steg.png)

Awesome, seems like we got an ssh key. Trying to use the key, we see it's encrypted:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/key.png)

Seeing if the passphrase is empty:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/noluck.png)

`If you are wondering where I got takis from, I'm using the username from wordpress.`

We can try using `john` to crack, though first we need to convert the RSA key to john format:

~~~
$ ssh2john id_rsa > crackme
~~~

Now time to crack:

~~~
$ john --wordlist=/usr/share/wordlists/rockyou.txt --format=SSH crackme
~~

After the hash cracks:

![Screenshot]({{ site.baseurl }}/images/posts/2017/tenten/john.png)


~~~
Sources / Links:

[0]: http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
[1]: https://www.vulnhub.com/entry/goldeneye-1,240/
~~~




