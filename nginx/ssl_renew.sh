#!/bin/sh
#로그인 reload
letsencrypt renew
nginx -s reload
