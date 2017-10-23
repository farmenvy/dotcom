require 'rails_helper'

RSpec.describe 'POST /users', type: :request do
  let(:headers) do
    {
      'ACCEPT' => 'application/json'
    }
  end

  before do
    allow(SendVerificationEmailJob).to receive(:perform_later)
    post '/farmers', params: params, headers: headers
  end

  let(:params) do
    {
      user: {
        first_name: first_name,
        last_name: last_name,
        email_address: email_address,
        password: password,
        farm_attributes: {
          name: farm_name
        }
      }
    }
  end

  let(:first_name) { 'john' }
  let(:last_name) { 'bob' }
  let(:farm_name) { 'farm name' }
  let(:email_address) { 'foo@bar.com' }
  let(:password) { 'thisisavalidpassword' }

  context 'when given valid params' do
    it 'creates a User with role of farmer' do
      expect(response).to have_http_status(:created)
      expect(User.where(role: 'farmer').count).to eq(1)
    end

    it 'also creates a Farm' do
      expect(Farm.count).to eq(1)
      farm_id = json.dig('user', 'farm_id')
      farm = Farm.find(farm_id)
      expect(farm.name).to eq(farm_name)
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

  context 'when given params with invalid password' do
    let(:password) { 'toosmall' }

    it 'does NOT create a User' do
      expect(response).to have_http_status(:unprocessable_entity)
      expect(json['errors'].keys).to include('password')
    end
  end

  context 'when given params with a farm name that already exists' do
    let(:another_farm) { create(:farm, name: 'another farm') }
    let(:farm_name) { another_farm.name }

    it 'still creates the User' do
      expect(response).to have_http_status(:created)
      expect(json['errors']).to_not be_present
    end
  end
end
