module Auth
  class RefreshController < ApplicationController
    skip_before_action :authenticate!

    def create
      result = validate
      if result.success?
        user = User.find(result.user_id)
        payload = build_payload(user)
        render json: payload, status: :created
      else
        render json: { error: result.error }, status: :unprocessable_entity
      end
    end

    private

    def validate
      ValidateRefreshToken.call(refresh_token: bearer_token, client_secret: client_secret)
    end

    def client_secret
      request.cookies['client_secret']
    end

    def build_payload(user)
      BuildSessionPayload.call(user: user).payload
    end
  end
end
