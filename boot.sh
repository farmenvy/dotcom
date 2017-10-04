#!/bin/sh

abort() {
  echo "$*"
  exit 1
}

cd ${WEBAPP} || abort "$WEBAPP does not exist"
bin/setup

GIT_BRANCH=${GIT_BRANCH:-`git symbolic-ref --short -q HEAD`}

echo
echo '== Making client production build =='
echo

if [ "$GIT_BRANCH" = 'origin/master' ]
then
  echo '+-- on deployable branch'
  # changes to client
  if ! git diff-index --quiet origin/master^ -- client
  then
    echo '+-- found changes made to client'
    cd ${WEBAPP}/client
    yarn build
    echo '+-- moving build to public directory'
    mv build ../public
  else
    echo '+-- no changes made to client'
  fi
else
  echo '+-- not a deployable branch'
fi
