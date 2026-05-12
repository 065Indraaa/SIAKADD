# deploy-functions.ps1
# Jalankan: .\deploy-functions.ps1

Write-Host "=== Build Functions ===" -ForegroundColor Cyan
Set-Location functions
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build gagal!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

Write-Host "=== Deploy ke Firebase ===" -ForegroundColor Cyan
firebase deploy --only functions

Write-Host "=== Selesai ===" -ForegroundColor Green
