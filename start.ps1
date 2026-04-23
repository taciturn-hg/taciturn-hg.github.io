# ==============================
# Jekyll Smart Starter (PS5 Safe)
# ==============================

$ErrorActionPreference = "Continue"
$Host.UI.RawUI.WindowTitle = "Jekyll Dev Server"

# 进入项目根目录
$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root

function Log($msg, $color="White") {
    Write-Host $msg -ForegroundColor $color
}

Log "`n=== Jekyll Development Server ===" Cyan

# ---------- Ruby ----------
if (!(Get-Command ruby -ErrorAction SilentlyContinue)) {
    Log "未检测到 Ruby，请先安装 Ruby + DevKit" Red
    pause
    exit
}

# ---------- Bundler ----------
if (!(Get-Command bundle -ErrorAction SilentlyContinue)) {
    Log "安装 bundler..." Yellow
    gem install bundler
}

# ---------- bundle install 智能检测 ----------
$lockHashFile = ".jekyll.lockhash"

if (Test-Path "Gemfile.lock") {
    $currentHash = (Get-FileHash "Gemfile.lock").Hash
} else {
    $currentHash = "none"
}

$needInstall = $true
if (Test-Path $lockHashFile) {
    $oldHash = Get-Content $lockHashFile -ErrorAction SilentlyContinue
    if ($oldHash -eq $currentHash) { $needInstall = $false }
}

if ($needInstall) {
    Log "安装依赖..." Yellow
    bundle install
    $currentHash | Out-File $lockHashFile -Encoding ascii
} else {
    Log "依赖未变化，跳过 bundle install" DarkGray
}

# ---------- 关闭 4000 端口 ----------
$port = 4000
$occupied = netstat -ano | Select-String ":$port "

foreach ($line in $occupied) {
    $procId = ($line -split "\s+")[-1]
    try { Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue } catch {}
}

# ---------- 启动浏览器监听进程 ----------
$watchScript = @"
while (`$true) {
    try {
        `$r = Invoke-WebRequest http://127.0.0.1:4000 -UseBasicParsing -TimeoutSec 2
        if (`$r.StatusCode -eq 200) {
            Start-Process http://127.0.0.1:4000
            break
        }
    } catch {}
    Start-Sleep 1
}
"@

$watchFile = "$env:TEMP\jekyll-wait.ps1"
$watchScript | Out-File $watchFile -Encoding ascii

Start-Process powershell -ArgumentList "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$watchFile`""

# ---------- 启动 ----------
Log "启动 Jekyll..." Green
bundle exec jekyll serve --livereload --incremental --trace
