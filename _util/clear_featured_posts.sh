#!/bin/bash
find ./content -type f -name "*.md" -exec sed -i '' 's/category: featured/category: /g' {} +