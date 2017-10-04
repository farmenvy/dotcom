require 'rails_helper'

RSpec.describe JSONWebToken do
  subject { described_class }

  describe '.encode' do
    it 'responds_to :encode' do
      expect(subject).to respond_to :encode
    end

    it 'returns a jwt' do
      jwt = subject.encode({})
      expect(jwt).to be_a String
      expect(jwt.split('.').length).to eq(3)
    end

    it 'accepts a payload' do
      expect { subject.encode({foo: 'bar'}) }.to_not raise_error
    end
  end


  describe '.decode' do
    it 'responds_to :decode' do
      expect(subject).to respond_to :decode
    end

    it 'decodes a jwt and returns a hash' do
      jwt = subject.encode({})
      result = subject.decode(jwt)
      expect(result).to be_a Hash
    end
  end

  describe 'data' do
    let(:payload) do
      {
        user_id: 1
      }.with_indifferent_access
    end

    it 'works' do
      jwt = subject.encode(payload)
      decoded = subject.decode(jwt)
      expect(decoded).to eq(payload)
    end
  end
end
