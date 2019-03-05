#!/bin/sh

# Put your domain name into the nginx reverse proxy config.
sed -i "s/___SERVER_DOMAIN___/$SERVER_DOMAIN/g" /etc/nginx/nginx.conf

cat /etc/nginx/nginx.conf
# nginx

# Check user has specified domain name
if [ -z "$SERVER_DOMAIN" ]; then
    echo "Please set SERVER_DOMAIN to configure nginx and ssl"
    exit 1
fi
if [ -z "$SERVER_EMAIL" ]; then
    echo "Please set SERVER_EMAIL to configure nginx and ssl"
    exit 1
fi

echo "Obtaining Let's Encrypt SSL Certification using Certbot"
letsencrypt certonly --standalone -d $SERVER_DOMAIN --text --agree-tos --email $SERVER_EMAIL \
  --server https://acme-v01.api.letsencrypt.org/directory --rsa-key-size 4096 --verbose --renew-by-default --standalone-supported-challenges http-01

# This bit waits until the letsencrypt container has done its thing.
# We see the changes here bceause there's a docker volume mapped.
echo Waiting for folder /etc/letsencrypt/live/$SERVER_DOMAIN to exist
while [ ! -d /etc/letsencrypt/live/$SERVER_DOMAIN ] ;
do
    sleep 2
done

while [ ! -f /etc/letsencrypt/live/$SERVER_DOMAIN/fullchain.pem ] ;
do
	echo Waiting for file fullchain.pem to exist
    sleep 2
done

while [ ! -f /etc/letsencrypt/live/$SERVER_DOMAIN/privkey.pem ] ;
do
	echo Waiting for file privkey.pem to exist
    sleep 2
done

echo "Checking if dhparams.pem exists"
if [ ! -f /etc/ssl/private/dhparams.pem ]; then
    echo "dhparams.pem not found"
    openssl dhparam -out /etc/ssl/private/dhparams.pem 2048
fi

echo "Enableing Crontab"
cron
#go!
kill $(ps aux | grep '[n]ginx' | awk '{print $2}')

nginx -g 'daemon off;'
