# Preview all emails at http://localhost:3000/rails/mailers/signup_verification_mailer
class SignupVerificationMailerPreview < ActionMailer::Preview
  def verification_email_preview
    user = User.last || FactoryGirl.create(:user)
    SignupVerificationMailer.verification_email(user)
  end
end

