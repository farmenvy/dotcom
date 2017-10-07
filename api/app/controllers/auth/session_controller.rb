module Auth
  class SessionController < AuthorizationController
    include ActionController::HttpAuthentication::Basic::ControllerMethods

    attr_reader :user

    before_action :authenticate!

    def create
      result = BuildSessionPayload.call(user_id: user.id, ip: request.remote_ip)

      if result.success?
        render json: result.payload, status: :created
      else
        render json: result.errors, status: :unprocessable_entity
      end
    end

    private

    def authenticate!
      authenticate_or_request_with_http_basic do |email, password|
        @user = User.find_by(email_address: email)
          .try(:authenticate, password)
      end
    end
  end
end
