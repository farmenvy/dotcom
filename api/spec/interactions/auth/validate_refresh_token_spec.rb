require 'rails_helper'

RSpec.describe Auth::ValidateRefreshToken do
  subject { described_class }

  let(:ip_address) { '127.0.0.1' }
  let(:request_ip) { ip_address }
  let(:user_id) { 1 }

  let(:result) do
    subject.call(refresh_token: token, ip: request_ip)
  end

  let(:token) do
    JSONWebToken.encode(ip: ip_address, sub: user_id)
  end

  it 'softly fails if not given a refresh_token' do
    expect(subject.call(ip: ip_address)).to be_a_failure
  end

  it 'raises an Exception if not given an ip' do
    expect { subject.call(refresh_token: 'abc') }.to raise_error ArgumentError
  end

  context 'when given a refresh token with same ip' do
    it 'succeeds' do
      expect(result).to be_a_success
    end

    it 'returns user_id in response' do
      expect(result.user_id).to be_present
    end
  end

  context 'when given an expired refresh token' do
    let(:token) do
      JSONWebToken.encode(sub: 1, ip: ip_address, exp: 2.days.ago)
    end

    it 'fails' do
      expect(result).to be_a_failure
    end
  end

  context 'when given a refresh token without a sub' do
    let(:token) do
      JSONWebToken.encode(ip: ip_address, exp: 2.minutes.from_now.to_i)
    end

    it 'fails' do
      expect(result).to be_a_failure
    end
  end

  context 'when given a refresh token with different ip' do
    let(:another_ip) { '10.0.0.1' }

    let(:token) do
      JSONWebToken.encode(ip: another_ip)
    end

    it 'fails' do
      expect(result).to be_a_failure
    end
  end
end
