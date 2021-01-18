FROM node:15

USER root

# Docker + puppeteer
# https://medium.com/@christopher.talke/using-node-puppeteer-with-docker-without-wanting-to-smash-your-keyboard-ed78e9529a8b

WORKDIR /usr/src/scraper

COPY package*.json ./

RUN npm install
RUN npm install puppeteer
