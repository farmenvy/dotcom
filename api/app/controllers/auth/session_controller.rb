module Auth
  class SessionController < ApplicationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods

    attr_reader :user

    skip_before_action :authenticate!
    before_action :authenticate_password!

    def create
      result = BuildSessionPayload.call(context)

      if result.success?
        render json: result.payload, status: :created
      else
        render json: result.errors, status: :unprocessable_entity
      end
    end

    private

    def context
      { user: user, ip: request.remote_ip }
    end

    def authenticate_password!
      authenticate_or_request_with_http_basic do |email, password|
        @user = User.find_by(email_address: email)
                    .try(:authenticate, password)
      end
    end
  end
end
