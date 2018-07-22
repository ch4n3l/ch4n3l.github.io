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

Hint #1: 
~~~ 
Please email a qualified GNO supervisor to receive the online GoldenEye Operators Training to become an Administrator of the GoldenEye system 
~~~

which is followed up by:

Hint #2: 
~~~ 
Remember, since security by obscurity is very effective, we have configured our pop3 service to run on a very high non-default port
~~~


Running a service detection scan using nmap on the unknown ports (55006 & 55007) we found earlier:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/nmap.png)

Looks like ports 55006 and 55007 was the mail server that Hint #2 was talking about.

If we look at the bottom of the source for /sev-home, we also see qualified operators.

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/operators.png)

After going millions of rabbit holes, we can try cracking the pop3 accounts for the operators.

` ** Note: The password is not in rockyou.txt, which is very annoying`
~~~
I am going to use the `fasttrack.txt` wordlist which contains the password.
https://raw.githubusercontent.com/trustedsec/social-engineer-toolkit/master/src/fasttrack/wordlist.txt
~~~

Attempting to crack boris account using hydra:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/hydra.png)

~~~
$ hydra -l boris -P fasttrack.txt -f 10.0.2.10 -s 55007 pop3

-l = username
-P = password list
-f = finish when password is found
-s = custom port
pop3 = service to crack
~~~

boris' account cracked:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/boriscracked.png)

We can now connect to pop3 and login using netcat:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/pop3login.png)

~~~
USER [username]
PASS [password]

For a full list of pop3 commands see: https://www.electrictoolbox.com/article/networking/pop3-commands/
~~~

Now that we are authenticated, we can use `LIST` to list the messages and `RETR {#}` to read the message:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/list.png)

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/retr.png)

` Note:  I have more messages because of a rabbit hole. `

The only message of interest was the one above. (Still doesn't give us any information)

At first, I thought there was a file attached to the e-mail, so I setup Thunderbird and connected to the pop3 server but it turned out to be a rabbit hole...

Let's move onto Natalya:

Cracking pop3 account:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/natalyacracked.png)

The second e-mail seems to contain very interesting information:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/secondemail.png)

We get credentials, and a new hidden directory.

As the e-mail says, we need to configure our /etc/hosts, or the virtual host will not work.

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/error.png)

Updating /etc/hosts:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/hosts.png)

~~~
Use your text editor of choice, and open up /etc/hosts

Following the default format, IP {tab} Hostname 

/etc/hosts essentially works as a local DNS

Read more: http://bencane.com/2013/10/29/managing-dns-locally-with-etchosts/
~~~

Now we can try to browse to `http://severnaya-station.com/gnocertdir`:

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/moodle.png)

It seems that the software running on the Web Server is Moodle. If we look for any exploits, we see there is a bunch but each for a different version.

![Screenshot]({{ site.baseurl }}/images/posts/2017/goldeneye/moodleploits.png)






