class NotifyNewUserJob < ApplicationJob
  queue_as :default

  def perform(user)
    NotifyUserSignup.call(user: user)
  end
end
