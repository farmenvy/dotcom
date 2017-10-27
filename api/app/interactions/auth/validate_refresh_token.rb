module Auth
  class ValidateRefreshToken
    include Interactor

    def call
      validate_args
      decoded = JSONWebToken.decode(context.refresh_token)
      validate_refresh_token(decoded)
      context.jti = decoded['jti']
      context.user_id = decoded['sub']
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      context.fail!(error: e.message)
    end

    private

    def validate_args
      context.fail!(error: 'no refresh token') unless context.refresh_token.present?
    end

    def validate_refresh_token(hsh)
      context.fail!(error: 'no sub') unless hsh['sub'].present?
      refresh_token = RefreshToken.find(hsh['jti'])
      context.fail!(error: 'bad secret') unless refresh_token.secure_compare(context.client_secret)
    end
  end
end
