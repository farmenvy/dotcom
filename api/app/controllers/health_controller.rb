class HealthController < ApplicationController
  def index
    render json: {
      version: Rails.configuration.version,
      server: Rails.configuration.server,
      staging: Rails.configuration.staging
    }
  end
end
