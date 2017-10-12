require 'rails_helper'

RSpec.describe Auth::BuildSessionPayload do
  subject { described_class }

  let(:perform) do
    subject.call(ip: ip, user: user)
  end

  let(:ip) { '127.0.0.1' }

  let(:user) do
    build_stubbed(:user, id: 1, roles: roles)
  end

  let(:roles) { %w[admin public farmer] }
  let(:result) { perform }

  describe 'expected attributes' do
    it "returns a payload that includes an #{attr}" do
      expect(result.payload.keys).to include(:access_token, :refresh_token)
    end
  end

  describe 'validations' do
    it 'fails if user is not provided' do
      expect { subject.call.call(ip: ip) }.to raise_error ArgumentError
    end

    it 'fails if ip is not provided' do
      expect { subject.call(user: user) }.to raise_error ArgumentError
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

    it 'has the users roles' do
      expect(payload['roles']).to eq roles
    end

    context 'when the user is pending_verification' do
      let(:user) do
        build_stubbed(:user, id: 1, pending_verification: true, roles: roles)
      end

      it 'does NOT include any roles' do
        expect(payload['roles']).to be_nil
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
    let(:refresh_token) { result.payload[:refresh_token] }
    let(:payload) { JSONWebToken.decode(refresh_token) }

    it 'has a valid refresh_token' do
      expect { payload }.to_not raise_error
    end

    it 'has the ip_address as the ip' do
      expect(payload['ip']).to eq(ip)
    end

    it 'has the user_id as the sub' do
      expect(payload['sub']).to eq(user.id)
    end

    it 'does NOT have an expiration' do
      expect(payload['exp']).to be_nil
    end

    it 'has an iat timestamp' do
      iat = payload['iat']
      expect(iat).to_not be_nil

      expect(iat).to be < 2.minutes.from_now.to_i
      expect(iat).to be > 2.minutes.ago.to_i
    end
  end
end
