/* 
创建一个函数，可以用来执行简单动画
   参数：
       obj：要执行的动画对象
       attr：要执行动画的样式，比如：left、top、width、height
       target：执行动画的目标位置
       speed：移动速度
       callback：回调函数，可以写出更多无限可能的动画，该函数在动画执行完毕后执行
*/
//定义一个全局变量，为对应的定时器编号
var timer;
function move(obj, attr, target, speed, callback) {
  //关闭同一个元素的上一个对象，不加obj则会关闭其他对象的定时器
  clearInterval(obj.timer);
  //获取当前元素的位置
  var address = parseInt(getStyle(obj, attr));
  //判断输入的速度正负值
  //如果从0px到800px(target)移动，则speed为正
  //如果是800px到0(target)移动，则speed为负
  if (address > target) {
    //只需判断负值
    speed = -speed;
  }
  //开启一个定时器，用来执行正负值
  //向执行动画的对象中添加一个对象的timer属性，用来保存自己的定时器标识
  obj.timer = setInterval(function () {
    //获取原来对象的样式值
    var oldvalue = parseInt(getStyle(obj, attr));
    //然后在原来的基础上增加
    var newvalue = oldvalue + speed;
    //使用newvalue判断执行动画的位置target，使其停止
    //比如：向左移动（speed<0）时，需要判断newvalue的值是否小于target
    //比如：向右移动（speed>0）时，需要判断newvalue的值是否大于target

    if ((speed < 0 && newvalue < target) || (speed > 0 && newvalue > target)) {
      newvalue = target;
    }
    //设置新值
    obj.style[attr] = newvalue + "px";
    if (newvalue == target) {
      clearInterval(obj.timer);
      callback && callback(); //有回调函数就执行，没有就不执行，如果不写则会报错
    }
  }, 30);
}

/* 
定义一个函数，用了来获取当前样式
*/
//obj是元素对象，name是样式名
function getStyle(obj, name) {
  if (window.getComputedStyle) {
    return getComputedStyle(obj, null)[name]; //正常浏览器
  } else {
    return obj.currentStyle[name]; //IE8
  }
}
