# personal_blog_system
 个人博客系统

|板块|技术栈|
|:---|:---|
|前端|vue.js; element-ui|
|后端|spring-boot; mysql; mybatis|

## 部署方法
 1、进入frontend文件夹，打开命令行，安装vue所需要的依赖，这可能需要一些时间；安装完成后，vue文件夹下会多一个名为node_modules的依赖包
```
> npm install
```
 
 启动vue服务
```
> npm run serve
```
 
 打开浏览器进入本地的8080端口，即可看到前端页面
```
localhost:8080
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

运行后端服务，即可在8000端口运行后端程序
```
> python manage.py runserver 0.0.0.0:8000
```

 3、管理员用户的用户名和密码均为admin，也可以注册新用户进行登录
 
 4、博客主页面如下图所示，本项目仅供参考和学习交流使用，如有意见欢迎指出
 
![blog.png](https://s2.loli.net/2021/12/25/OtScowg31u4ehya.png)