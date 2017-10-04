FROM ruby:2.4

ENV WEBAPP /home/app/webapp
RUN mkdir -p ${WEBAPP}
WORKDIR ${WEBAPP}

# Run Bundle in a cache efficient way
RUN gem install bundler --no-ri --no-rdoc
COPY Gemfile* ./
RUN bundle install -j 7

# Add the rails app
ADD . ${WEBAPP}

EXPOSE 80

# clean up when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
