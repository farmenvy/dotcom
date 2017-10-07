class HealthController < ApplicationController
  def index
    render json: {
      version: Rails.configuration.version
    }
  end
end
