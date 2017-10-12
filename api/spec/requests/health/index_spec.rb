require 'rails_helper'

RSpec.describe 'GET /index', type: :request do
  before do
    get '/health', params: {}, headers: {}
  end

  it 'returns the application version' do
    expect(json).to include(
      'server' => Rails.configuration.server,
      'last_updated' => Rails.configuration.last_updated
    )
  end
end
