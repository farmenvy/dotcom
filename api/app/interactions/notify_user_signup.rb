class NotifyUserSignup
  include Interactor

  def call
    context.fail!(error: 'no user') unless context.user
    GrowBotNotify.call(payload: payload)
  end

  def payload
    {
      attachments: [
        {
          fallback: "#{title} -- #{text}",
          color: 'good',
          title: title,
          text: text,
          fields: fields
        }
      ]
    }
  end

  private

  def user
    context.user
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
        title: "Farm Name:",
        value: user.farm&.name,
        short: true
      }
    ]
  end
end
