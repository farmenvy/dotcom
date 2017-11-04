class GrowBotNotify
  include Interactor

  GROWBOT_URL = ENV['GROWBOT_URL']

  def call
    validate_args
    res = HTTParty.post(GROWBOT_URL, body: context.json)
    context.response = res.body

    context.fail! unless res.success?
  end

  private

  def validate_args
    context.fail!(error: 'no payload') unless context.json
    context.fail!(error: 'not production') unless Rails.env.production?
  end
end
