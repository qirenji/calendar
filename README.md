# 简易日历组件

## 说明

简易日历组件，可以选择日期,ES6编写，已在glup中使用babel转换成ES5，可在此基础上扩展开发自己所需。

## 使用方法

找到dist／js下的all.js

在html中添加如下代码

```
<div class="wrapper">
		
</div>
<script src="js/all.js"></script>

<script>
		new Calendar('.wrapper');
</script>
```

**重点**

日期的事件委托。使用ev.target获得目标。


## 预览

http://www.qirenji.info/practices/calendar/


## About

关于我: http://www.qirenji.info/about

GitHub: https://github.com/qirenji/

E-mail: lyf@qirenji.com
