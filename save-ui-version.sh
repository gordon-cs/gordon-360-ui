#!/usr/bin/env bash

# Save the git commit SHA and date from the current branch as JSON in a file
# imported by the About page.

VERSION_JSON="$(git rev-parse --show-toplevel)/src/views/About/version.json"

commit_sha=$(git rev-parse --short HEAD)
commit_date=$(git log -1 --format="%at" | xargs -I{} date -u -d @{} +"%Y/%m/%d %H:%M:%S %Z")

cat << EOF > $VERSION_JSON
{
  "commit": "$commit_sha",
  "date": "$commit_date"
}
EOF
