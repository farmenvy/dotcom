class HealthController < ApplicationController
  def index
    render json: { status: 'up' }
  end
end
