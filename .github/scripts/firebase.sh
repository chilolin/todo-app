#!/bin/sh -l

set -e

if [ -n "$FIREBASE_PROJECT_ID" ]; then
  echo "Setting firebase project to $FIREBASE_PROJECT_ID"
  firebase use --add "$FIREBASE_PROJECT_ID"
fi

echo "Will apply target."

firebase target:apply hosting $FIREBASE_PROJECT_ID $FIREBASE_PROJECT_ID

echo "Target was set. Will deploy"

firebase deploy
