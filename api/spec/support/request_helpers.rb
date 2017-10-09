module Requests
  module JsonHelpers
    def json
      JSON.parse(response.body)
    end

    def valid_request_headers
      {
        'ACCEPT' => 'application/json',
        'AUTHORIZATION' => "Bearer #{bearer_token}"
      }
    end

    def bearer_token
      JSONWebToken.encode(sub: 1, exp: 2.minutes.from_now)
    end
  end
end
