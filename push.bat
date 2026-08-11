@echo off
echo Committing direct WhatsApp routing fix...
git add -A
git commit -m "Direct routing to native WhatsApp app or WhatsApp Web"
echo.
echo Executing Git Push to origin main...
git push
echo.
echo Process complete.
pause
