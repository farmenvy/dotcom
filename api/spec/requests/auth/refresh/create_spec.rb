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
    JSONWebToken.encode(sub: user_id, jti: jti)
  end

  let(:jti) { saved_refresh_token.id }
  let(:saved_refresh_token) { create(:refresh_token) }
  let(:client_secret) { saved_refresh_token.secret }
  let(:user) { create(:user) }
  let(:user_id) { user.id }
  let(:my_ip) { '127.0.0.1' }

  before do
    cookies['client_secret'] = client_secret
    post '/auth/refresh', params: {}, headers: headers
  end

  context 'when given a valid refresh token' do
    it 'returns http status created' do
      expect(response).to have_http_status :created
    end

    it 'returns an access_token in response' do
      expect(json['access_token']).to be_present
    end

    it 'returns an refresh in response' do
      expect(json['refresh_token']).to be_present
    end
  end

  context 'when NOT given a client_secret' do
    let(:client_secret) { nil }

    it 'returns a 422' do
      expect(response).to have_http_status :unprocessable_entity
    end
  end
end
