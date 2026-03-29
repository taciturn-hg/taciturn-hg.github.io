---
title: "从0到1：基于 GitHub Actions 的项目部署全流程"
date: 2026-03-28 21:19:20
categories:
  - skill
tags: [java,github,vue]
layout: single
---

> 记录一次完整的项目上线过程

# 前言

本博客旨在记录本人在第一次将项目部署到服务器的全流程，不仅仅是为了加深自己对部署流程的记忆，更是为了帮助未部署过项目的同学，能更快的掌握如何从0开始部署一个项目

**注：本博客部署的为spring boot+vue的前后端分离项目，部署的云服务器和云数据库均是阿里云上的产品**

# 一、云服务器和云数据库

首先，我们要知道，一个完整的项目是由前端、后端、数据库构成，而前端和后端的服务均位于云服务器，而数据库则由专门的云数据库负责承载，所以接下来，会介绍购买云服务器和云数据库的流程

## 1、云服务器

阿里云的云服务器分为两种：**轻量应用服务器**和**云服务器ECS**

这里推荐**轻量应用服务器**，因为其已经构建好了基础的网络、防火墙，相当于是已经”封装“好的产品，拿来即用

而**云服务器ECS**就需要自己去搭建网络、防火墙、公网ip，作为未接触过运维相关知识的开发者，不建议用该服务器作为部署服务器，若是不熟练，在配置上就会浪费相当多的时间

### ①购买服务器

