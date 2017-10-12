class ValidateEmail
  EMAILS_FILE = Rails.root.join('config', 'burner-email-providers', 'emails.txt')

  include Interactor

  def call
    context.fail! unless valid_args?

    File.open(EMAILS_FILE).each_line do |line|
      break context.fail!(invalid: line) if provider == line.chomp
    end
  end

  private

  def valid_args?
    context.email.present? && context.email.match?(/\A\S+@\S+\.\S+\Z/)
  end

  def provider
    context.email.split('@').last
  end
end
