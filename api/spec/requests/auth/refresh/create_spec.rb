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
    JSONWebToken.encode(sub: user_id, ip: my_ip)
  end

  let(:user_id) { 1 }
  let(:my_ip) { '127.0.0.1' }

  before do
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

  context 'when given valid refresh token for another ip' do
    let(:another_ip) { '10.0.0.1' }

    let(:refresh_token) do
      JSONWebToken.encode(sub: user_id, ip: another_ip)
    end

    it 'returns unprocessable entity' do
      expect(response).to have_http_status :unprocessable_entity
    end
  end
end
