class UsersController < ApplicationController
  skip_before_action :authenticate!, only: :create

  def create
    user = User.new(user_params)
    if user.save
      # SignupVerificationMailer.verification_email(user).deliver!

      render json: {
        user: user.as_json.except('password_digest')
      }, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name, :last_name, :email_address,
      :password, :password_confirmation
    )
  end
end
