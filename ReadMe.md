# UPDATING THE APP IS THE FOLLOWING:

# Publising to github.

1. Create repository on github.com
2. In terminal inside parent dir `git remote add origin <url to github repo>` (`https://github.com/Tauum/EdOwlV2`)
3. Unsure what this does `git add .` 
4. Add commit `git commit -m <name of update>`
5. push everything `git push -u origin master` or `git push -u origin master --force` (be careful this overwrites everything)

# Pulling from github

1. `git clone <url to github repo>` (`https://github.com/Tauum/EdOwlV2`)
2. `cd /<project name>`
3. `npm install`
4. `npm run build`
5. `cp -r build/* /var/www/html`


# to refresh system
6. `restart nginx systemctl restart nginx`
7. redo-cert bot (maybe un-needed but just in case) `certbot --nginx -d <domain> -d <www.domain>` (`certbot --nginx -d Edowl.online -d www.Edowl.online`)

8. `java -jar -Djava.net.preferIPv4Stack=true <java server file name>.jar` (`java -jar -Djava.net.preferIPv4Stack=true EdOwl-Springboot.jar`)

^^^^^^ this is if the service hasnt been initialized to run automatically in `systemD`

