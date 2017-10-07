module Auth
  class ValidateRefreshToken
    include Interactor

    def call
      context.fail! unless context.refresh_token.present?
      context.payload = 'adsfasdf'
    end
  end
end
