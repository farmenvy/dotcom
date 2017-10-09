class HealthController < ApplicationController
  skip_before_action :authenticate!, only: :index

  def index
    render json: {
      version: Rails.configuration.version,
      server: Rails.configuration.server,
      last_updated: Rails.configuration.last_updated
    }
  end
end
