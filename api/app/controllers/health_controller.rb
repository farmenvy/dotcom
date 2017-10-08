class HealthController < ApplicationController
  def index
    render json: {
      version: Rails.configuration.version,
      server: Rails.configuration.server,
      last_updated: Rails.configuration.last_updated
    }
  end
end
