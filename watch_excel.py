import os
import sys
import time
from sync_data import find_excel_file, parse_excel_to_json, main as sync_main

# Set output encoding to UTF-8
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def watch():
    excel_path = find_excel_file()
    if not excel_path:
        print("❌ ไม่พบไฟล์ Excel สรุป_TCAS70_Port_จิตวิทยา.xlsx")
        sys.exit(1)

    print(f"👀 กำลังเฝ้าดูการเปลี่ยนแปลงของไฟล์:")
    print(f"   📂 {excel_path}")
    print("   (เมื่อกด Save หรือ Ctrl+S ใน Excel ข้อมูลจะอัปเดตใส่เว็บทันที!)")
    print("   กด Ctrl+C เพื่อหยุดการทำงาน\n")

    last_mtime = os.path.getmtime(excel_path)
    
    # Initial sync
    try:
        sync_main()
    except Exception as e:
        print(f"⚠️ Initial sync error: {e}")

    while True:
        try:
            time.sleep(1.5)
            if not os.path.exists(excel_path):
                continue
            current_mtime = os.path.getmtime(excel_path)
            if current_mtime != last_mtime:
                last_mtime = current_mtime
                print(f"\n🔄 ตรวจพบการอัปเดตไฟล์ Excel! กำลัง Sync ข้อมูลใหม่...")
                time.sleep(0.5) # allow file lock release
                sync_main()
                print("✅ อัปเดตข้อมูลบนเว็บเรียบร้อยแล้ว!")
        except KeyboardInterrupt:
            print("\n👋 หยุดการเฝ้าดูเรียบร้อยค่ะ")
            break
        except Exception as err:
            print(f"⚠️ ข้อผิดพลาด: {err}")
            time.sleep(2)

if __name__ == "__main__":
    watch()
