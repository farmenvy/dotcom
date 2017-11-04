class NotifyUserSignup
  include Interactor

  PAYLOAD = <<~HERE.freeze
  HERE

  def call
    context.fail!(error: 'no user') unless context.user
    GrowBotNotify.call(payload: payload)
  end

  private

  def payload
    context.payload ||= build_payload
  end

  def build_payload
    {
      attachments: [
        {
          fallback: fallback,
          color: 'good',
          title: title,
          text: text,
          fields: fields
        }
      ]
    }
  end

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
