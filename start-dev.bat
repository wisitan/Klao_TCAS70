@echo off
chcp 65001 > nul
title Preview TCAS 70 Web Local Server
echo ========================================================
echo   🚀 เปิดเว็บจำลอง TCAS 70 (สามารถเปิดดูบนมือถือผ่าน Wi-Fi ได้)
echo ========================================================
echo.
echo กำลังเริ่มรัน Dev Server...
call npm run dev
pause
