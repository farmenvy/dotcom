class NotifyUserSignup
  include Interactor

  PAYLOAD = <<~HERE.freeze
    {
      attachments: [
        {
          fallback: %<fallback>s,
          color: 'good',
          title: %<title>s,
          text: %<text>s,
          fields: %<fields>s
        }
      ]
    }
  HERE

  def call
    context.fail!(error: 'no user') unless context.user
    GrowBotNotify.call(payload: payload)
  end

  def payload
    format(PAYLOAD, fallback: fallback, title: title, text: text, fields: fields)
  end

  private

  def user
    context.user
  end

  def fallback
    "#{title} -- #{text}"
  end

  def title
    'User signed up!'
  end

  def text
    "#{user.first_name} #{user.last_name}"
  end

  def fields
    [
      {
        title: 'Farm Name:',
        value: user.farm&.name,
        short: true
      }
    ]
  end
end
