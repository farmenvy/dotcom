module Auth
  class SignupVerificationController < ApplicationController
    def create
      user = User.find(user_id)
      if user.pending_verification
        user.update!(pending_verification: false)
        render json: session_payload, status: :created
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    private

    def session_payload
      BuildSessionPayload.call(user_id: user_id, ip: request.remote_ip).payload
    end
  end
end
