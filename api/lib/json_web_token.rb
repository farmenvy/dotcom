module JSONWebToken
  SECRET_KEY_BASE = Rails.application.secrets.secret_key_base

  class << self
    def encode(payload = {})
      payload = HashWithIndifferentAccess.new(payload)

      payload['exp'] = payload['exp'].to_i if payload['exp'].present?

      JWT.encode(payload, SECRET_KEY_BASE)
    end

    def decode(token)
      HashWithIndifferentAccess.new(decode_jwt_payload(token))
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
