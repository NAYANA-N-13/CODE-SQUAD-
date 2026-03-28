# Git push script
$output = @()

Set-Location "c:\Users\nayan\OneDrive\Desktop\code squad\trustcart"

$output += "=== Git Status Before ==="
$output += (git status 2>&1)

$output += ""
$output += "=== Adding files ==="
$output += (git add -A 2>&1)

$output += ""
$output += "=== Checking status after add ==="
$output += (git status 2>&1)

$output += ""
$output += "=== Git Log (last 3 commits) ==="
$output += (git log --oneline -3 2>&1)

$output += ""
$output += "=== Commit status ==="
$output += (git commit -m "Initial TrustCart: UniTrust dynamic trust scoring, seller profiles, product recommendations" 2>&1)

$output += ""
$output += "=== Git Remote ==="
$output += (git remote -v 2>&1)

$output += ""
$output += "=== Pushing to GitHub ==="
$output += (git push -u origin main 2>&1)

# Save to file
$output | Out-File "c:\Users\nayan\OneDrive\Desktop\code squad\trustcart\git_output.log" -Encoding UTF8

Write-Host "Output saved to: c:\Users\nayan\OneDrive\Desktop\code squad\trustcart\git_output.log"
