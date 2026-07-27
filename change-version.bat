@echo off
setlocal

echo ===================================================
echo EasyDist Version Changer
echo ===================================================
set /p NEW_VERSION="Enter the new version number (e.g. 1.2.3): "

if "%NEW_VERSION%"=="" (
    echo Error: No version provided!
    exit /b 1
)

echo.
echo ===================================================
echo Updating package.json and package-lock.json...
echo ===================================================
call npm version %NEW_VERSION% --no-git-tag-version

echo.
echo ===================================================
echo Updating version in App About UI ^(settings/page.tsx^)...
echo ===================================================
node scripts\update-about-version.js %NEW_VERSION%

echo.
echo ===================================================
echo Version successfully updated to %NEW_VERSION% !
echo Note: MSIX/AppX build setup automatically inherits 
echo the new version from package.json during the build.
echo ===================================================
