module Requests
  module JsonHelpers
    def json
      JSON.parse(response.body)
    end

    def valid_request_headers(user_id = nil)
      {
        'ACCEPT' => 'application/json',
        'AUTHORIZATION' => "Bearer #{bearer_token(user_id)}"
      }
    end

    def bearer_token(user_id = 1)
      JSONWebToken.encode(sub: user_id, exp: 2.minutes.from_now, role: 'farmer')
    end
  end
end
