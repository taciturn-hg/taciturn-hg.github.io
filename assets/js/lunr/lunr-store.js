var store = [{
        "title": "我的第一篇博客",
        "excerpt":"欢迎来到我的博客  ok啊，大家好，我是后果，目前是一名大二计科专业的学生，热衷于学习编程，同时也想找到志同道合的朋友一起学习，一起进步。     正文  现在是2025-11-30 21:37，我终于整好这个博客开始写了，天知道这玩意搞了我一下午，调这博客主题还有本地部署博客真是挺闹腾，用那AI也是一直跟我绕，整半天没整好，不过还得是靠我的聪明才智，成功把这玩意整好了。      心里话 好了说正事，首先这是我的第一篇日常博客，聊聊我想说的，首先很庆幸能遇到我团队里的某一位，这一切的开始都是源于ta，ta是我大学认识的第一个朋友，还跟我同寝室，ta很强，我都是以ta为目标，ta在大一给了我很强的学习动力，如果没认识ta，那我跟我的恩师也只是停留在专业课老师和同学的关系，而我也会跟大部分大学生一样浑浑噩噩的混完这四年，虽然说现在我技术上稍比ta强，但ta身上还是有很多我需要学习的地方，为人处世这块哈哈。  其次就是感谢带我的恩师，从最开始就跟我们讲明了未来我们可以走的方向，帮我拓宽了视野，让我看清了很多东西，让我的前行路上的迷雾散了不少，同时呢，恩师给了我们很多建议，打比赛啊，考证啊，我只能说，帮助很大，后续偶尔的聚餐聊天，聊发展，聊未来，我就在畅想未来我通过努力奋斗之后站在高处的感觉，虽然不知道能不能爬上去，不过想那么多干啥，写到这里让我想到《功夫熊猫》里面乌龟大师的话：***“Yesterday is history, Tomorrow is a mystery, But today is a gift. That is why it's called the present”***，就像那贪心算法，每一次的选择都是最优，最后大概率就是最优答案，注重当下，做好每一天。  我呢，希望今天成为一切正式的开始，后面能不断的发展下去，也希望未来的我，不管是发展的好或坏，看到这第一篇博客时，能回想起这一刻，能继续激励或重新振作自己，能回想起第一次成功提交，成功运行时的兴奋，加油吧，别放弃！     结语  后续我是打算在博客里面记录我的学习、做项目时候遇到的新东西，可以方便我随时查看、复习巩固，也可以分享给跟我同一团队的伙伴，也希望能帮助到每一位看我博客的人，若发现有问题，可到我的github账号或者email邮箱告诉我，我会及时修改。  ","categories": [],
        "tags": ["日常"],
        "url": "/2025/11/30/%E6%88%91%E7%9A%84%E7%AC%AC%E4%B8%80%E7%AF%87%E5%8D%9A%E5%AE%A2/",
        "teaser": null
      },{
        "title": "GitHub Pages + Jekyll 本地部署博客",
        "excerpt":"前言 本博客作为我的第一篇技术博客，有些细节可能讲的不是很清晰或者有矛盾，请见谅，错误点和矛盾点可以到我的github账号或者email邮箱反馈，我会及时修正 描述 写博客时，若要查看博客更改的信息，我们得先从git提交到我们的远程github仓库，才能看到效果，还有可能提交完结果报错，运行不起来，最后还得回退，及其的麻烦，于是我通过询问AI，找到这么一个方法让我们能直接在本地运行我们的blog，保存代码后直接刷新即可看到最新效果，及其方便，好了教程开始 教程 第一步：准备环境 1、安装Ruby,可以去到其官网（https://rubyinstaller.org/downloads/），直接下载最新的Ruby+Devkit 安装时注意： 1、勾选上 Run ‘ridk install’（自动安装 MSYS2） 2、打开后选择：1 → Enter（安装基础组件） 验证是否成功： ruby -v gem -v 如果能显示版本，说明 OK。 第二步：安装Jekyll与Bundler 执行： gem install bundler jekyll 成功后检查： jekyll -v 第三步：安装依赖 1、先进入到本地博客根目录 2、在上面文件路径窗口里面输入cmd打开此位置的命令窗 或者先win+R打开运行，输入cmd 打开命令窗后先输入E：（主要看你项目在哪个盘）切换盘符 再使用cd E:\\ITEM\\taciturn-hg.github.io（取决于你的项目绝对路径）进入项目根目录 3、如果项目里面有Gemfile文件，则在命令窗执行 bundle install 如果没有，则需自行在项目根目录创建文件Gemfile，内容示例： source \"https://gems.ruby-china.com/\" gem \"jekyll\", \"~&gt; 4.3.2\" gem...","categories": [],
        "tags": ["技术"],
        "url": "/2025/11/30/GitHubPages+Jekyll%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2%E5%8D%9A%E5%AE%A2/",
        "teaser": null
      },{
        "title": "如何创建属于自己的博客",
        "excerpt":"描述 我们在网上搜教程、资料时，有时候会搜到一些大佬的博客，里面记录的他们所分享的一些技术和日常，这时候应该也会想拥有一个属于自己的博客，这篇教程就是手把手教你如何制作一个属于自己的博客 第一步：准备工作 1、注册GitHub账号 前往GitHub官网（https://github.com/）注册一个GitHub账号,注册成功后记住用户名，如果不记得也可以到官网这里查看 2、下载git 去git官网（https://git-scm.com/）下载 3、下载vscode 去vscode官网（https://code.visualstudio.com/）下载 第二步：创建GitHub仓库 1、登录 GitHub → 点击右上角 → Repository → New 2、仓库名建议用：.github.io（这是 GitHub Pages 默认的个人博客仓库名） 3、选择 Public，勾选 Initialize this repository with a README 4、点击 Create Repository 第三步：启动GitHub Pages(生成博客) 1、进入仓库 → Settings → Pages 配置： Source：Deploy from branch Branch：main /root 第四步：clone远程仓库到本地 1、创建一个文件夹专门放你的项目，使用vscode打开 2、去到你的github的blog仓库，复制仓库的URL 3、在vscode里面点击克隆git仓库，将复制的仓库URL输入进去...","categories": ["blog"],
        "tags": ["技术"],
        "url": "/blog/2025/12/01/%E5%A6%82%E4%BD%95%E5%88%9B%E5%BB%BA%E5%B1%9E%E4%BA%8E%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8D%9A%E5%AE%A2/",
        "teaser": null
      },{
        "title": "win11如何使用虚拟机VMware安装ensp",
        "excerpt":"描述  我在上周计网实训周发现我的电脑是win11系统，而ensp所需要的其中一个组件VirtualBox在win11只能安装7.x的，而ensp只向下兼容5.x，不向上兼容，所以win11是无法安装ensp的，由此我决定把使用虚拟机安装ensp的流程整理成教程分享给大家     第一步：准备工作   1、准备虚拟机软件VMware，可以前往官网（https://www.vmware.com/）下载，不过这玩意要注册，而且想找到下载链接也很难   2、准备一个win10的系统镜像，前往Microsoft官网（https://www.microsoft.com/zh-cn/software-download/windows10）下载即可  安装包下载好后点开安装，跟随下面图片操作即可：          然后就会让你确定下载路径，等待下载即可    3、准备ensp的全部组件安装包，ensp的安装包只能在网上找，华为官网的下载通道关闭了，其他组件均可找到。 当然为了方便大家不用花那么长时间在找资源上，我已经将准备工作需要的安装包和ios镜像文件上传到百度网盘了（https://pan.baidu.com/s/5jG3E7nYtfHSoy4UenDo4VA ），大家直接下载即可     第二步：调整windows设置  1、首先要知道一个点，ensp本身也是有虚拟机的，所以你使用VMware虚拟机去用ensp时，其实是嵌套虚拟，在windows系统默认时不行的，而你需要使用VMware的话，需要更改一些windows 设置，来取消windows的虚拟环境检测，而这些设置只有在windows专业版才能设置。   所以这一步就是要把win11系统升级至专业版 （已经是专业版的可以跳过这一步），大家可以去淘宝买个win11教育版升级专业版激活码，大概10~30块钱这样，找客服要到激活码后，跟随以下图片完成激活：       2、完成激活并重启之后就开始调整windows设置，跟随下面图片完成设置：          这一步完成后先不要重启，继续往下做    3、在下方搜索栏搜索cmd → 点击以管理员身份运行 → 在输入框里面输入bcdedit /set hypervisorlaunchtype off       4、按win+R打开运行，输入optionalfeatures.exe，然后按照下方图片关掉一些选项：    至此，windows系统的设置全部完成，关机重启后进入下一步。     第三步：制作虚拟机  1、VMware的安装除了改安装路径，其他都是一路默认到底，现在开始制作虚拟机，跟随下方图片制作即可：                      2、将在百度网盘下载的网络模拟器文件夹复制到跟虚拟机共享的文件夹里面，随后就可以进行win10系统和ensp的安装了，我录制了视频放在b站，可以通过以下链接去查看：            这样就完成使用虚拟机安装ensp了，使用虚拟机有个好处就是做完不用关机，直接挂起即可，下次就可以接着挂起那一刻继续做  ","categories": ["blog"],
        "tags": ["技术"],
        "url": "/blog/2025/12/01/win11%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%99%9A%E6%8B%9F%E6%9C%BAVMware%E5%AE%89%E8%A3%85ensp/",
        "teaser": null
      },{
        "title": "Java学习总结",
        "excerpt":"Java 程序设计课程学习总结 姓名 / 学号：王许毅 202402151394 一、前言 本学期系统学习了《Java 程序设计》课程，从 Java 的基础语法到面向对象思想，再到常用类库与异常处理等内容，对 Java 语言的整体结构与编程思想有了较为完整的认识。本文将按照教材章节顺序，对每一章的核心概念、关键知识点进行总结，并结合自己的理解、学习过程中的难点以及解决方法进行反思。 第二章：Java 语言概述与开发环境 1. 核心知识点 Java 的特点： 面向对象 跨平台（JVM） 安全性高 自动垃圾回收 Java 程序的运行机制 .java → 编译成 .class 由 JVM 解释/运行 JDK、JRE、JVM 的区别 2. 示例代码 public class HelloWorld { public static void main(String[] args) { System.out.println(\"Hello, Java!\"); } }...","categories": ["blog"],
        "tags": ["学习"],
        "url": "/blog/2025/12/18/Java%E5%AD%A6%E4%B9%A0%E6%80%BB%E7%BB%93/",
        "teaser": null
      }]
