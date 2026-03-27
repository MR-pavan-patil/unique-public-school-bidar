import os
import urllib.parse

base_dir = r"e:\unique-public-school-bidar"

# 1. Gather all code
code_files = []
for root, dirs, files in os.walk(base_dir):
    if "unique public school bidar- old site" in root or ".git" in root or ".vscode" in root:
        continue
    for f in files:
        if f.endswith(('.html', '.css', '.js')):
            code_files.append(os.path.join(root, f))

all_code = ""
for cf in code_files:
    try:
        with open(cf, 'r', encoding='utf-8') as file:
            all_code += file.read() + "\n"
    except Exception as e:
        pass

# Add known scripts
for script in ['migrate.py', 'build_gallery.py']:
    script_path = os.path.join(base_dir, script)
    if os.path.exists(script_path):
        with open(script_path, 'r', encoding='utf-8') as file:
            all_code += file.read() + "\n"

# 2. Traverse assets and delete unused
dirs_to_clean = [
    os.path.join(base_dir, r"assets\images"),
    os.path.join(base_dir, r"assets\ups-26 data")
]

deleted_count = 0
deleted_size = 0

for d in dirs_to_clean:
    for root, dirs, files in os.walk(d):
        for f in files:
            if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg')):
                continue
                
            encoded_f = urllib.parse.quote(f)
            
            # Substring check for filename
            if f not in all_code and encoded_f not in all_code:
                filepath = os.path.join(root, f)
                try:
                    size = os.path.getsize(filepath)
                    os.remove(filepath)
                    deleted_count += 1
                    deleted_size += size
                    print(f"Deleted: {filepath}")
                except Exception as e:
                    print(f"Error deleting {filepath}: {e}")

print(f"\n--- SUMMARY ---")
print(f"Total deleted: {deleted_count} files, {deleted_size / (1024*1024):.2f} MB")
