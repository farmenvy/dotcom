require 'rails_helper'

RSpec.describe ValidateEmail do
  subject { described_class }

  let(:perform) { subject.call(email: email) }
  let(:result) { perform }

  let(:email) { 'foo@gmail.com' }

  it 'works' do
    expect { perform }.to_not raise_error
  end

  it 'has a valid config file' do
    expect(ValidateEmail::EMAILS_FILE).to exist
  end

  context 'when not given an email' do
    let(:perform) { subject.call }

    it 'fails' do
      expect(perform).to be_a_failure
    end
  end

  describe 'valid emails' do
    context 'gmail' do
      let(:email) { 'foo@gmail.com' }
      it_behaves_like 'a success'
    end

    context 'yahoo' do
      let(:email) { 'foo@yahoo.com' }
      it_behaves_like 'a success'
    end
  end

  context 'when given an email that is clearly wrong' do
    let(:email) { 'poop' }
    it_behaves_like 'a failure'
  end

  describe 'known burner email providers' do
    context 'guerrillamail.com' do
      let(:email) { 'foo@guerrillamail.com' }
      it_behaves_like 'a failure'
    end

    context 'sharklasers.com' do
      let(:email) { 'foo@guerrillamail.com' }
      it_behaves_like 'a failure'
    end

    context 'sharklasers.com' do
      let(:email) { 'foo@guerrillamail.com' }
      it_behaves_like 'a failure'
    end

    context 'zzz.com' do
      let(:email) { 'foo@zzz.com' }
      it_behaves_like 'a failure'
    end

    context '14n.co.uk' do
      let(:email) { 'foo@14n.co.uk' }
      it_behaves_like 'a failure'
    end
  end
end
