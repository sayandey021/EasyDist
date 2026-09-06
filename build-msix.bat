@echo off
setlocal

echo ===================================================
echo EasyDist Tauri MSIX Package Builder
echo ===================================================

node scripts\build-msix.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to build MSIX package!
    exit /b %ERRORLEVEL%
)

echo.
echo [DONE] MSIX Package ready in dist\ folder.
echo [DONE] Unwanted build and staging files cleaned automatically.
