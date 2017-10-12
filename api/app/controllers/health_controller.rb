class HealthController < ApplicationController
  skip_before_action :authenticate!, only: :index

  def index
    render json: {
      server: Rails.configuration.server,
      last_updated: Rails.configuration.last_updated
    }
  end
end
