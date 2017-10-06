FROM ruby:2.4

ENV WEBAPP /home/app/webapp
RUN mkdir -p ${WEBAPP}
WORKDIR ${WEBAPP}

# Run Bundle in a cache efficient way
RUN gem install bundler --no-ri --no-rdoc
COPY ./Gemfile* ./
RUN bundle install -j 7

# Add the rails app
ADD ./ ${WEBAPP}

EXPOSE 80

CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0"]
