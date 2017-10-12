require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'attributes' do
    %i[
      first_name
      last_name
      email_address
      password_digest
    ].each do |attr|
      it "responds_to #{attr}" do
        expect(subject).to respond_to attr
      end
    end
  end

  let(:user_attributes) do
    {
      first_name: first_name,
      last_name: last_name,
      email_address: email_address,
      password: password,
      password_confirmation: password_confirmation
    }
  end

  let(:first_name) { 'bob' }
  let(:last_name) { 'jones' }
  let(:email_address) { 'email@email.com' }
  let(:password) { 'thisisaprettygoodpassword' }
  let(:password_confirmation) { 'thisisaprettygoodpassword' }

  let(:subject) do
    User.new(user_attributes)
  end

  describe 'password' do
    let(:password) { nil }
    let(:password_confirmation) { nil }

    it 'receives a password_digest on save' do
      expect(subject.password_digest).to be_nil
      subject.password = 'test'
      subject.password_confirmation = 'test'
      expect(subject.password_digest).to_not be_nil
    end

    it 'has minimal length of 12 characters' do
      subject.password = 'toosmall'
      expect(subject).to be_invalid
      expect(subject.errors.keys).to include(:password)

      subject.password = 'thisisover12characters'
      expect(subject).to be_valid
    end
  end

  describe 'email_address validation' do
    let(:email_address) { nil }

    it 'is works' do
      expect(subject).to be_invalid
      subject.email_address = 'foo@bar.com'
      expect(subject).to be_valid
      subject.email_address = 'foo@bar'
      expect(subject).to be_invalid
      subject.email_address = 'thisisinvalid'
      expect(subject).to be_invalid
      subject.email_address = 'foo@bar.co.uk'
      expect(subject).to be_valid
    end

    it 'does NOT except burner emails' do
      subject.email_address = 'foo@guerrillamail.com'
      expect(subject).to be_invalid
      expect(subject.errors.messages).to include(email_address: ['is invalid'])
    end
  end
end
