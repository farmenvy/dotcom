
# Farm Envy dotcom


## Development

### Setting up

This repo uses docker so setting up is as simple as:

```
docker-compose build
```

All environment variables that you need are in `.env.development`.  If you need to add sensitive data like a password, add to `.env.development.local` which is ignored by git. Add to docker-compose.yml like this:

```
env_file:
- .env.development
- .env.development.local

```



### Running the application

```
docker-compose up
```

### Creating a bash session
```
# Usage:
# bin/shell [SERVICE_NAME]

bin/shell client
```

### Creating a rails console
```
bin/console
```

### Running ESlint
```
bin/eslint

# or add autocorrection
bin/eslint --fix
```

## Deployments

We use blue green deployments.  We have two production servers `blue` and `green`. Only one of them is visible to the public at a time.

* production server: https://farmenvy.com
* staging server: https://farmenvy.com:8443

Any code that is merged to master is automatically deployed to whichever server is [staging](./STAGING).

If you want to see which server is currently in production:

```
curl https://farmenvy.com/api/health
```

### Making a production release

Because of blue green deployments, a production release is as simple as changing the public IP address of farmenvy.com to the current [staging](./STAGING) server.

To make a release, simple change the [staging](./STAGING) from blue to green or vice versa, and the CI build will handle the rest. Or, use this script that automates everything for you:

```
script/swap-staging
```
The old production environment will become the new staging environment.


### Authentication

When a user creates a session via `/auth/session`, they are given a response which consists of:

1) access token
2) refresh token
3) `Set-Cookie` header with xsrf token

The refresh token has the following payload:
```json
{
  "sub": "<id>"
  "jti": "<id>"
  "iat": "<timestamp>"
}
```

Additionally, a refresh token record is created with following attributes:
```
id(jti) | client_secret
```

Example response after logging in:
```rb
token = RefreshToken.create(user_id: 1)

token.as_json # => { jti: token.id, sub: token.user_id, iat: 1234566 }
token.as_jwt # => "eyasdfas.asdasdf.adfasfd"
token.secret # => asdfaf-asfdasfd-asdfsaf-adfasd

secret = SecureRandom.hex(8)
encrypted_secret = BCrypt::Password.create(secret)

response.set_cookie(
  'client_secret',
  value: token.secret,
  path: '/api/auth',
  same_site: :strict,
  expires: 5.days.from_now,
  httponly: true,
)

# profit
```

When refresh requests are made, the server grabs the `jti` in the refresh token payload,
finds the appropriate refresh_token record and ensures that the `xsrf_token` matches the cookie that
is being sent.

If all is well, a new session payload is sent.
