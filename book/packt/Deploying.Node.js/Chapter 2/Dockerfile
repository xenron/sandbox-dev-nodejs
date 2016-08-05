# DOCKER-VERSION 0.9.0
FROM    centos:6.4
# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm
# Bundle app source
ADD . /src
# Install app 
RUN cd /src; npm install

EXPOSE 8087

CMD ["node", "/src/app.js"]

