---
title: "GitHub Pages + Jekyll 本地部署博客"
date: 2025-11-30
categories: ""
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
1、安装Ruby,可以去到其官网（https://rubyinstaller.org/downloads/），直接下载最新的Ruby+Devkit![ruby官网下载](/assets/images/2025-11-30-second/1.png)
**安装时注意：**  
1、勾选上 Run ‘ridk install’（自动安装 MSYS2）  
2、打开后选择：1 → Enter（安装基础组件）  
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
1、先进入到本地博客根目录![本地博客目录1](/assets/images/2025-11-30-second/2.png)


2、在上面文件路径窗口里面输入`cmd`打开此位置的命令窗  
***或者先`win+R`打开运行，输入`cmd`  
打开命令窗后先输入`E：`（主要看你项目在哪个盘）切换盘符  
再使用`cd E:\ITEM\taciturn-hg.github.io`（取决于你的项目绝对路径）进入项目根目录***
![命令窗](/assets/images/2025-11-30-second/3.png)


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

# 第四步：本地启动博客
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