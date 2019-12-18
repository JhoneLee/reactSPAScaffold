# react SPA 脚手架

增加jest单元测试
## 安装步骤

npm install

------
## 运行


> * 开发环境 npm run dev
> * 生产环境 npm run prod

------
## 脚手架说明
> * 使用antd作为界面
> * 完全的前后端分离
> * 引入redux 及 react-router
> * 使用fetch请求数据

------
## webpack配置更新
>* 使用webpack.DefinePlugin设置环境变量，自动区分domain.js中的api选择
>* 使用webpack.DllReferencePlugin 和 webpack.DllPlugin 设置资源库构建，加快打包速度和拆分bundle
