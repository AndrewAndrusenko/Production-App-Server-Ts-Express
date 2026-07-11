:: 1. Очистка: закрываем старые зависшие процессы Redis в Ubuntu
wsl -d Ubuntu -e pkill redis-server
:: 1.Запуск Redis в WSL (Ubuntu) в сворачиваемом окне
start "Redis Server" /min wt.exe -p "Ubuntu" wsl -d Ubuntu -e sh -c "redis-server"

:: 2. Пауза 3 секунды, чтобы Redis успел инициализироваться timeout /t 3 /nobreak >nul

:: 3.Запуск S3 MinIo для обслуживания стенда ProSystem-Demo-Backend
start "MinIo" /min /d "c:\minio\" minio.exe server C:\minio\data --address ":9000" --console-address ":9001"

:: 4.Запуск production node server для демонстрации проектов через интернет. Проекты AAM, JWT, RTQ and etc
start "Prod Main Server" /min /d "c:\!Development\!Projects\Prod-Server-3A\dist\bin" node prod-main.js

:: 5.Запуск Backend Server для обслуживания проекта AAM.RestAPI
start "AAM Backend Server" /min /d "c:\!Development\!Projects\AAM\Backend-Express Node-API Server" node server.js

:: 6.Запуск Authenticate Backend Server
start "Authenticate Server" /min /d "c:\!Development\!Projects\Auth-Server-Backend\dist\bin" node auth-server.js

:: 7.Запуск Real-Time Quotes Backend Server - WSS
start "RTQ-WSS Server" /min /d "c:\!Development\!Projects\Real-Time-Quotes-Backend" node wss-cli.js