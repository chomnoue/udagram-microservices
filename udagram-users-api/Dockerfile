FROM node:15.10.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY /www ./www
CMD npm start
