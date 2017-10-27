require 'rails_helper'

RSpec.describe RefreshToken, type: :model do
  subject { described_class.new(attributes) }
  let(:attributes) do
    { user_id: user.id }
  end

  let(:user) { create(:user) }

  describe 'attributes' do
    %i[id user_id secret_hash secret].each do |attr|
      it "responds to #{attr}" do
        expect(subject).to respond_to(attr)
      end
    end
  end

  describe 'default values' do
    it 'creates a secret if no value exists' do
      expect(subject.secret).to be_nil
      subject.save
      expect(subject.secret).to_not be_nil
    end
  end

  describe 'immutability' do
    it 'is immutable after save' do
      subject.save

      subject.secret = 'testing123'
      expect { subject.save }.to raise_error ImmutabilityError
    end
  end

  describe 'secret encryption handling' do
    it 'allows setting the secret value' do
      expect { subject.secret = 'foo' }.to_not raise_error
    end

    it 'calls on BCrypt to encrypt during save' do
      subject.secret = 'foo'
      expect(subject.secret_hash).to be_nil
      expect(BCrypt::Password).to receive(:create).and_call_original
      subject.save
      expect(subject.secret_hash).to_not be_nil

      reading = BCrypt::Password.new(subject.secret_hash)
      expect(reading == subject.secret).to be_truthy
    end

    it 'has a secure_compare method' do
      expect(subject).to respond_to :secure_compare
    end

    it 'properly compares to original secret' do
      subject.secret = 'foo'
      subject.save
      expect(subject.secure_compare(subject.secret)).to be_truthy
      expect(subject.secure_compare('invalid')).to be_falsey
    end
  end

  describe '#payload' do
    it 'responds to payload' do
      expect(subject).to respond_to :payload
    end

    it 'generates the correct payload' do
      subject.secret = 'ohyeah'
      subject.save
      expected_payload = {
        jti: subject.id,
        iat: subject.created_at.to_i,
        sub: subject.user_id
      }.with_indifferent_access
      expect(subject.payload).to eq(expected_payload)
    end

    it 'raises an error if not persisted yet' do
      subject.secret = 'foo'
      expect { subject.payload }.to raise_error ArgumentError
    end

    it 'has #as_json aliased to #payload' do
      subject.secret = 'bar'
      subject.save
      expect(subject.payload).to eq(subject.as_json)
    end
  end

  describe '#as_jwt' do
    let(:attributes) do
      { user_id: user.id, secret: 'secret' }
    end

    before { subject.save }

    it 'generates a jwt' do
      expect(subject.as_jwt).to be_a String
    end

    it 'generates a valid jwt' do
      jwt = subject.as_jwt
      expect { JSONWebToken.decode(jwt) }.to_not raise_error
    end

    it 'generates a jwt with correct payload' do
      jwt = subject.as_jwt
      decoded = JSONWebToken.decode(jwt)

      expect(decoded).to eq(subject.payload)
    end

    it 'has #to_jwt aliased to #as_jwt' do
      expect(subject.to_jwt).to eq(subject.as_jwt)
    end
  end

  describe '#build_cookie_args' do
    it 'responds to :build_cookie_args' do
      expect(subject).to respond_to :build_cookie_args
    end

    it 'generates proper arguments' do
      subject.secret = 'foo'

      expected_args = {
        value: subject.secret,
        path: '/api/auth',
        same_site: :strict,
        httponly: true
      }

      expect(subject.build_cookie_args).to include(expected_args, :expires)
    end
  end
end
