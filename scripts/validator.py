import os
import re

def check_file_integrity(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    errors = []
    
    # 1. Check for missing Link import
    if '<Link' in content and 'import Link from "next/link"' not in content:
        errors.append("Missing 'Link' import from 'next/link'")

    # 2. Check for missing closing Fragment tags (basic regex check)
    # This is a simple count check
    open_fragments = len(re.findall(r'<[^/a-zA-Z]*>', content))
    close_fragments = len(re.findall(r'</[^a-zA-Z]*>', content))
    if open_fragments != close_fragments:
        errors.append(f"React Fragment mismatch: {open_fragments} opened, {close_fragments} closed")

    return errors

def scan_project(directory):
    print(f"--- Scanning Project Integrity: {directory} ---")
    issue_found = False
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                file_path = os.path.join(root, file)
                issues = check_file_integrity(file_path)
                if issues:
                    issue_found = True
                    print(f"\n[!] Issues in {file_path}:")
                    for issue in issues:
                        print(f"    - {issue}")
    
    if not issue_found:
        print("\n[+] Everything looks good! No obvious syntax issues found.")
    print("\n--- Scan Complete ---")

if __name__ == "__main__":
    # Get the project root (one level up from scripts/)
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src_path = os.path.join(project_root, 'src')
    if os.path.exists(src_path):
        scan_project(src_path)
    else:
        print(f"Error: src folder not found at {src_path}")
