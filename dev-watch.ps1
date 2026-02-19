$ErrorActionPreference = "Continue"

Write-Host "Starting HP Instant Ink Dev Server with Auto-Restart..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

$restartCount = 0

while ($true) {
    try {
        if ($restartCount -gt 0) {
            Write-Host "Restarting server (restart #$restartCount)..." -ForegroundColor Cyan
            Start-Sleep -Seconds 2
        }
        
        # Clean cache before restart
        if ($restartCount -gt 0) {
            Write-Host "Cleaning cache..." -ForegroundColor Yellow
            npm run clean 2>&1 | Out-Null
        }
        
        # Start the dev server
        npm run start
        
    } catch {
        Write-Host "Server crashed: $_" -ForegroundColor Red
    }
    
    $restartCount++
    
    # If it exits, wait a moment before restarting
    Start-Sleep -Seconds 1
}
