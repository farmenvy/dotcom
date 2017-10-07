require 'rails_helper'

RSpec.describe 'GET /index', type: :request do
  before do
    get '/health', params: {}, headers: {}
  end

  it 'returns the application version' do
    expect(json).to include('version' => Rails.configuration.version)
  end
end
