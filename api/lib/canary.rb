class Canary

  def initialize(app)
    @app = app
  end

  def call(env)
    if env['PATH_INFO'.freeze] == '/canary'.freeze
      bearer_token = env['HTTP_AUTHORIZATION'].to_s.split[1]
      return not_authorized unless valid_token?(bearer_token)
      json_response
    else
      @app.call(env)
    end
  end

  private

  def valid_token?(token)
    ::JSONWebToken.decode(token)
  end

  def not_authorized
    [
      401,
      { 'Content-Type' => 'application/json' },
      [{status: 'not authorized'}.to_json]
    ]
  end

  def json_response
    [status, { 'Content-Type' => 'application/json' }, [json_body.to_json]]
  end

  def status
    json_body.all? { |k, v| v == true } ? 200 : 500
  end

  def json_body
    @json_body ||= { db: check_db }
  end

  def check_db
    ActiveRecord::Base.connection.present?
  rescue ActiveRecord::ActiveRecordError => error
    error
  end
end

