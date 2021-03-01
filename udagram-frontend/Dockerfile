FROM nginx:1.19.7
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY /www/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
