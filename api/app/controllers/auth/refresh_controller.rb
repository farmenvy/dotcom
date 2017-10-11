module Auth
  class RefreshController < ApplicationController
    skip_before_action :authenticate!

    def create
      result = validate
      if result.success?
        payload = build_payload(result.user_id)
        render json: payload, status: :created
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    private

    def validate
      ValidateRefreshToken.call(
        refresh_token: bearer_token, ip: request.remote_ip
      )
    end

    def build_payload(user_id)
      BuildSessionPayload.call(
        user_id: user_id, ip: request.remote_ip
      ).payload
    end
  end
end
