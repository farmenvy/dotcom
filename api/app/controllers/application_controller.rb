class ApplicationController < ActionController::API
  include BearerToken

  rescue_from JWT::DecodeError, with: :unauthorized
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  before_action :authenticate!

  attr_reader :user_id

  private

  def authenticate!
    jwt = JSONWebToken.decode bearer_token
    @user_id = jwt['sub']
  end

  def unauthorized
    render json: { status: 'not authorized' }, status: :unauthorized
  end

  def not_found
    render json: { status: 'record could not be found' }, status: :not_found
  end
end
