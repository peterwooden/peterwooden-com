#!/bin/bash

echo Enter title of new post:

read title

echo Creating "$title"...

name=$(echo "$title" | sed 's/\([a-z]\)\([A-Z]\)/\1-\2/g' | sed 's/\([A-Z]\{2,\}\)\([A-Z]\)/\1-\2/g' | sed 's/\s/-/g' | tr '[:upper:]' '[:lower:]')

timestamp=$(date --utc +%FT%TZ)

mkdir content/blog/$name

cat > content/blog/$name/index.md << EOF
---
title: $title
date: "$timestamp"
description: "$title"
---

Content
EOF
