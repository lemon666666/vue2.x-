#!/bin/bash
# 当发生错误时中止脚本
set -e

# 构建
npm run build
# cd 到构建输出的目录
#cd dist

git init
git add -A
git commit -m $(date "+%Y%m%d")
git push -f git@github.com:lemon666666/vue2.x-.git master

cd -