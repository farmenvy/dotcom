require 'rails_helper'

RSpec.describe Auth::RefreshController do
  subject { described_class.new }

  let(:remote_ip) { '127.0.0.1' }
  let(:request) { double(:request, remote_ip: remote_ip) }
  let(:token) do
    JSONWebToken.encode(ip: remote_ip, sub: user.id)
  end

  let(:user) { create(:user, role: role) }

  let(:role) { 'farmer' }

  before do
    allow(subject).to receive(:request).and_return request
    allow(subject).to receive(:render)
    allow(subject).to receive(:bearer_token).and_return token
  end

  describe '#create' do
    it 'calls on Auth::ValidateRefreshtoken with correct args' do
      expect(Auth::ValidateRefreshToken).to receive(:call)
        .with(refresh_token: token, ip: request.remote_ip).and_call_original

      subject.create
    end

    context 'when validation succeeds' do
      it 'calls on Auth::BuildSessionPayload with correct args' do
        expect(Auth::BuildSessionPayload).to receive(:call).with(user: user, ip: request.remote_ip).and_call_original

        subject.create
      end
    end

    context 'when validation fails' do
      let(:another_ip) { '10.0.0.1' }

      let(:token) do
        JSONWebToken.encode(ip: another_ip, sub: user.id)
      end

      it 'does NOT call on Auth::BuildSessionPayload' do
        expect(Auth::BuildSessionPayload).to_not receive(:call)

        subject.create
      end
    end
  end
end
