@echo off
chcp 65001 > nul
title Sync TCAS 70 Excel to Web & Deploy
echo ========================================================
echo   🔄 TCAS 70 Psychology Port - Excel Sync & Deploy Tool
echo ========================================================
echo.

echo [1/3] กำลังอ่านข้อมูลล่าสุดจาก Excel และ Sync ข้อมูล...
python sync_data.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ เกิดข้อผิดพลาดในการอ่านไฟล์ Excel กรุณาปิดไฟล์ Excel ก่อนหากเปิดค้างไว้
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] กำลังทดสอบ Build เว็บไซต์...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Build ไม่ผ่าน
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] ตรวจสอบ Git เพื่อส่งขึ้น Vercel...
git status > nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo กำลัง Commit และ Push ข้อมูลขึ้น Git Repo เพื่อให้ Vercel อัปเดต...
    git add src/data/tcas_data.json
    git commit -m "Auto-sync TCAS 70 data from Excel"
    git push origin main
    echo.
    echo ✅ ส่งข้อมูลขึ้น Git เรียบร้อยแล้ว! Vercel กำลัง Re-deploy ให้เพื่อนเปิดดูได้ทันที
) else (
    echo ℹ️ ยังไม่ได้ตั้งค่า Git Remote (หากเชื่อมกับ GitHub แล้ว ข้อมูลจะขึ้น Vercel อัตโนมัติค่ะ)
    echo ข้อมูลในเครื่อง Sync เป็นเวอร์ชันล่าสุดแล้ว!
)

echo.
echo ========================================================
echo  🎉 เสร็จสมบูรณ์! ข้อมูลอัปเดตเรียบร้อยแล้วค่ะ
echo ========================================================
echo.
pause
