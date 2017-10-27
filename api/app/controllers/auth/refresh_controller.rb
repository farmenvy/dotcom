module Auth
  class RefreshController < ApplicationController
    skip_before_action :authenticate!

    def create
      result = validate
      if result.success?
        user = User.find(result.user_id)
        payload = build_payload(user, result.jti)
        render json: payload, status: :created
      else
        render json: { error: result.error }, status: :unauthorized
      end
    end

    private

    def validate
      ValidateRefreshToken.call(refresh_token: bearer_token, client_secret: client_secret)
    end

    def client_secret
      request.cookies['client_secret']
    end

    def build_payload(user, jti)
      BuildSessionPayload.call(user: user, jti: jti).payload
    end
  end
end
