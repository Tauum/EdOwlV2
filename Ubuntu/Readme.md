# INSTALL FROM BARE VM

1. Install a new instance of Ubuntu 20.04 64bit

2. (apache may be installed) As this system uses Nginx
2.1. `sudo systemctl stop apache2`
2.2. `sudo systemctl disable apache2`
2.3. `sudo apt remove apache2`

# updates
3. `sudo apt clean all`
4. `sudo apt update`
5. `apt dist-upgrade`
6. `sudo apt-get update`
7. `sudo apt-get upgrade`
8. `sudo apt-get nginx`

# web-server & https
9. The web server will now be running, you go to it will show either the apache2 page or nginx, if apache2 go to `/index.nginx-debian.html` in address bar
10. `apt install npm`
11. `apt install git`

12. Trying to go to `https://` will fial because ssl requirements are not met
12.1. Install certbot https://certbot.eff.org/ with `sudo apt install certbot python3-certbot-nginx`

12.2 Then install a certificate with certbot `certbot --nginx -d <domain> -d <www.domain>` (`certbot --nginx -d Edowl.online -d www.Edowl.online`)
12.3 Enter details & follow through cert-bot setup.

13. reload nginx `sudo nginx -s reload`

# installing java
14. Install java `sudo apt install openjdk-11-jdk`

15. Verify version `java -version`
16. Then the app can be run (after db configuration) by using `java -jar Edowl-Springboot.jar`
https://superuser.com/questions/453298/how-to-force-java-to-use-ipv4-instead-ipv6


# MySQL Install & config https://linuxconfig.org/install-mysql-on-ubuntu-20-04-lts-linux

17.1. Install `apt install mysql-server`
17.2. Configure` mysql_secure_installation`
17.3. Set ip address `nano /etc/mysql/mysql.conf.d/mysqld.cnf` change bind-address from `127.0.0.1` to `0.0.0.0`
17.4. Restart mysql `sudo systemctl restart mysql`
17.5. Enable on startup `sudo systemctl enable mysql`

setup table & remote user & remote login:

18.1. `mysql`
18.2. `CREATE DATABASE EdOwlDB;`
18.3. `CREATE USER 'remote'@'192.168.1.100' IDENTIFIED WITH mysql_native_password BY 'password';`
18.4. `GRANT ALL PRIVILEGES ON EdOwlDB.* to 'remote@'%';` <<<< `%` is wildcard meaning from any address 
18.5. `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'toor';`
18.6. `FLUSH PRIVILEGES;`
18.7. `exit`

18.8. Restart service `sudo systemctl restart mysql`
18.9. Enable service on restart `sudo systemctl enable mysql`

# UFW Install & Config
19. Install `sudo apt-get install ufw`
20. `sudo nano /etc/default/ufw` and set `IPV6=yes`
21.1. Permit UFW rules:
21.2. `sudo ufw allow 22 ssh`
21.3. `sudo ufw allow 80` http & `sudo ufw allow 443` https
21.4. `sudo ufw allow 3306` sql
21.5. `sudo ufw allow 21` ftp & `sudo ufw allow 989` ftps (using tls/ssl)
21.6. `sudo ufw allow 53` DNS
21.7. `sudo ufw allow 8080` SPRINGBOOT API (i think this is optional but can leave a backdoor) sudo ufw enable sudo ufw status

22.1. Restart `sudo systemctl restart ufw`
22.2. Enable service on restart `sudo systemctl enable ufw`

# Configure Nginx for reverse proxy to link frontend-react & backend-java-springboot

THIS IS KINDA MESSY BUT IT WAS SUGGESTED
23. Go to nginx configuration inside `/etc/nginx/sites-available`

1.2. edit default and include the following (INSIDE THE SECOND SERVER BLOCK WHERE ITS REFERENCING THE PREVIOUSLY AUTOCONFIGURED HTTPS BY CERTBOT) (THIS FILE HAS ALSO BEEN INCLUDED IN THE REPO)

insert this:

UPDATE FOR HTTPS PROXY TO HTTPS
VVVVVVVVVVVVVVVVVV
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

1.3 restart nginx `sudo systemctl restart nginx`

1.4 redo-cert bot (maybe un-needed but just in case) `certbot --nginx -d Edowl.online -d www.Edowl.online`

1.5 load java `java -jar -Djava.net.preferIPv4Stack=true EdOwl-Springboot.jar` (if not setup with systemD)


# SYSTEMD CONFIGURATION TO RUN SPRINGBOOT AS A SYSTEM SERVICE https://computingforgeeks.com/how-to-run-java-jar-application-with-systemd-on-linux/

create systemd file `sudo vim /etc/systemd/system/EdOwl-Springboot.service`

configure file
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

restart systemD daemon sudo systemctl daemon-reload

start service sudo systemctl start EdOwl-Springboot

4.2 enable at system startup sudo systemctl enable EdOwl-Springboot

4.3 restart service sudo systemctl restart EdOwl-Springboot

check its status $ systemctl status EdOwl-Springboot
