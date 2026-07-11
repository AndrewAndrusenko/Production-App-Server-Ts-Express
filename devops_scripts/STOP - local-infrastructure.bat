@echo off
echo === ОСТАНОВКА ВСЕХ СЕРВИСОВ ===

:: 1. Корректное закрытие Redis внутри Ubuntu (освобождает порт 6379)
echo Останавливаем Redis в WSL...
wsl -d Ubuntu -e pkill redis-server

:: 2. Останавливаем Prod Main Server 
echo Останавливаем Prod Main Server...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do taskkill /f /pid %%a 2>nul

:: 3. Останавливаем AAM Backend Server 
echo Останавливаем AAM Backend Server...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5001 ^| findstr LISTENING') do taskkill /f /pid %%a 2>nul

:: 4. Принудительное закрытие MinIo
echo Останавливаем MinIo...
taskkill /f /im minio.exe 2>nul

echo === ВСЕ СЕРВИСЫ УСПЕШНО ОСТАНОВЛЕНЫ ===
timeout /t 3
