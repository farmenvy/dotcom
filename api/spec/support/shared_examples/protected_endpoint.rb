RSpec.shared_examples 'a protected endpoint' do
  let(:perform_request) do
    send(action, endpoint, params: params, headers: headers)
  end

  before(:each) do
    DatabaseCleaner.clean
  end

  context 'when NOT given a bearer token' do
    let(:headers) do
      {
        'ACCEPT' => 'application/json'
      }
    end

    it 'returns 401 not authorized if NOT given bearer token' do
      perform_request
      expect(response).to have_http_status :unauthorized
    end
  end

  context 'when given a valid bearer token' do
    let(:headers) do
      valid_request_headers
    end

    it 'returns appropriate 2** response' do
      status = action.to_s == 'post' ? :created : :ok
      perform_request
      expect(response).to have_http_status(status)
    end
  end
end
