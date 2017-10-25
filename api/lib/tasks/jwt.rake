desc 'One line task description'
task jwt: :environment  do
  puts JSONWebToken.encode(sub: 'system', exp: 3.minutes.from_now)
end
