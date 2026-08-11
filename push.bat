@echo off
echo Committing spelling fix...
git add -A
git commit -m "Fix mixed-script Telugu encoding error for the word lakshyam"
echo.
echo Executing Git Push to origin main...
git push
echo.
echo Process complete.
pause
