
# Farm Envy dotcom


## Development

### Setting up

This repo uses docker so setting up is as simple as:

```
docker-compose build
```

All environment variables that you need are in `.env.development`.  If you need to add sensitive data like a password, add to `.env.development.local` which is ignored by git.

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

* blue server: http://blue.binarymasonry.com
* green server: http://green.binarymasonry.com

Any code that is merged to master is automatically deployed to whichever server is [staging](./STAGING).

If you want to see which server is currently in production, view the `/api/health` endpoint.

### Making a production release

Because of blue green deployments, a production release is as simple as changing the public IP address of farmenvy.com to the current [staging](./STAGING) server.

To make a release, first make sure your local master branch is even with origin/master.  Then bump the application [version](./VERSION). Make a commit, then run `script/release`.

The old production environment will become the new [staging](./STAGING) environment.

