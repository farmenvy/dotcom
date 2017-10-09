require 'rails_helper'

RSpec.describe 'POST /users', type: :request do
  let(:headers) do
    {
      'ACCEPT' => 'application/json',
      'AUTHORIZATION' => "Bearer #{bearer_token}"
    }
  end

  before do
    post '/users', params: params, headers: headers
  end

  let(:params) do
    {
      user: {
        first_name: first_name,
        last_name: last_name,
        email_address: email_address,
        password: password,
        password_confirmation: password_confirmation
      }
    }
  end

  let(:first_name) { 'john' }
  let(:last_name) { 'bob' }
  let(:email_address) { 'foo@bar.com' }
  let(:password) { 'thisisavalidpassword' }
  let(:password_confirmation) { 'thisisavalidpassword' }

  it_behaves_like 'a protected endpoint' do
    let(:action) { :post }
    let(:endpoint) { '/users' }
  end

  context 'when given valid params' do
    it 'creates a User' do
      expect(response).to have_http_status(:created)
    end

    it 'returns the User object' do
      expect(json.dig('user', 'first_name')).to eq(first_name)
      expect(json.dig('user', 'last_name')).to eq(last_name)
      expect(json.dig('user', 'email_address')).to eq(email_address)
    end

    it 'does NOT return the User password_digest' do
      expect(json.dig('user', 'password_digest')).to be_nil
    end
  end

  context 'when given params with invalid email_address' do
    let(:email_address) { 'invalidemailaddress' }

    it 'does NOT create a User' do
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json['errors'].keys).to include('email_address')
    end
  end

  context 'when given params with passwords that do NOT match' do
    let(:password_confirmation) { 'thisdoesnotmatch' }

    it 'does NOT create a User' do
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json['errors'].keys).to include('password_confirmation')
    end
  end

  context 'when given params with invalid password' do
    let(:password) { 'toosmall' }

    it 'does NOT create a User' do
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json['errors'].keys).to include('password')
    end
  end
end
