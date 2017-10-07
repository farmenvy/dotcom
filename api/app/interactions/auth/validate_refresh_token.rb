module Auth
  class ValidateRefreshToken
    include Interactor

    def call
      validate_args
      decoded = JSONWebToken.decode(context.refresh_token)
      validate_refresh_token(decoded)
      context.user_id = decoded['sub']
    rescue JWT::DecodeError
      context.fail!
    end

    private

    def validate_args
      raise ArgumentError, 'no ip given' unless context.ip.present?
      context.fail! unless context.refresh_token.present?
    end

    def validate_refresh_token(hsh)
      context.fail! unless hsh['ip'] == context.ip
      context.fail! unless hsh['sub'].present?
    end
  end
end
