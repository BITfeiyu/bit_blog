# personal_blog_system
 个人博客系统

本项目是在网上github个人博客系统的基础上进行的二次开发
[原项目地址](https://github.com/stacklens/django-vue-tutorial)

|板块|技术栈|
|:---|:---|
|前端|vue.js; element-ui|
|后端|django; mysql|

## 部署方法
 1、进入frontend文件夹，打开命令行，安装vue所需要的依赖，这可能需要一些时间；安装完成后，vue文件夹下会多一个名为node_modules的依赖包
```
> npm install
```
 
 启动vue服务
```
> npm run serve
```
 
 打开浏览器进入本地的9000端口，即可看到前端页面
```
localhost:9000
```
 
 2、回退到django-vue-tutorial文件夹下，使用python3.7以上版本创建虚拟环境，python3.6及以下版本可能会造成依赖包不兼容的问题，此时当前目录下会多出一个名为venv的文件夹
```
> python -m venv venv
```

运行虚拟环境，并在虚拟环境下安装所需的依赖项
```
> venv\Scripts\activate.bat
> pip install -r requirements.txt
```

如果是linux系统，执行以下命令激活虚拟环境
```
$ source venv/bin/activate
```

首先在你本人的数据库中创建并迁移数据库
```
> python manage.py makemigrations
> python manage.py migrate
```

运行后端服务，即可在8000端口运行后端程序
```
> python manage.py runserver 0.0.0.0:8000
```
 
 3、本项目为了适应无服务serveless的开发需要，将图片的存储位置从后端的本地调整为了sm.ms的图床上，数据库仅保存图床的链接字符串
 
 [sm.ms的api说明文档](https://doc.sm.ms/)
 
 如果需要对图床上的图片文件进行管理，可以打开/article/imgbed.py在请求头添加图床秘钥
 
 4、数据库配置位于/drf_vue_blog/settings.py文件中，默认使用本地sqlite数据库，可以修改为远程mysql数据库
 
 5、博客主页面结构如下图所示，本项目仅供参考和学习交流使用，如有意见欢迎指出
 
![blog.png](https://s2.loli.net/2021/12/25/OtScowg31u4ehya.png)
