---
title: "虚拟机Linux配置clash代理"
date: 2026-02-03 23:40
categories:
  - blog
tags: [linux]
layout: single
---

## 描述
本blog旨在解决虚拟机Linux无法通过clash代理访问外网的问题

---

## 一、配置Clash

### 1、获取宿主机IP

通过`win+r`打开运行，输入`cmd`打开命令窗，在命令窗输入`ipconfig`获取网络信息

![ipconfig](/assets/images/2026-02-03/3-1.png)

例如图中框起来的`192.168.1.4`即为宿主机IP

### 2、设置clash for windows应用配置

![clash for windows主页配置](/assets/images/2026-02-03/3-2.png)

1. 从图中能确认代理端口为7890
2. 第二个“允许局域网连接入clash”建议只在虚拟机需要连接外网时才开启，使用完毕就关闭，因为开启之后会让本局域网所有人都通过你的clash代理端口访问，所以强烈建议开启前先做以下配置以提高安全性

#### 修改clash配置文件

通过以下步骤打开`config.yaml`

![配置1](/assets/images/2026-02-03/3-3.png)

![配置2](/assets/images/2026-02-03/3-4.png)

![配置3](/assets/images/2026-02-03/3-5.png)

打开`config.yaml`后你的原始配置应该跟我大差不差，不过只需要用下面内容覆盖上图框起来的这四行

```
mixed-port: 7890
allow-lan: true
external-controller: '宿主机IP:5055'
secret: "taciturn-hg_2007_clash_secure_zxcvbnm"   # 随便写，在20位以上即可，不要空着
bind-address: 宿主机IP
```

修改完后到右下角找到clash并重启

![clash重启](/assets/images/2026-02-03/3-6.png)

#### 设置防火墙（若是在公共wifi/校园网一定得设置）

##### 一、HTTP/SOCKS 代理端口 7890 防护

1. 打开 **控制面板 → 系统和安全 → Windows 防火墙 → 高级设置 → 入站规则 → 新建规则**

   ![控制面板](/assets/images/2026-02-03/3-7.png)

   ![防火墙1](/assets/images/2026-02-03/3-8.png)

   ![防火墙2](/assets/images/2026-02-03/3-9.png)

   ![防火墙3](/assets/images/2026-02-03/3-10.png)

   ![防火墙4](/assets/images/2026-02-03/3-11.png)

2. 规则类型选择 **端口 → TCP → 特定本地端口 → 7890**

   ![端口1](/assets/images/2026-02-03/3-12.png)

   ![端口2](/assets/images/2026-02-03/3-13.png)

3. 操作选择 **允许连接**

   ![允许连接](/assets/images/2026-02-03/3-14.png)

4. 配置文件选择 **域、专用**（不要选择公用网络）

   ![配置文件](/assets/images/2026-02-03/3-15.png)

5. 名称命名，例如 `Clash Proxy 7890`

   ![命名](/assets/images/2026-02-03/3-16.png)

6. 新建后右键 → 属性 → 作用范围（Scope）

7. 远程 IP 地址设置为 **指定设备的 IP**（如你的手机或虚拟机）

   ![命名](/assets/images/2026-02-03/3-17.png)

   **虚拟机linux的IP可以在其终端输入`ifconfig`查看**

   ![命名](/assets/images/2026-02-03/3-18.png)	

8. 保存配置

##### 二、控制面板端口 5055 防护（跟上面差不多，就不做演示了）

1. 同样**新建规则 → TCP → 5055**
2. **允许连接 → 域、专用**
3. 名称例如 `Clash Control 5055`
4. 属性 → 作用范围 → 远程 IP 地址设置为你的手机或虚拟机
5. 保存配置

## 二、虚拟机 Linux 配置 Clash

> 前提：
>
> - **Clash 跑在 Windows 宿主机**
> - 端口：`7890`
> - Linux 能访问宿主机 IP（如 `192.168.1.4`）

### 确认虚拟机能连到 Clash 端口

```bash
curl -v http://宿主机IP:7890
```

![测试](/assets/images/2026-02-03/3-19.png)
连不上 = 网络模式问题（NAT / 桥接)

### Linux Shell 代理配置

```bash
vim ~/.bashrc
```

在文件后面追加以下配置

```bash
PROXY_ADDR="http://宿主机IP:7890"

export http_proxy="$PROXY_ADDR"
export https_proxy="$PROXY_ADDR"
export HTTP_PROXY="$PROXY_ADDR"
export HTTPS_PROXY="$PROXY_ADDR"
```

使其生效

```bash
source ~/.bashrc
```

## 三、配置完成，测试

在虚拟机linux命令窗输入命令

```bash
curl www.google.com
```

若输出类似前端代码的东西，则测试通过，反之若出现`Could not connect to server`，则连接失败

## 补充

### 使用「开关脚本」控制Linux代理

在原教程配置Linux代理后，总体环境变量就完全走clash代理，如果clash没开对应的配置开关，则无法连上网络，而且打开对应配置开关也会有安全性问题，所以这里建议使用**「开关脚本」**来控制Linux是否使用clash代理。

#### 1、新建两个脚本（开/关代理）

##### 开代理

```
mkdir -p ~/proxy
vim ~/proxy/proxy_on.sh
```

内容（改成你真实的宿主机 IP）：

```bash
#!/bin/bash
PROXY_ADDR="http://宿主机IP:7890"

export http_proxy="$PROXY_ADDR"
export https_proxy="$PROXY_ADDR"
export all_proxy="$PROXY_ADDR"

echo "✅ Proxy ON -> $PROXY_ADDR"
```

如果复制粘贴后是下面图片这种，记得把框住的`#`删掉

![命名](/assets/images/2026-02-03/3-20.png)

##### 关代理

```bash
vim ~/proxy/proxy_off.sh
```

内容：

```bash
#!/bin/bash

unset http_proxy https_proxy all_proxy
echo "❎ Proxy OFF"
```

#### 2、给执行权限

```bash
chmod +x ~/proxy/*.sh
```

#### 3、制作成命令

##### 加进 `.bashrc`

```bash
vim ~/.bashrc
```

加到最后：

```bash
alias proxy-on='source ~/proxy/proxy_on.sh'
alias proxy-off='source ~/proxy/proxy_off.sh'
alias proxy-status='env | grep -i proxy'
```

然后：

```bash
source ~/.bashrc
```

#### 4、测试

```bash
proxy-on      # 走外网 / GitHub / yum
proxy-off     # 回本地
proxy-status  # 看当前状态
```

