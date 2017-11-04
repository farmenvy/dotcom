class UsersController < ApplicationController
  skip_before_action :authenticate!, only: :create

  def create
    user = User.new(user_params)
    if user.save
      SendVerificationEmailJob.perform_later(user)
      render json: user, status: :created
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find(user_id)
    render json: user
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name, :last_name, :email_address,
      :password, :password_confirmation, :farm_id
    )
  end
end
