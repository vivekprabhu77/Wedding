@echo off
title Wedding Invitation Server - Vighnesh and Rashmitha
cd /d "%~dp0"

echo ============================================================
echo   Chi. Vighnesh ^& Chi. Sou. Rashmitha - Wedding Invitation
echo ============================================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js was not found in your system PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [INFO] Installing dependencies...
    call npm.cmd install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies.
        echo.
        pause
        exit /b 1
    )
)

echo Starting the development server...
echo Press Ctrl+C in this window to stop the server.
echo.

call npm.cmd run dev -- --host 0.0.0.0 --port 5173 --open /

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server exited with an error.
    pause
)
