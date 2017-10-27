module Auth
  class SessionController < ApplicationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods

    attr_reader :user

    skip_before_action :authenticate!
    before_action :authenticate_password!

    def create
      result = BuildSessionPayload.call(user: user)

      if result.success?
        response.set_cookie('client_secret', result.cookie_args)
        render json: result.payload, status: :created
      else
        render json: result.errors, status: :unprocessable_entity
      end
    end

    private

    def authenticate_password!
      @user = User.find_by(email_address: params[:email])

      return unauthorized unless @user.try(:authenticate, params[:password])
    end
  end
end
