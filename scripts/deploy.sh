#!/bin/bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail

# Environment Variables
# Set these variables at https://travis-ci.org/gordon-cs/gordon-360-ui/settings
# HOSTNAME hostname for sending files to
# DEPLOY_USER username to log into server
# DEPLOY_PASSWORD password to log into server
# PRODUCTION_DIR absolute path to directory for production app
# STAGING_DIR absolute path to directory for staging app

# Get current environment (production or staging) from argument passed by Travis
DEPLOY_ENV="$1"

# Decide which directory to deploy to based on deploy environment
if [ "$DEPLOY_ENV" = "production" ]; then
  DIR="$PRODUCTION_DIR"
else
  DIR="$STAGING_DIR"
fi

BUILD_DIR="build"

printf "%s\n" "Removing backup directory from previous deployment..."

# Remove temporary directory (using PowerShell commands, not Bash commands)
sshpass -p "$DEPLOY_PASSWORD" ssh "$DEPLOY_USER"@"$HOSTNAME" \
  "if (Test-Path "$DIR-backup") { rm -r "$DIR-backup"; }"

if [ $? == 0 ]; then
  printf "%s\n" "Successfully removed backup directory"
else
  printf "%s\n" "Failed to remove backup directory"
fi


printf "%s\n" "Moving app to backup directory... "

# Move app to temporary directory
sshpass -p "$DEPLOY_PASSWORD" ssh "$DEPLOY_USER"@"$HOSTNAME" cp -r "$DIR" "$DIR-backup"

if [ $? == 0 ]; then
  printf "%s\n" "Successfully moved app to backup directory"
else
  printf "%s\n" "Failed to move app to backup directory"
fi

printf "%s\n" "Clearing out app directory... "

# Clear out app directory
sshpass -p "$DEPLOY_PASSWORD" ssh "$DEPLOY_USER"@"$HOSTNAME" rm -r "$DIR/*"

if [ $? == 0 ]; then
  printf "%s\n" "Sucessfully cleared out app directory"
else
  printf "%s\n" "Failed to clear out app directory"
fi

printf "%s\n" "Copying app to server... "

# Copy built app to server
sshpass -p "$DEPLOY_PASSWORD" scp -r build/* "$DEPLOY_USER"@"$HOSTNAME":"$DIR"

# List files on IIS Server
sshpass -p "$DEPLOY_PASSWORD" ssh "$DEPLOY_USER"@"$HOSTNAME" \
  "ls -R $DIR | Out-File -filepath $DIR/files.txt"

if [ $? == 0 ]; then
  printf "%s\n" "Successfully copied app to $DEPLOY_ENV"
else
  printf "%s\n" "Failed to copy app to server"
fi

