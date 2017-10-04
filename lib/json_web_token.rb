module JSONWebToken
  SECRET_KEY_BASE = Rails.application.secrets.secret_key_base

  class << self
    def encode(payload = {})
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
        { :algorithm => 'HS256'  }
      ).first
    end
  end
end
