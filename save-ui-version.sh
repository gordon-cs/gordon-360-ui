#!/usr/bin/env bash

GIT_DIR=$(echo $(git rev-parse --git-dir)/../src)
VERSION_JSON="$GIT_DIR/views/About/version.json"

commit_sha=$(git rev-parse --short HEAD)
commit_date=$(git log -1 --format="%at" | xargs -I{} date -u -d @{} +"%Y/%m/%d %H:%M:%S %Z")

cat << EOF > $VERSION_JSON
[
  {
    "commit": "$commit_sha",
    "date": "$commit_date"
  }
]
EOF
