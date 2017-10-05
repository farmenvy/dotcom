FROM ruby:2.4

ENV WEBAPP /home/app/webapp
RUN mkdir -p ${WEBAPP}
WORKDIR ${WEBAPP}

# Hack to make dev Docker have same interface as prod for CI/CD
RUN /bin/echo -e '#!/bin/bash\ncd ${WEBAPP}\n./bin/setup\neval "$@"' > /sbin/my_init && chmod +x /sbin/my_init

# Run Bundle in a cache efficient way
RUN gem install bundler --no-ri --no-rdoc
COPY ./api/Gemfile* ./
RUN bundle install -j 7

# Add the rails app
ADD ./api ${WEBAPP}

EXPOSE 80

# clean up when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0"]
