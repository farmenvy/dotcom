require 'rails_helper'

RSpec.describe Auth::SessionController do
  subject { described_class.new }

  let(:user) { build_stubbed(:user, id: 123) }
  let(:response) { double(:response) }
  let(:result) { double(:result, success?: true, payload: {}, cookie_args: {}) }


  before do
    allow(subject).to receive(:user).and_return user
    allow(subject).to receive(:authenticate!).and_return true
    allow(subject).to receive(:render)
    allow(Auth::BuildSessionPayload).to receive(:call).and_return(result)
    allow(subject).to receive(:response).and_return(response)
    allow(response).to receive(:set_cookie)
  end

  describe '#create' do
    it 'calls on Auth::BuildSessionPayload with correct args' do
      expect(Auth::BuildSessionPayload).to receive(:call).with(user: user)
      subject.create
    end

    it 'sets the cookie if result is a success' do
      expect(response).to receive(:set_cookie).with('client_secret', result.cookie_args)
      subject.create
    end
  end
end
