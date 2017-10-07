require 'rails_helper'

RSpec.describe Auth::ValidateRefreshToken do
  subject { described_class }

  let(:token) do
    JSONWebToken.encode(sub: ip_address)
  end

  it 'works' do
    expect { subject.call }.to_not raise_error
  end

  it 'softly fails if not given a refresh_token' do
    expect(subject.call).to be_a_failure
  end

  context 'when given a refresh token with same ip' do
    let(:ip_address) { '127.0.0.1' }
    let(:result) do
      subject.call(refresh_token: token)
    end

    it 'succeeds' do
      expect(result).to be_a_success
    end

    it 'returns a payload' do
      expect(result.payload).to be_present
    end
  end
end
