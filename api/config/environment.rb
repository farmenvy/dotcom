# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  user_name:  ENV['EMAIL_USERNAME'],
  password:  ENV['EMAIL_PASSWORD'],
  domain:  'farmenvy.com',
  address:  ENV['EMAIL_HOST'],
  port:  587,
  authentication:  :plain,
  enable_starttls_auto:  true
}

