$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Config = Join-Path $Root "telegram.local.json"
$Example = Join-Path $Root "telegram.local.example.json"

if (!(Test-Path -LiteralPath $Config)) {
  Copy-Item -LiteralPath $Example -Destination $Config
  Write-Host "Created telegram.local.json. Open it and paste a fresh Telegram bot token before testing Telegram requests." -ForegroundColor Yellow
}

node (Join-Path $Root "server.js")
