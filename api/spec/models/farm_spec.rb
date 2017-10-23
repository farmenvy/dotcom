require 'rails_helper'

RSpec.describe Farm, type: :model do
  subject { described_class.new(farm_attributes) }

  let(:farm_attributes) do
    {
      name: farm_name
    }
  end

  let(:farm_name) { 'some farm name' }

  context 'when another farm with same name exists' do
    let(:another_farm) { create(:farm, name: 'another farm') }

    let(:farm_name) { another_farm.name }

    it 'does NOT raise a validation error' do
      expect(subject).to be_valid
    end
  end
end
