---
title: "win11如何使用虚拟机VMware安装ensp"
date: 2025-12-01 22:45
categories:
  - blog
tags: [技术]
layout: single
---

# 描述
我在上周计网实训周发现我的电脑是win11系统，而ensp所需要的其中一个组件VirtualBox在win11只能安装7.x的，而ensp只向下兼容5.x，不向上兼容，所以win11是无法安装ensp的，由此我决定把使用虚拟机安装ensp的流程整理成教程分享给大家

---

# 第一步：准备工作

1、准备虚拟机软件VMware，可以前往官网（https://www.vmware.com/）下载，不过这玩意要注册，而且想找到下载链接也很难

2、准备一个win10的系统镜像，前往Microsoft官网（https://www.microsoft.com/zh-cn/software-download/windows10）下载即可<br>
安装包下载好后点开安装，跟随下面图片操作即可：
![下载win10系统镜像](/assets/images/2025-12-01/2-1.png)

![下载win10系统镜像](/assets/images/2025-12-01/2-2.png)

![下载win10系统镜像](/assets/images/2025-12-01/2-3.png)

然后就会让你确定下载路径，等待下载即可<br>


3、准备ensp的全部组件安装包，ensp的安装包只能在网上找，华为官网的下载通道关闭了，其他组件均可找到。
**当然为了方便大家不用花那么长时间在找资源上，我已经将准备工作需要的安装包和ios镜像文件上传到百度网盘了（https://pan.baidu.com/s/5jG3E7nYtfHSoy4UenDo4VA ），大家直接下载即可**

---

# 第二步：调整windows设置
1、首先要知道一个点，ensp本身也是有虚拟机的，所以你使用VMware虚拟机去用ensp时，其实是嵌套虚拟，在windows系统默认时不行的，而你需要使用VMware的话，需要更改一些windows 设置，来取消windows的虚拟环境检测，而这些设置只有在windows专业版才能设置。

所以这一步就是要把win11系统升级至专业版 **（已经是专业版的可以跳过这一步）**，大家可以去淘宝买个*win11教育版升级专业版激活码*，大概10~30块钱这样，找客服要到激活码后，跟随以下图片完成激活：
![激活windows专业版](/assets/images/2025-12-01/2-4.png)

![激活windows专业版](/assets/images/2025-12-01/2-5.png)

2、完成**激活并重启**之后就开始调整windows设置，跟随下面图片完成设置：
![更改windows设置](/assets/images/2025-12-01/2-6.png)

![更改windows设置](/assets/images/2025-12-01/2-7.png)

![更改windows设置](/assets/images/2025-12-01/2-8.png)

**这一步完成后先不要重启，继续往下做**<br>

3、在下方搜索栏搜索cmd → 点击以管理员身份运行 → 在输入框里面输入`bcdedit /set hypervisorlaunchtype off`
![更改windows设置](/assets/images/2025-12-01/2-9.png)

![更改windows设置](/assets/images/2025-12-01/2-10.png)

4、按`win+R`打开运行，输入`optionalfeatures.exe`，然后按照下方图片关掉一些选项：
![更改windows设置](/assets/images/2025-12-01/2-11.png)

**至此，windows系统的设置全部完成，关机重启后进入下一步。**

---

# 第三步：制作虚拟机
1、VMware的安装除了改安装路径，其他都是一路默认到底，现在开始制作虚拟机，跟随下方图片制作即可：
![制作虚拟机](/assets/images/2025-12-01/2-12.png)

![制作虚拟机](/assets/images/2025-12-01/2-13.png)

![制作虚拟机](/assets/images/2025-12-01/2-14.png)

![制作虚拟机](/assets/images/2025-12-01/2-15.png)

![制作虚拟机](/assets/images/2025-12-01/2-16.png)

![制作虚拟机](/assets/images/2025-12-01/2-17.png)

![制作虚拟机](/assets/images/2025-12-01/2-18.png)

2、将在百度网盘下载的`网络模拟器`文件夹复制到跟虚拟机共享的文件夹里面，随后就可以进行win10系统和ensp的安装了，我录制了视频放在b站，可以通过以下链接去查看：<br>
<div style="position:relative;width:100%;padding-bottom:56%;height:0;margin:auto;
            max-width:800px;border-radius:12px;overflow:hidden;
            box-shadow:0 4px 12px rgba(0,0,0,0.15);">
  <iframe src="//player.bilibili.com/player.html?bvid=BV1WdSyB4E2L"
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
          allowfullscreen>
  </iframe>
</div>

**这样就完成使用虚拟机安装ensp了，使用虚拟机有个好处就是做完不用关机，直接挂起即可，下次就可以接着挂起那一刻继续做**