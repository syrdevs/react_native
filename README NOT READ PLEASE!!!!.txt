Install NVM    https://www.digitalocean.com/community/tutorials/node-js-ubuntu-16-04-ru
-------------------
sudo apt-get update
sudo apt-get install build-essential libssl-dev
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh
nano install_nvm.sh // mozhno ne delat`
bash install_nvm.sh
source ~/.profile




INSTALL NODE.JS
-----------------------
nvm install 8.10.0


INSTALL MONGODB     https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
---------------------
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update  // if error : apt-get install apt-transport-https
sudo apt-get install -y mongodb-org 
sudo service mongod start


INSTALL GIT 
-------------------
apt-get install git


INSTALL NGINX
-------------------
apt-get install nginx




GO to /opt
------------------
cd /opt



CLONE PROJECT
-------------------
git clone (path)



SERVER
------------
cd MERN/
npm install




CLIENT
-----------
cd client/
npm install



INSTALL pm2
---------------
npm install pm2 -g




CONFIGURATION nginx
-----------------------
vi /etc/nginx/sites-available/default
gg-firstline
dG-delete all lines

server {
    listen 80;
    server_name serik.decode.kz;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
     }
}
nginx -t  //if successiful
sudo service nginx restart





CONFIGURATION pm2 to server
------------------
cd /opt/MERN
pm2 start server.js --name "blogserver"     //blogserver is name of task



CONFIGURATION pm2 to client
------------------
npm install serve -g
cd client/
























