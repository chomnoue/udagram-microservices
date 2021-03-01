FROM node:15.10-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY /www ./dist
CMD npm start
