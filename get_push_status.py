import subprocess, json, os
os.chdir(r"c:\Users\nayan\OneDrive\Desktop\code squad")
try:
    log_result = subprocess.run(["git", "log", "--oneline", "-1"], capture_output=True, text=True)
    branch_result = subprocess.run(["git", "branch", "-vv"], capture_output=True, text=True)
    push_result = subprocess.run(["git", "push", "-u", "origin", "main"], capture_output=True, text=True, timeout=30)
    remote_result = subprocess.run(["git", "remote", "-v"], capture_output=True, text=True)
    data = {
        "log": log_result.stdout.strip(),
        "branch": branch_result.stdout.strip(),
        "push_return_code": push_result.returncode,
        "push_stdout": push_result.stdout,
        "push_stderr": push_result.stderr,
        "remote": remote_result.stdout.strip()
    }
except Exception as e:
    data = {"error": str(e)}
with open(r"c:\Users\nayan\OneDrive\Desktop\code squad\push_result.json", "w") as f:
    json.dump(data, f, indent=2)
