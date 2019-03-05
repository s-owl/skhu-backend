#!/bin/sh

letsencrypt renew
nginx -s reload
