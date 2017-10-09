RSpec.shared_examples 'an unprotected endpoint' do
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

    it 'returns appropriate 2** response' do
      status = action.to_s == 'post' ? :created : :ok
      perform_request
      expect(response).to have_http_status(status)
    end
  end
end
