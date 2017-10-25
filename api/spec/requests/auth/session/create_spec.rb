require 'rails_helper'

RSpec.describe 'POST /session', type: :request do
  let(:password) { 'thisisaprettygoodpassword' }
  let(:credential_password) { password }
  let(:credential_email) { user.email_address }

  let(:params) do
    {
      email: credential_email,
      password: credential_password
    }
  end

  let(:user) do
    create(:user, password: password, password_confirmation: password)
  end

  let(:headers) do
    {
      'ACCEPT' => 'application/json',
    }
  end

  before do
    post '/auth/session', params: params, headers: headers
  end

  context 'when given valid http auth headers' do
    it 'creates a session' do
      expect(response).to have_http_status(:created)
    end

    it 'returns a payload that includes an auth token' do
      expect(json['access_token']).to_not be_nil
    end

    it 'returns a payload that includes a refresh token' do
      expect(json['refresh_token']).to_not be_nil
    end
  end

  context 'when given invalid password' do
    let(:credential_password) { 'thisisawrongpassword' }

    it 'returns unauthorized' do
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context 'when given an email that does not exist in db' do
    let(:credential_email) { 'idonotexist' }

    it 'returns unauthorized' do
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
