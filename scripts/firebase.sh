#!/bin/bash

set -e

if [ -z "$FIREBASE_TOKEN" ]; then
  echo "FIREBASE_TOKEN is required to run commands with the firebase cli"
  exit 126
fi

if [ -n "$FIREBASE_PROJECT_ID" ]; then
  echo "Setting firebase project to $FIREBASE_PROJECT_ID"
fi

echo "Target was set. Will deploy"

firebase deploy --token "$FIREBASE_TOKEN" "$FIREBASE_PROJECT"