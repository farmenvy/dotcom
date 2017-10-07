module BearerToken
  def bearer_token
    request.authorization.to_s.split.last
  end
end
