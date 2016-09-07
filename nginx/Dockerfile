FROM ubuntu:latest

RUN apt-get -y update && apt-get -y install openssl letsencrypt nginx cron

COPY start.sh /
COPY nginx.conf /etc/nginx/
COPY dhparams.pem /etc/ssl/private/
COPY ssl_renew /
COPY ssl_renew.sh /etc/cron.d/

CMD bash start.sh
