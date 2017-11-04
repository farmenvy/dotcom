require 'rails_helper'

RSpec.describe NotifyUserSignup do
  let(:user) { build_stubbed(:user) }
  let(:result) { described_class.call(user: user) }

  describe 'payload' do
    it 'is not null' do
      expect(result.payload).to_not be_nil
    end

    it 'is NOT a string' do
      expect(result.payload).to_not be_a String
    end

    it 'can be converted to json' do
      expect { result.payload.to_json }.to_not raise_error
    end
  end
end
