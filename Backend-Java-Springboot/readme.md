

###HOW TO GENERATE INSTANCE

Create a new react app with: npx create-react-app <app name>

Create a new Github repo at: github.com/new

Go to the directory in terminal and type:``` git add . ```and``` git commit -m "initial commit"```

Then run the commit code linked to the github repo (this will push all project files to github):



``` Remote add origin <link to repo> 6 git branch -M main 7 ```

```git push -u origin main```



###INSTALL FROM BARE VM

Install a new instance of Ubuntu 20.04 64bit



Login as root

disable apache2 if installed with the commands below (this uses nginx):

```systemctl stop apache2```

```systemctl disable apache2```

```sudo apt remove apache2```

```apt clean all```

```apt update```

```apt dist-upgrade```

```sudo apt-get update```

```sudo apt-get upgrade```

```sudo apt-get nginx```



The web server will now be running if you go to the <machine ip address> 7.1 It will show either the apache2 page or nginx, if apache2 go to <machine ip address>/index.nginx-debian.html



```apt install npm```

```apt install git```



###CLONE GITHUB REPO

```cd /home```

Get the link from Github of the repo to clone eg:``` git clone https://github.com/Tauum/EdOwlReact.git```

```cd /<project name>```

```npm install```

```npm run build```



###DEPLOY REACT APPLICATION

Copy the built repository to ```/var/www/html ``` eg:  ```cp -r build/* /var/www/html ```



###DOMAIN SETUP / CONFIGURATION

Go to platform hosting domain (it may take up to 48 hours to fully set after completion)

Type in a new: A type record and pointing to: <machine ip address>

type in a new www type record and pointing to: <machine ip address>

now you can test the website domain



###HTTPS SETUP

Trying to go to https://<domain> will fial because ssl requirements are not met

install certbot https://certbot.eff.org/ with

```sudo apt install certbot python3-certbot-nginx```

Then install a certificate with certbot --nginx -d <domain> -d www.<domain>

Enter an email address

follow the rest of the steps

```sudo nginx -s reload```



###AUTH0 CONFIGURATION

set stuff to new version matching domain



set domain in app .env ```edowl.eu.auth0.com```

set client id in app .env``` J17HTFHr2LaaIPjixzhzaQmJLWR61HFH```



in auth0 settings set the following:

Allowed Callback URLs``` https://edowl.online/#/Home ```

Allowed Logout URLs``` https://edowl.online/#/Home```

Allowed Web Origins``` https://edowl.online ```

Allowed Origins (CORS) ```https://edowl.online```



###SPRINGBOOT BUILD & DEPLOY

open mavern menu



press package this loads everything into the target folder. In here it gets put into the .jar move .jar to server

install java``` sudo apt install openjdk-11-jdk```

verify version java -version

then the app can be run (after db configuration) by using ```java -jar Edowl-Springboot.jar```https://superuser.com/questions/453298/how-to-force-java-to-use-ipv4-instead-ipv6





###MySQL INSTALL AND CONFIGURATION

https://linuxconfig.org/install-mysql-on-ubuntu-20-04-lts-linux



install ```apt install mysql-server```

configure ```mysql_secure_installation```

set ip address``` nano /etc/mysql/mysql.conf.d/mysqld.cnf``` change bind-address from 127.0.0.1 to 0.0.0.0

restart mysql ```sudo systemctl restart mysql```

enable on startup ```sudo systemctl enable mysql```

setup table & remote user & remote login:



```mysql ```

```CREATE DATABASE EdOwlDB;```

```CREATE USER 'remote'@'192.168.1.100' IDENTIFIED WITH mysql_native_password BY 'password'; ```

```GRANT ALL PRIVILEGES ON EdOwlDB.* to 'remote@'%'; < % here is a wildcard meaning from any address ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'toor';```



```FLUSH PRIVILEGES; ```

```exit```



restart service``` sudo systemctl restart mysql```

enable service on restart``` sudo systemctl enable mysql```

configure UFW

