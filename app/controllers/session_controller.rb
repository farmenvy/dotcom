# do not inherit from application controller
# implementing different authentication here.
class SessionController < ActionController::API
  include ActionController::HttpAuthentication::Basic::ControllerMethods

  before_action :authenticate!

  def create
    render json: payload, status: :created
  end

  private

  def authenticate!
    authenticate_or_request_with_http_basic do |email, password|
      @user = User.find_by(email_address: email)
                  .try(:authenticate, password)
    end
  end

  def payload
    {
      token: JSONWebToken.encode(user_id: @user.id)
    }
  end
end
