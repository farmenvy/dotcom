desc "One line task description"
task jwt: :environment  do
  puts JSONWebToken.encode({ sub: 'system' })
end
