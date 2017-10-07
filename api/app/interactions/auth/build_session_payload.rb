module Auth
  class BuildSessionPayload
    include Interactor

    def call
      raise ArgumentError, 'invalid args' unless valid_args?

      context.payload = {
        access_token: build_access_token,
        refresh_token: build_refresh_token
      }
    end

    private

    def valid_args?
      context.ip.present? && context.user_id.present?
    end

    def build_access_token
      JSONWebToken.encode(sub: context.user_id, exp: access_token_exp)
    end

    def build_refresh_token
      JSONWebToken.encode(sub: context.user_id, ip: context.ip)
    end

    def access_token_exp
      3.minutes.from_now.to_i
    end
  end
end
