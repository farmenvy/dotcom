require 'rails_helper'

RSpec.describe Auth::BuildSessionPayload do
  subject { described_class }

  let(:perform) do
    subject.call(user: user)
  end

  let(:user) do
    build_stubbed(:user, id: 123, role: role)
  end

  let(:role) { 'admin' }
  let(:result) { perform }
  let(:refresh_token) { build_stubbed(:refresh_token) }

  before do
    allow(RefreshToken).to receive(:create!).and_return refresh_token
  end

  describe 'expected attributes' do
    it "returns a payload that includes an #{attr}" do
      expect(result.payload.keys).to include(:access_token, :refresh_token)
    end
  end

  describe 'validations' do
    it 'fails if user is not provided' do
      expect { subject.call.call }.to raise_error ArgumentError
    end
  end

  describe 'access_token' do
    let(:access_token) { result.payload[:access_token] }
    let(:payload) { JSONWebToken.decode(access_token) }

    it 'is a valid JWT' do
      expect { payload }.to_not raise_error
    end

    it 'has the correct payload' do
      sub = payload['sub']
      expect(sub).to_not be_nil
      expect(sub).to eq(user.id)

      exp = payload['exp']
      expect(exp).to_not be_nil
    end

    it 'has an iat' do
      expect(payload['iat']).to_not be_nil
    end

    it 'has the users role' do
      expect(payload['role']).to eq role
    end

    context 'when the user is pending_verification' do
      let(:user) do
        build_stubbed(:user, pending_verification: true, role: role)
      end

      it 'the role is PENDING' do
        expect(payload['role']).to eq('pending')
      end
    end

    it 'has an expiration of 3 minutes' do
      exp = payload['exp']

      max = 3.minutes.from_now.to_i
      min = 2.5.minutes.from_now.to_i

      expect(exp).to be <= max
      expect(exp).to be >= min
    end
  end

  describe 'refresh_token' do
    it 'is present in payload' do
      expect(result.payload[:refresh_token]).to_not be_nil
    end
  end
end
