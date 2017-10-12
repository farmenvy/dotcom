require 'rails_helper'

RSpec.describe 'POST /auth/signup_verification' do
  let(:headers) do
    {
      'ACCEPT' => 'application/json',
      'AUTHORIZATION' => jwt
    }
  end

  let(:jwt) { JSONWebToken.encode(sub: user.id) }

  let(:perform_request) do
    post '/auth/signup_verification', params: {}, headers: headers
  end

  context 'when user exists in the db with pending_verification' do
    let(:user) do
      create(:user, pending_verification: true)
    end

    it 'returns 201 created' do
      perform_request
      expect(response).to have_http_status :created
    end

    it 'changes users pending_verification to false' do
      expect { perform_request }.to change { User.find(user.id).pending_verification }
        .from(true).to false
    end

    it 'returns a session payload' do
      perform_request
      expect(json['access_token']).to_not be_nil
      expect(json['refresh_token']).to_not be_nil
    end
  end

  context 'when users exists in the db WITHOUT pending_verification' do
    let(:user) do
      create(:user, pending_verification: false)
    end

    it 'returns 422 unprocessable_entity' do
      perform_request
      expect(response).to have_http_status :unprocessable_entity
    end
  end
end
