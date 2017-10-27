require 'rails_helper'

RSpec.describe Auth::RefreshController do
  subject { described_class.new }

  let(:request) do
    double(:request, cookies: { 'client_secret' => client_secret })
  end
  let(:client_secret) { 'supersecret' }
  let(:token) { JSONWebToken.encode(sub: user.id) }

  let(:user) { build_stubbed(:user, id: 1, role: role) }

  let(:role) { 'farmer' }
  let(:result) { double(:result, success?: true, user_id: user.id) }
  let(:session_payload) { double(:session_payload, payload: {}) }

  before do
    allow(subject).to receive(:request).and_return request
    allow(Auth::ValidateRefreshToken).to receive(:call).and_return result
    allow(Auth::BuildSessionPayload).to receive(:call).and_return session_payload
    allow(User).to receive(:find).and_return user
    allow(subject).to receive(:render)
    allow(subject).to receive(:bearer_token).and_return token
  end

  describe '#create' do
    it 'calls on Auth::ValidateRefreshtoken with correct args' do
      expect(Auth::ValidateRefreshToken).to receive(:call)
        .with(refresh_token: token, client_secret: request.cookies['client_secret'])

      subject.create
    end

    context 'when validation fails' do
      let(:result) { double(:result, success?: false, user_id: user.id, error: 'error') }

      it 'does NOT call on Auth::BuildSessionPayload' do
        expect(Auth::BuildSessionPayload).to_not receive(:call)

        subject.create
      end
    end
  end
end
