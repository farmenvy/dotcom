#!/bin/sh

abort() {
  echo "$*"
  exit 1
}

cd ${WEBAPP} || abort "$WEBAPP does not exist"
bin/setup
