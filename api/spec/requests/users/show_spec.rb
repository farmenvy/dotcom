require 'rails_helper'

RSpec.describe 'GET /me', type: :request do
  let(:endpoint) { "/me" }

  let(:user) { create(:user) }

  before do
    get endpoint, params: params, headers: valid_request_headers(user.id)
  end

  let(:params) do
    {}
  end


  %w[id first_name last_name email_address role].each do |attr|
    it "shows the user's #{attr}" do
      expect(json.dig('user', attr)).to eq(user.send(attr))
    end
  end

  %w[id name].each do |attr|
    it "shows the user's farm #{attr}" do
      expect(json.dig('user', 'farm_attributes', attr)).to eq(user.farm.send(attr))
    end
  end

  it 'does NOT include password fields' do
    expect(json['user'].keys.select { |x| x =~ /password/i }).to be_empty
  end
end
