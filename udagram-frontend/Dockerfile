FROM node:15.10.0 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.19.7
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/www/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
