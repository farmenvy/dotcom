require 'rails_helper'

RSpec.describe Auth::SessionController do
  subject { described_class.new }

  let(:user) { double(:user, id: 123) }
  let(:request) { double(:request, remote_ip: '127.0.0.1') }

  before do
    allow(subject).to receive(:user).and_return user
    allow(subject).to receive(:request).and_return request
    allow(subject).to receive(:authenticate!).and_return true
    allow(subject).to receive(:render)
  end

  describe '#create' do
    it 'calls on Auth::BuildSessionPayload with correct args' do
      expect(Auth::BuildSessionPayload).to receive(:call).with(user_id: user.id, ip: request.remote_ip).and_call_original

      subject.create
    end
  end
end
