class ApplicationController < ActionController::API
  include BearerToken

  rescue_from JWT::DecodeError, with: :unauthorized
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  before_action :authenticate!

  attr_reader :user_id
  attr_reader :jwt

  private

  def authenticate!
    decode
    verify_roles! unless skip_roles_verification
  end

  def decode
    @jwt = JSONWebToken.decode bearer_token
    @user_id = @jwt['sub']
  end

  def verify_roles!
    raise JWT::DecodeError unless jwt['roles'].present?
  end

  def unauthorized
    render json: { status: 'not authorized' }, status: :unauthorized
  end

  def not_found
    render json: { status: 'record could not be found' }, status: :not_found
  end
end
