@echo off
echo Committing mobile layout fixes...
git add -A
git commit -m "Fix expertise grid columns on mobile viewports"
echo.
echo Executing Git Push to origin main...
git push
echo.
echo Process complete.
pause
