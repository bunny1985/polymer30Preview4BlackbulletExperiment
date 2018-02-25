#!/bin/bash
rm -rf dist 
yarn build || exit 1 

scp -r dist/* root@217.182.77.39:/opt/blackBullet/wwwroot/
