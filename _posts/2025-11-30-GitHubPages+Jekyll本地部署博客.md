---
title: "GitHub Pages + Jekyll 本地部署博客"
date: 2025-11-30 23:30
categories:
  - blog
tags: [技术]
layout: single
---

# 前言
本博客作为我的第一篇技术博客，有些细节可能讲的不是很清晰或者有矛盾，请见谅，错误点和矛盾点可以到我的github账号或者email邮箱反馈，我会及时修正

---

# 描述
写博客时，若要查看博客更改的信息，我们得先从git提交到我们的远程github仓库，才能看到效果，还有可能提交完结果报错，运行不起来，最后还得回退，及其的麻烦，于是我通过询问AI，找到这么一个方法让我们能直接在本地运行我们的blog，保存代码后直接刷新即可看到最新效果，及其方便，好了教程开始

---

# 教程
## 第一步：准备环境
1、安装Ruby,可以去到其官网（https://rubyinstaller.org/downloads/），直接下载最新的Ruby+Devkit![ruby官网下载](/assets/images/2025-11-30/2-1.png)
**安装时注意：**  
1、勾选上 Run ‘ridk install’（自动安装 MSYS2）  
2、打开后选择：1 → Enter（安装基础组件)  
验证是否成功：  

```
ruby -v
gem -v
```
如果能显示版本，说明 OK。

---

# 第二步：安装Jekyll与Bundler
执行：
```
gem install bundler jekyll
```
成功后检查：
```
jekyll -v
```

---

# 第三步：安装依赖
1、先进入到本地博客根目录![本地博客目录1](/assets/images/2025-11-30/2-2.png)

2、在上面文件路径窗口里面输入`cmd`打开此位置的命令窗  
***或者先`win+R`打开运行，输入`cmd`  
打开命令窗后先输入`E：`（主要看你项目在哪个盘）切换盘符  
再使用`cd E:\ITEM\taciturn-hg.github.io`（取决于你的项目绝对路径）进入项目根目录***
![命令窗](/assets/images/2025-11-30/2-3.png)

3、如果项目里面有`Gemfile`文件，则在命令窗执行

```
bundle install
```
如果没有，则需自行在项目根目录创建文件`Gemfile`，内容示例：
```
source "https://gems.ruby-china.com/"

gem "jekyll", "~> 4.3.2"
gem "github-pages", group: :jekyll_plugins
```
然后执行：
```
bundle install
```

---

# 第四步：添加`.gitignore`文件内容

因为本地预览博客他会创建一些构建文件和缓存，而这些东西实际上没必要推送到github上

所以要在`.gitignore`文件里面添加以下内容，在提交时会自动忽略这些文件

```
# Jekyll build output
_site/

# Jekyll cache
.jekyll-cache/

# Bundler
.bundle/

.jekyll-metadata
```

# 第五步：本地启动博客

上述步骤均完成后，在项目根目录下打开`cmd`，运行：
```
bundle exec jekyll serve
```
或：
```
jekyll serve
```
成功后会看到类似：
```
Server address: http://127.0.0.1:4000/
```
就可以在网站使用`http://127.0.0.1:4000/`去访问本地博客了！

# 补充

当然了，如果觉得命令不好记，想一键启动并自动打开浏览器，可以根据以下内容编写启动脚本

## 一、制作脚本

### 1、在项目根目录下创建`start.ps1`文件

这里建议使用vscode打开此文件，然后按`ctrl+shift+p`打开运行命令窗口，根据下图顺序操作

![命令窗口1](/assets/images/2025-11-30/2-4.png)

![命令窗口2](/assets/images/2025-11-30/2-5.png)

![命令窗口3](/assets/images/2025-11-30/2-6.png)

***注：因为powershell的中文编码格式为`GBK`，所以正常的`utf-8`格式的中文在powershell里面输出会变成乱码***

然后在`start.ps1`文件内输入以下内容：

```powershell
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
```

`ctrl+S`保存文件

### 2、在项目根目录下创建`start.bat`文件

这个文件不用像`start.ps1`一样重新编码，直接在文件内输入下面代码：

```powershell
@echo off
cd /d %~dp0
powershell -ExecutionPolicy Bypass -File start.ps1
pause
```

`ctrl+S`保存文件

## 二、添加`.gitignore`内容

启动脚本会创建一个进程锁，同时创建一个`.jekyll.lockhash`占位锁文件，防止并发运行

这个文件也是没必要推送到github，所以直接在`.gitignore`文件内容后面加上`.jekyll.lockhash`即可

## 三、启动脚本

在项目根目录下双击`start.bat`文件

也可以打开`powershell`或`cmd`，`cd`进入到项目根目录输入`start.bat`也可以启动

等待一会就会自动启动浏览器页面了

