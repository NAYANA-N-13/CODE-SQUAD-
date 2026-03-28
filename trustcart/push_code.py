import subprocess
import os
from pathlib import Path

os.chdir(r"c:\Users\nayan\OneDrive\Desktop\code squad\trustcart")

results = []

try:
    # Get remote info
    result = subprocess.run(["git", "remote", "-v"], capture_output=True, text=True)
    results.append(f"=== REMOTE ===\n{result.stdout}\n{result.stderr}")
    
    # Get status
    result = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
    results.append(f"=== STATUS ===\n{result.stdout}")
    
    # Add all files
    result = subprocess.run(["git", "add", "-A"], capture_output=True, text=True)
    results.append(f"=== ADD ===\n{result.returncode} (0=success)")
    
    # Commit
    result = subprocess.run(
        ["git", "commit", "-m", "TrustCart: UniTrust seller trust scoring, product catalog, AI recommendations"],
        capture_output=True, text=True
    )
    results.append(f"=== COMMIT ===\n{result.stdout}\n{result.stderr}")
    
    # Get log
    result = subprocess.run(["git", "log", "--oneline", "-3"], capture_output=True, text=True)
    results.append(f"=== LOG ===\n{result.stdout}")
    
    # Push
    result = subprocess.run(["git", "push", "-u", "origin", "main"], capture_output=True, text=True, timeout=30)
    results.append(f"=== PUSH ===\nReturn Code: {result.returncode}\nSTDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}")
    
except Exception as e:
    results.append(f"ERROR: {str(e)}")

# Write to file
output = "\n".join(results)
with open("git_output.txt", "w", encoding="utf-8") as f:
    f.write(output)

print("Results written to git_output.txt")
print(output)
