require 'rails_helper'

RSpec.describe JSONWebToken do
  subject { described_class }

  let(:payload) do
    { exp: 1.minute.from_now.to_i }
  end

  let(:jwt) do
    subject.encode payload
  end

  describe '.encode' do
    it 'responds_to :encode' do
      expect(subject).to respond_to :encode
    end

    it 'returns a jwt' do
      expect(jwt).to be_a String
      expect(jwt.split('.').length).to eq(3)
    end

    it 'accepts a payload' do
      expect { jwt }.to_not raise_error
    end
  end

  describe '.decode' do
    it 'responds_to :decode' do
      expect(subject).to respond_to :decode
    end

    it 'decodes a jwt and returns a hash' do
      result = subject.decode(jwt)
      expect(result).to be_a Hash
    end
  end

  describe 'data' do
    let(:payload) do
      {
        user_id: 1,
        exp: 1.minute.from_now.to_i
      }.with_indifferent_access
    end

    it 'works' do
      decoded = subject.decode(jwt)
      expect(decoded).to eq(payload)
    end
  end
end