以阿里云为例，首先就是得在[阿里云官网](https://www.aliyun.com/)注册阿里云的账号

然后就可以在上方导航栏的`产品->计算->轻量应用服务器`找到

![](/assets/images/2026-03-28/1-1.png)

进去之后直接点击立即购买，就会出现这个页面

![](/assets/images/2026-03-28/1-2.png)

![](/assets/images/2026-03-28/1-3.png)

实例选择2核、2GB运存、40GB系统盘这个配置就够用了，然后系统选择ubuntu，版本选择最新的24.04版本，这是最基础的配置（当然要是有money那另说）

![](/assets/images/2026-03-28/1-4.png)

### ②查看服务器信息

在购买完服务器之后，来到阿里云主页，可以看到右上角有个控制台，点进去

![](/assets/images/2026-03-28/1-5.png)

点进去之后在我的资源这里选择轻量应用服务器

![](/assets/images/2026-03-28/1-6.png)

进去之后就可以看到自己的服务器

![](/assets/images/2026-03-28/1-7.png)

再点击自己服务器之后，可以看到服务器的一些基本信息，当然主要还是记住下面框住的ip地址

![](/assets/images/2026-03-28/1-8.png)

然后上面应该是有个设置密码的，我这里已经设置过了，可以理解为登录你这个服务器系统的密码，可以设置一下，方便后面连接服务器

### ③连接服务器

（这里就有人要问了，“阿里云那不是提供了远程连接的按钮么，为啥还有连接服务器这一栏”，这个我只能说因人而异，我更偏向于用远程软件去连接服务器，相对来说方便点。）

这里就需要用到一个软件，[**MobaXterm**](https://mobaxterm.mobatek.net/)，这里不介绍了，也有其他替代产品，用法差不多

软件下载好后打开是这样的

![](/assets/images/2026-03-28/1-9.png)

点击左上角的session，然后在Remote host里面填入服务器的公网ip，而后点击ok

![](/assets/images/2026-03-28/1-10.png)

然后就会进入到这个页面，输入刚刚设置的用户名和密码

![](/assets/images/2026-03-28/1-11.png)

显示这个页面就是成功连接到服务器了

![](/assets/images/2026-03-28/1-12.png)

## 2、云数据库

云数据库同样有很多，这里选择**云数据库RDS**

### ①购买数据库

在上方导航栏`产品->数据库->云数据库RDS`点进去

![](/assets/images/2026-03-28/1-13.png)

点击购买之后到配置页面，基本上按下面配置就行，mysql选自己项目的版本，这里选8.0，规格最基础的够用，存储空间10GB够用，按个人情况而定

![](/assets/images/2026-03-28/1-14.png)

![](/assets/images/2026-03-28/1-15.png)

### ②设置数据库信息

在购买完之后，同样是`控制台->我的资源`这里找到云数据库RDS

![](/assets/images/2026-03-28/1-16.png)

然后在左边的实例列表这里找到自己的数据库实例，点进去

![](/assets/images/2026-03-28/1-17.png)

这个就跟自己本地的mysql数据库一样，不过是加了ui，更好操作

可以在账号管理这里加登录数据库的账号和对应的权限，不过一般会创建一个高权限账号root和若干普通账号分别操作不同数据库，做权限隔离

![](/assets/images/2026-03-28/1-18.png)

数据库管理就可以创建数据库

![](/assets/images/2026-03-28/1-19.png)

白名单管理，顾名思义，可以设置访问数据库的ip白名单，这里建议加上自己本机的[公网ip](https://www.whatismyip.com.tw/)（可以直接去网上去查`本机ip`）和自己服务器的公网IP（为后续部署到服务器的项目开放权限）

![](/assets/images/2026-03-28/1-20.png)

然后就是数据库连接这里，需要在这里把外网地址打开然后记住，因为spring boot项目的数据库配置是`http://云数据库地址:3306`，这个外网地址就是填写在这的，当然也可以在本地的navicat或者datagrip连接数据库，连接时候需要填写的主机就是这个外网地址

![](/assets/images/2026-03-28/1-21.png)

# 二、配置服务器

打开刚刚的MobaXterm，先更新下系统

``````bash
apt update && apt upgrade -y
``````

## 1、配置环境

先下载基础的git、nginx、maven，分别对应项目管理、前端托管、后端管理（java）

``````bash
apt install git nginx maven -y
``````

还有前端的node管理工具nvm

``````bash
# 下载nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 让nvm生效
source ~/.bashrc

# 查看nvm是否安装成功
nvm -v
``````

然后可以通过nvm去安装node，这里node版本是22

``````bash
# 安装node 22
nvm install 22

# 使用node 22
nvm use 22
``````

然后安装java，这里是java17

``````bash
apt install openjdk-17-jdk -y
java -version
``````

## 2、配置nginx

然后接下来配置nginx代理，这点很重要，关系到能不能正常访问前端和调用接口

首先到nginx的目录

``````bash
cd /etc/nginx
``````

这下面有两个文件夹需要我们去设置

``````bash
sites-available/		# 配置文件夹
sites-enabled/			# 生效的配置文件（软连接指向配置文件夹的配置）
``````

首先要将两个文件夹里面的default文件删掉

```````bash
rm -rf sites-available/default
rm -rf sites-enabled/default
```````

然后编写nginx的配置

```````bash
nano sites-available/项目名.conf		#这里名字最好对应你自己的项目，分项目配置最好
```````

``````bash
server {
    listen 80;
    
    server_name 0.0.0.0;		# 这个就是域名，没有的话删掉这行即可
    
    root /var/www/项目名;		# 这里对应前端的构建文件地址，后面会讲
    index index.html;
    
    location / {   
    	try_files $uri $uri/ /index.html;	# 将所有未知路径重定向到 index.html，让前端路由接管
    }

    location /api/ {						# 这里的/api/是我项目接口的固定前缀，视项目具体配置而定
        proxy_pass http://127.0.0.1:8080;	# 这里就是后端的访问地址，主要是后面的端口号，看你后端启动之后是多少
		
		# 下面这些是为了传递真实客户端信息，能避免很多IP获取错误问题，建议加上
        proxy_http_version 1.1;
        proxy_set_header Connection "";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
``````

然后建立软连接应用这些配置

```bash
ln -s /etc/nginx/sites-available/项目名.conf /etc/nginx/sites-enabled/		# 这里用绝对路径防止软连接出问题
```

测试并重启nginx

```bash
nginx -t
systemctl restart nginx
```

## 3、配置服务器SSH登录密钥

首先在你的服务器命令行使用命令生成SSH key

```bash
ssh-keygen -t rsa -b 4096
```

> ssh-keygen	SSH官方工具，用来生成密钥对
>
> -t rsa	指定加密算法
>
> -b 4096	指定密钥长度为4096
>
> -C "item"	（可选）备注密钥

执行之后会出现以下几行，直接回车跳过即可

```bash
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):	# 默认路径
Enter passphrase (empty for no passphrase):					# 密码，CI/CD不用设置，直接回车
```

至此，SSH key生成，现在就去查看，基于默认路径，可以看到其在`/root/ssh/`文件夹下，先导航到该文件夹查看有什么文件

```bash
# 命令
cd ~/.ssh
ls -l

# 输出结果
drwx------  2 root root 4096 Mar 28 18:05 ./
drwx------ 11 root root 4096 Mar 29 10:09 ../
-rw-------  1 root root  755 Mar 28 18:05 authorized_keys	# 白名单钥匙列表
-rw-------  1 root root 3401 Mar 28 16:16 id_rsa			# 私钥
-rw-r--r--  1 root root  754 Mar 28 16:16 id_rsa.pub		# 公钥
```

首先查看公钥信息，然后将其复制粘贴到`authorized_keys`文件里面

```bash
# 命令
cat id_rsa.pub			# 查看公钥文件内容
vim authorized_keys		# 编辑文件

# 公钥格式
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQ... github-actions		# 一定要复制完整，不然不生效
```

好了服务器这边就设置好了

# 三、部署项目

这里建议目录结构这样

```bash
/root/item/项目/
```

先到item文件夹下去拉取自己的项目

```bash
cd /root/item
git clone github项目链接
```

不知道的到自己库这里去复制

![](/assets/images/2026-03-28/1-22.png)

## 1、后端部署

先到自己后端代码目录下

```bash
cd backend		#根据自己项目结构来
```

然后打包自己项目

```bash
mvn clean package -DskipTests
```

然后可以发现自己后端文件夹里面出现了target文件夹，到里面找到后缀为`.jar`的文件名记住

```bash
ls -l target
```

然后就可以启动后端服务了

```bash
nohup java -jar target/xxx.jar > log.txt 2>&1 &		# 这里的xxx.jar就是target里面.jar后缀的文件，别真写xxx
```

> 这里解释下这行命令
>
> nohup	让程序在后台持续运行，也就是关了终端也不会停止服务
>
> java -jar target/xxx.jar	启动你的spring boot项目
>
> \> log.txt 2>&1	将日志输出到日志文件
>
> ```bash
> > log.txt       # 标准输出
> 2>&1            # 错误输出
> ```
>
> &	则是放在后台执行，防止占用终端

然后可以在服务器测试下能不能访问

```bash
curl http://localhost:8080
```

**补充：前面讲到云数据库的外网链接，记得到你自己的application-prod.yml里面配置下云数据库地址和登录数据库的账号密码，然后application.yml里面生效的配置文件记得选prod**

```yaml
spring:
  datasource:
    url: jdbc:mysql://云数据库外网地址:3306/your_db
    username: root
    password: xxx
```

## 2、前端部署

还是一样，先到前端代码文件夹下

```bash
cd frontend		#根据自己项目结构来
```

然后正常初始化启动前端

```bash
npm install
npm run build
```

这里会发现自己前端代码文件夹下面出现了`dist`文件夹，这个文件夹里面就是我们需要的能让前端页面上线运行的东西

前面在nginx配置里面看到我的文件是放在`/var/www/项目名`下，因为放在root里面的话，nginx访问不到，就无法正常托管前端，所以这里需要把dist里面的东西转移过去

```bash
rm -rf /var/www/项目名/*			# 先清理旧数据 
cp -r dist/* /var/www/项目名/		# 将新数据复制进去
```

这里做完之后就重启一下nginx

```bash
systemctl restart nginx
```

至此前端也部署完毕

## 3、测试

根据自己服务器的公网ip直接访问即可

```bash
http://公网ip
```

当然这里只是实现了在服务器部署并运行项目，接下来讲解怎么通过github Action在提交之后自动部署服务器更新项目

# 四、实现自动化部署

这里利用Github Action实现项目的自动化部署，然后简单介绍下，github action可以理解为一个自动化工具，他会读取你项目`.github/workflows/deploy.yml`里面写的工作流并执行，所以我们就是写deploy.yml来构建一个自动化部署的action工作流让action在每次提交后自动帮我们执行，由此做到提交即部署

## 1、配置Github Action

首先到自己服务器的命令行这里，前面配置服务器的时候我们配置了SSH登录密钥，这里我们需要获取私钥信息并复制

```bash
# 命令
cat ~/.ssh/id_rsa			# 查看私钥文件内容

# 私钥格式
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAA...
（中间很多行）
...xxxxxxxxxxxxxxxxxxxxxxxx
-----END OPENSSH PRIVATE KEY-----
# 同理，一定要复制完全，不然也是无效
```

然后到自己github的库的setting这里，找到`Secrets and variavles -> Actions -> Respository secrets -> new repository secret`

![](/assets/images/2026-03-28/1-23.png)

点进去之后是这样，`name`里面填变量名，`Secret`里面填变量值

![](/assets/images/2026-03-28/1-24.png)

然后我们需要设置三样，服务器SSH私钥`SERVER_SSH_KEY`、服务器公网IP`SERVER_IP`、服务器用户名`SERVER_USER`

私钥就是上面复制的那个

公网ip就是前面在云服务器看到的标注了公网的ip

用户名就是你设置服务器密码的那个用户名，我这是`root`

## 2、编写workflows工作流文件

首先在你本地打开你自己的项目，在后端根目录下找到`.github`文件夹，在里面创建`workflows`文件夹，然后创建`deploy.yml`文件

**注：如果你已经编写了工作流文件，就跳过这步**

这里给一套我用的最基础的deploy文件内容（记得根据自己项目结构替换里面的占位符）

```yaml
name: Deploy			# 工作流名字

on:						
  push:
    branches:
      - dev				# 触发条件，在dev分支push的时候触发，这里看你的主分支是哪个

jobs:					# 任务
  deploy:				# 任务名
    runs-on: ubuntu-latest		# 运行环境（Github会临时开个云服务器运行）

    steps:						# 步骤（核心），每一个“-”就是一个步骤
      - name: 拉代码			  # 一个名字叫“拉代码”的步骤
      	# uses表示使用 GitHub 官方提供的一个“现成动作（Action）”，这里是把你的仓库代码 clone 到 CI 服务器
        uses: actions/checkout@v4	

      - name: SSH连接并部署
        run: |					# 这里表示执行一整段多行shell脚本
          # 创建 SSH 环境
          mkdir -p ~/.ssh	# 创建 SSH 目录
          echo "${{ secrets.SERVER_SSH_KEY }}" > ~/.ssh/id_rsa	# 把 GitHub Secrets 里的私钥写入文件
          chmod 600 ~/.ssh/id_rsa	# 设置权限
          
          # 自动加入服务器指纹以信任服务器（避免交互）
          ssh-keyscan -H ${{ secrets.SERVER_IP }} >> ~/.ssh/known_hosts
		  
		  # 远程执行命令
          ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_IP }} << 'EOF'	# 登录服务器，然后执行下面这一整段脚本
            cd /root/item/项目名

            # 拉最新代码
            git pull origin dev

            # ===== 后端 =====
            cd 后端文件夹
            mvn clean package -DskipTests

            pkill -f 进程名 || true
            nohup java -jar target/xxx.jar > log.txt 2>&1 &

            # ===== 前端 =====
            # GitHub CI是全新环境，要显式加载nvm设置node版本
            export NVM_DIR="$HOME/.nvm"
            source "$NVM_DIR/nvm.sh"
            nvm use 22
            
            cd ../前端文件夹
            npm install
            npm run build

            # 拷贝到 nginx 目录
            rm -rf /var/www/项目名/*
            cp -r dist/* /var/www/项目名/

            # 重启 nginx
            systemctl restart nginx

            echo "部署完成"
          EOF
```

编写完成后，就可以在git bash里面提交该文件到远程Github库

```bash
git add .
git commit -m "add workflows file"
git push origin dev
```

然后就可以到Github库的Action这里查看构建状态了

![](/assets/images/2026-03-28/1-25.png)

## 3、测试

同样的，在构建完成之后根据自己服务器的公网ip直接访问即可

```bash
http://公网ip
```

至此，整套基于Github Action的自动化部署基础流程结束

# 五、总结

整个博客从0开始，购买云服务器和云数据库，到在服务器成功运行项目，再到配置Action实现自动化部署，整个流程经过我多次踩坑之后才确定下来，当然也有可能有隐藏的问题存在，但这有待发掘，也有优化的空间，这些配置都是最最基础的，能让整个过程跑起来的配置，后续会在本博客最后补充可以优化的地方

## 1、常见问题

**Q：为啥spring boot配置了云数据库地址，还是连不上数据库？**

A：先检查下自己的`application.yml`

```yaml
server:
  profiles:
    active: prod		# 这里是不是自己的生产环境配置文件
```

然后检查`application-prod.yml`里的数据库配置有没有写对

```yaml
spring:
  datasource:
    url: jdbc:mysql://云数据库外网地址:3306/your_db
    username: root
    password: xxx
```

都没有问题那就是你的云数据库的白名单没加你的云服务器的公网IP，去阿里云控制台设置下数据库白名单即可

![](/assets/images/2026-03-28/1-26.png)

**Q：我能正常访问自己的服务器，但是项目前端发送接口访问请求后显示404是怎么回事？**

A：这个有很多情况，首先要在你前端打开f12开发者工具，在网络那里找到你的请求，然后查看标头里面的常规

![](/assets/images/2026-03-28/1-27.png)

1、请求网址后面跟着的接口路径少了/api前缀（这个要看自己项目是否有默认前缀），就会导致无法请求到正确端口，这个要检查自己的nginx配置文件的`location /api/`是否是正确的，不要少加也不要多加`/`

2、远程地址不是自己的云服务器ip，这个一般是因为自己开了代理，只需要加规则绕过即可，或者直接把代理关了再访问也是可以的，这里以clash verge为例，跟随以下图片将自己云服务器ip添加进去即可

![](/assets/images/2026-03-28/1-28.png)

![](/assets/images/2026-03-28/1-29.png)

3、还有一种情况是我出现过的，我前端是配置了axios来转发请求发送到后端地址的，而该后端地址的配置是在`.env`的配置文件里面，而我忘了新建`.env.production`文件配置在build环境下的配置，就默认走的`.env.example`里面的配置，而后端API基础地址我写的是`http://127.0.0.1:8080/api`，这就会出现问题，其转发的还是本地ip，自然无法将请求正确转发给云服务器后端

所以解决方法就是将`.env`里面后端API基础地址的值改成相对路径`/api`或者绝对路径`http://云服务器地址:8080/api`，然后重新构建前端再重启nginx即可

```bash
npm run build
rm -rf /var/www/项目名/*
cp -r ~/item/项目名/前端文件夹/dist/* /var/www/项目名
systemctl restart nginx
```

**Q：我的spring boot配置里面设置了可上传文件大小是10MB，为啥本地能正常上传4MB的图片，服务器端就不行呢？**

A：这里是因为Nginx也有文件限制，其默认是1MB的请求体大小，要解决也很简单，在你项目对应的nginx配置文件里面加上这行，**记得重启nginx**

```yaml
client_max_body_size 20M;	# 这里就是设置最大请求体大小是20MB
```

**Q：为什么我跳转到一个页面，只要网址栏不是服务器ip，点击刷新之后就报404呢？**

A：我想，你说的应该是这个情况

```
访问: http://1.1.1.1
→ 登录成功
→ 跳转到: http://1.1.1.1/home
→ 刷新
→ 404 ❌
```

这个问题本质是前端路由与服务器处理机制不一致导致的路径解析错误， 你的项目应该是单页应用（SPA）架构（如 Vue / React），其路由由前端控制，如果是正常跳转，那没问题，因为是有前端路由接管的，但是页面刷新，浏览器会将前端路由当成真实路径请求服务器，例如上面说的，服务器会去请求后端`GET /home`，那nginx就会在`/var/www/项目名`里面找，那自然是没有，就会返回404

解决方法也很简单，到你的项目的nginx配置文件里面配置一下兜底，让前端路由接管页面渲染，**记得重启nginx**

```yaml
location / {
    try_files $uri $uri/ /index.html;		# 加这行
}
```

## 2、可优化点

1. 域名绑定（替代ip）
2. Docker部署
3. HTTPS（Let’s Encrypt）
4. CI/CD 完善（多环境 dev/test/prod）
5. 前端构建优化（云构建，同步dist到云服务器）

# 六、补充

## 1、域名绑定

这里提前讲一下，买域名是需要实名信息模板的，然后这玩意审核要一天，所以想购买的记得提前创建自己的信息模板

![](/assets/images/2026-03-28/1-33.png)

![](/assets/images/2026-03-28/1-34.png)

### ①购买域名

依旧是来到阿里云首页，`产品 -> 域名与网站 -> 域名与网站`

![](/assets/images/2026-03-28/1-30.png)

然后这里就可以搜索自己想要的域名名和后缀组合的域名了，搜索之后根据自己的情况购买即可

![](/assets/images/2026-03-28/1-31.png)

![](/assets/images/2026-03-28/1-32.png)

### ②配置域名解析

依然是到控制台打开域名与网站，然后点进去

![](/assets/images/2026-03-28/1-35.png)

点进去之后选择域名解析

![](/assets/images/2026-03-28/1-36.png)

然后直接修改解析的地址即可，里面的记录值改成自己服务器的公网ip即可

![](/assets/images/2026-03-28/1-37.png)

### ③配置nginx服务器域名

这里就是在nginx里面加服务器域名的设置了，先进自己项目的nginx配置文件

```bash
nano /etc/nginx/sites-available/项目名.conf
```

然后加上这行

```bash
server_name 域名 www.域名;
```

然后保存之后**重启nginx**就可以了

**注：设置好之后要等待5-10分钟域名才能使用，建议使用之前先测试下能不能正常解析出自己的服务器ip**

```powershell
nslookup 域名
```

