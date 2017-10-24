class SignupVerificationMailer < ApplicationMailer
  def verification_email(user)
    @token = JSONWebToken.encode(sub: user.id)
    mail(to: user.email_address, subject: 'Verify Your Farm Envy Account')
  end
end
