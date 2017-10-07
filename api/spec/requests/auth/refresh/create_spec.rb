require 'rails_helper'

RSpec.describe 'POST /auth/refresh', type: :request do
  let(:headers) do
    {
      'ACCEPT' => 'application/json',
      'HTTP_AUTHORIZATION' => credentials
    }
  end

  let(:credentials) do
    "Bearer #{refresh_token}"
  end

  let(:refresh_token) do
    'heyyooo'
  end

  before do
    post '/auth/refresh', params: {}, headers: headers
  end
end
