@echo off
setlocal
echo ===================================================
echo     Starting Academic Challenge Web Platform
echo ===================================================
echo.

cd /d "%~dp0"

REM Check for portable node in .bin or system node
if exist "%~dp0.bin\node.exe" (
    echo Using portable Node.js runtime from .bin...
    set "NODE_CMD=%~dp0.bin\node.exe"
) else (
    where node >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo Using system Node.js...
        set "NODE_CMD=node"
    ) else (
        echo ERROR: Node.js was not found in .bin or system PATH.
        echo Please ensure node.exe is present or install Node.js.
        pause
        exit /b 1
    )
)

echo Platform URL: http://localhost:3000
echo Admin Panel:  http://localhost:3000/#admin
echo Press Ctrl+C to stop the server.
echo.

"%NODE_CMD%" server/server.js
pause
