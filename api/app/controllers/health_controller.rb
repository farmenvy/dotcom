class HealthController < ApplicationController
  def index
    render json: {
      version: Rails.configuration.version,
      server: Rails.configuration.server
    }
  end
end
