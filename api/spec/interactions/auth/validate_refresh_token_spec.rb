require 'rails_helper'

RSpec.describe Auth::ValidateRefreshToken do
  subject { described_class }

  let(:user_id) { 1 }
  let(:jti) { 1 }
  let(:client_secret) { 'foobar' }

  let(:result) do
    subject.call(refresh_token: token, client_secret: client_secret)
  end

  let(:token_attributes) do
    { sub: user_id, jti: jti }
  end

  let(:token) do
    JSONWebToken.encode(token_attributes)
  end

  it 'softly fails if not given a refresh_token' do
    expect(subject.call).to be_a_failure
  end

  context 'when given a refresh token that does not exist in db' do
    it 'fails' do
      allow(RefreshToken).to receive(:find).and_raise ActiveRecord::RecordNotFound
      expect(result).to be_a_failure
      expect(result.error).to match(/notfound/i)
    end
  end

  context 'when given a refresh token that exists in db and client secret matches' do
    let(:rt) { build_stubbed(:refresh_token, secret: client_secret) }

    it 'succeeds' do
      allow(RefreshToken).to receive(:find).and_return rt
      expect(result).to be_a_success
    end
  end

  context 'when given refresh token that exists in db but WRONG client secret' do
    let(:rt) { build_stubbed(:refresh_token, secret: 'thisisdifferent') }

    it 'fails' do
      allow(RefreshToken).to receive(:find).and_return rt
      expect(result).to be_a_failure
      expect(result.error).to match(/secret/)
    end
  end

  context 'when given a refresh token without a sub' do
    let(:token_attributes) { { jti: 123 } }

    it 'fails' do
      expect(result).to be_a_failure
      expect(result.error).to match(/sub/)
    end
  end
end
