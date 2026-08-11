@echo off
echo Committing WhatsApp form fix...
git add -A
git commit -m "Fix mobile WhatsApp form submit redirect"
echo.
echo Executing Git Push to origin main...
git push
echo.
echo Process complete.
pause
