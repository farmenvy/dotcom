class SendVerificationEmailJob < ApplicationJob
  queue_as :verification_email

  def perform(user)
    SignupVerificationMailer.verification_email(user).deliver
  end
end
