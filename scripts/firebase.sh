#!/bin/bash

set -e

if [ -z "$FIREBASE_TOKEN" ]; then
  echo "FIREBASE_TOKEN is required to run commands with the firebase cli"
  exit 126
fi

if [ -n "$FIREBASE_PROJECT_ID" ]; then
    echo "Setting firebase project to $FIREBASE_PROJECT_ID"
    firebase use --add "$FIREBASE_PROJECT_ID"
fi

echo "Config was set. Will apply target."

firebase target:apply hosting $FIREBASE_PROJECT_ID

echo "Target was set. Will deploy."

firebase deploy --only hosting