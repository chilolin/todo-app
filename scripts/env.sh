#!/bin/bash

set -e

echo "REACT_APP_FIREBASE_API_KEY=$FIREBASE_API_KEY" >> "$ENV_NAME"
echo "REACT_APP_FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN" >> "$ENV_NAME"
echo "REACT_APP_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID" >> "$ENV_NAME"
echo "REACT_APP_FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET" >> "$ENV_NAME"
echo "REACT_APP_FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGINC_SENDER_ID" >> "$ENV_NAME"
echo "REACT_APP_FIREBASE_APP_ID=$FIREBASE_APP_ID" >> "$ENV_NAME"
echo "REACT_APP_FIREBASE_MEASURMENT_ID=$FIREBASE_MEASURMENT_ID" >> "$ENV_NAME" 