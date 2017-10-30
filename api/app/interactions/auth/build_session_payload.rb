module Auth
  class BuildSessionPayload
    include Interactor

    def call
      raise ArgumentError, 'invalid args' unless context.user.present?

      context.cookie_args = refresh_token.build_cookie_args
      context.payload = {
        access_token: JSONWebToken.encode(access_token_payload),
        refresh_token: refresh_token.as_jwt
      }
    end

    private

    def refresh_token
      @refresh_token ||= find_token || create_token
    end

    def find_token
      return unless context.jti
      RefreshToken.find_by(id: context.jti)
    end

    def create_token
      RefreshToken.create!(user_id: context.user.id)
    end

    def access_token_payload
      {}.tap do |hsh|
        hsh[:sub] = context.user.id
        hsh[:exp] = access_token_exp
        hsh[:role] = context.user.pending_verification ? 'pending' : context.user.role
      end
    end

    def access_token_exp
      3.minutes.from_now.to_i
    end
  end
end