```install sudo apt-get install ufw```

configure sudo ```nano /etc/default/ufw and set IPV6=yes```

then allow the following UFW rules

```sudo ufw allow 22``` ssh

```sudo ufw allow 80``` http

```sudo ufw allow 443```https

```sudo ufw allow 3306 ```sql

```sudo ufw allow 989 ```ftps (using tls/ssl)

```sudo ufw allow 21``` ftp

```sudo ufw allow 53```DNS

```sudo ufw allow 8080``` SPRINGBOOT API (i think this is optional but can leave a backdoor) sudo ufw enable sudo ufw status

restart ```sudo systemctl restart ufw```

enable service on restart ```sudo systemctl enable ufw```



###APP & SPRINGBOOT LINK

THIS IS KINDA MESSY BUT IT WAS SUGGESTED, WORKS AND DOESNT NEED TO INPUT HTTPS INTO REACT AND SPRINGBOOT SEPERATELY



go to nginx configuration inside ```/etc/nginx/sites-available```

1.2. edit default and include the following (INSIDE THE SECOND SERVER BLOCK WHERE ITS REFERENCING THE PREVIOUSLY AUTOCONFIGURED HTTPS BY CERTBOT) (THIS FILE HAS ALSO BEEN INCLUDED IN THE REPO)

insert this:

```

        location ~* ^/api {

                rewrite ^/api/(.*) /$1 break;

                proxy_set_header Host $host;

                proxy_set_header X-Real-IP $remote_addr;

                proxy_pass http://127.0.0.1:8080;

                # First attempt to serve request as file, then

                # as directory, then fall back to displaying a 404.

        }

```

^ what this does is redirects any traffic from https requests to a http address which is pointing to the springboot service (bypassing springboot and react https requirements)



1.3 restart nginx ```systemctl restart nginx```

1.4 redo-cert bot (maybe un-needed but just in case) ```certbot --nginx -d Edowl.online -d www.Edowl.online ```

1.5 load java ```java -jar -Djava.net.preferIPv4Stack=true EdOwl-Springboot.jar```



####SYSTEMD CONFIGURATION TO RUN SPRINGBOOT AS A SYSTEM SERVICE https://computingforgeeks.com/how-to-run-java-jar-application-with-systemd-on-linux/

1. create systemd file ```sudo vim /etc/systemd/system/EdOwl-Springboot.service```

2. configure file

```

[Unit]

Description=EdowlSpringboot



[Service]

WorkingDirectory=/home

ExecStart=/usr/bin/java -Xms128m -Xmx256m -jar -Djava.net.preferIPv4Stack=true EdOwl-Springboot.jar

Type=simple

Restart=on-failure

RestartSec=10



[Install]

WantedBy=multi-user.target

```

3. restart systemD daemon ```sudo systemctl daemon-reload```

4. start service ```sudo systemctl start EdOwl-Springboot```

4.2 enable at system startup  ```sudo systemctl enable EdOwl-Springboot```

4.3 restart service ```sudo systemctl restart EdOwl-Springboot```

5. check its status ```$ systemctl status EdOwl-Springboot```



###QUICK REFRESH / UPDATE GUIDE

on development in react folder terminal do



```git add . ```

1.2.``` git commit -m "nameofupdate" ```

1.3.``` git push -u origin master or git push -u origin master --force ```(be careful this overwrites everything)



then server-side do:

2.1 ```cd /var/www 2.2 rm -r html ```

2.3```mkdir html ```

2.4. ```git clone https://github.com/Tauum/EdOwlReact.git ```

2.5. ```cd /<project name> ```

2.6. ```npm install ```

2.7. ```npm run build ```

2.8 ```cp -r build/* /var/www/html```



restart nginx``` systemctl restart nginx```



redo-cert bot (maybe un-needed but just in case) ```certbot --nginx -d Edowl.online -d www.Edowl.online```



load java ```java -jar -Djava.net.preferIPv4Stack=true EdOwl-Springboot.jar```

