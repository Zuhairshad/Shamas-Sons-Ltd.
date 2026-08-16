@echo off
echo Running copy-variants.js to copy product images...
node copy-variants.js

echo Initializing git and setting remote origin...
git init
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Zuhairshad/Shamas-Sons-Ltd..git

echo Staging files...
git add .

echo Committing changes...
git commit -m "feat: add Shamas & Sons branding, hero slideshow, seller info, and product variants"

echo Setting branch to main...
git branch -M main

echo Pushing code to GitHub...
git push -u origin main --force

echo Done! Refresh your page to see the changes.
pause
