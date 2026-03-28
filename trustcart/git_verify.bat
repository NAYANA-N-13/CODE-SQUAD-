@echo off
setlocal enabledelayedexpansion
cd /d "c:\Users\nayan\OneDrive\Desktop\code squad\trustcart"

echo === GIT VERIFICATION REPORT === > git_verify.txt
echo Timestamp: %date% %time% >> git_verify.txt
echo. >> git_verify.txt

echo === REMOTE URL === >> git_verify.txt
git remote -v >> git_verify.txt 2>&1
echo. >> git_verify.txt

echo === RECENT COMMITS === >> git_verify.txt
git log --oneline -5 >> git_verify.txt 2>&1
echo. >> git_verify.txt

echo === CURRENT BRANCH === >> git_verify.txt
git branch -v >> git_verify.txt 2>&1
echo. >> git_verify.txt

echo === PUSH STATUS === >> git_verify.txt
git push -u origin main >> git_verify.txt 2>&1
echo Exit Code: !ERRORLEVEL! >> git_verify.txt

echo Report saved to git_verify.txt
type git_verify.txt
