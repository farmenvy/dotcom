FROM nginx:latest

RUN mkdir -p /usr/src/build
ADD client/build /usr/src/build
ADD nginx/prod.conf /etc/nginx/nginx.conf
