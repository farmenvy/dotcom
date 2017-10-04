FROM phusion/passenger-ruby24

# set environment variables
ENV APP_NAME farmenvyapi
ENV HOME /root
ENV WEBAPP /home/app/webapp

# use baseimage-docker’s init process
CMD ["/sbin/my_init"]

# 1) start Nginx / Passenger
# 2) remove the default site
RUN rm -f /etc/service/nginx/down && \
  rm /etc/nginx/sites-enabled/default

# add nginx.conf
ADD nginx.conf /etc/nginx/sites-enabled/${APP_NAME}.conf

# preserve environment variables
ADD nginx_env.conf /etc/nginx/main.d/env.conf

RUN mkdir -p ${WEBAPP}
RUN chown -R app:app ${WEBAPP}
WORKDIR ${WEBAPP}
RUN gem install bundler --no-ri --no-rdoc
ADD ./api/Gemfile* ./
# Use --deployment to do nothing if lockfile hasn't changed.
RUN su -- app bundle install -j 7 --deployment --without development

# add boot script
RUN mkdir -p /etc/my_init.d
ADD boot.sh /etc/my_init.d/boot.sh
RUN chmod +x /etc/my_init.d/boot.sh

# Add the rails app
ADD ./api ${WEBAPP}

# Note that the public directory should only be generated in CI
ADD ./public ${WEBAPP}/public

EXPOSE 80


# clean up when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
