class GrowBotNotify
  include Interactor

  GROWBOT_URL = ENV['GROWBOT_URL']

  def call
    context.fail!(error: 'no payload') unless context.payload
    res = HTTParty.post(GROWBOT_URL, body: context.payload.to_json)
    context.response = res.body

    context.fail! unless res.success?
  end
end
