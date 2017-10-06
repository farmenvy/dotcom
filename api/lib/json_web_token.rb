module JSONWebToken
  SECRET_KEY_BASE = Rails.application.secrets.secret_key_base

  class << self
    def encode(payload = {})
      payload.reverse_merge!(exp: 3.minutes.from_now.to_i)
      JWT.encode(payload, SECRET_KEY_BASE)
    end

    def decode(token)
      return false unless token
      HashWithIndifferentAccess.new(decode_jwt_payload(token))
    rescue JWT::DecodeError => error
      Rails.logger.error error
      false
    end

    private

    def decode_jwt_payload(token)
      JWT.decode(
        token,
        SECRET_KEY_BASE,
        true,
        algorithm: 'HS256'
      ).first
    end
  end
end
