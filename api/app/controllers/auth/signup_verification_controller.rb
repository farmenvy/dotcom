module Auth
  class SignupVerificationController < ApplicationController
    def create
      user = User.find(user_id)
      if user.pending_verification
        user.update!(pending_verification: false)
        render json: session_payload(user), status: :created
      else
        render json: {}, status: :unprocessable_entity
      end
    end

    private

    def session_payload(user)
      BuildSessionPayload.call(user: user, ip: request.remote_ip).payload
    end

    def skip_roles_verification
      true
    end
  end
end
