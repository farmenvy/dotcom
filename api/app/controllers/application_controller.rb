class ApplicationController < ActionController::API
  include BearerToken

  rescue_from JWT::DecodeError, with: :unauthorized
  before_action :authenticate!

  private

  def authenticate!
    jwt = JSONWebToken.decode bearer_token
    @user_id = jwt['sub']
  end

  def unauthorized
    render json: { status: 'not authorized' }, status: :unauthorized
  end
end
