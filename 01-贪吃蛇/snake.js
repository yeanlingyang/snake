//蛇关节的宽度  高度 蛇头的颜色  蛇身体的颜色 位置（数组坐标）方向
function Snake (options) {
  options = options ||{};
  this.width  = options.width ||20;
  this.height = options.height ||20;
  this.headColor = options.headColor ||"red";
  this.bodyColor = options.bodyColor ||"#473fe2";
  this.body = [
    {x:2 ,y:0},
    {x:1 ,y:0},
    {x:0 ,y:0},
  ]
  this.direction = options.direction ||"right";
}

//设置蛇的原型，渲染蛇
Snake.prototype.render=function(target) {
  //先删除之前的关节
  var spans = target.querySelectorAll("span");
  for (var i = 0;i<spans.length;i++) {
    target.removeChild (spans[i]);
  }

  //动态生成span，并把它放进target中
  for (var i = 0;i<this.body.length;i++) {
    var span = document.createElement("span");
    target.appendChild (span);

     //设置span的样式
  span.style.width  = this.width+"px";
  span.style.height = this.height+"px";
  span.style.backgroundColor =  i===0 ? this.headColor :this.bodyColor;


  //设置span的left值和top值
  span.style.position = "absolute";
  span.style.left = this.body[i].x *this.width +"px";
  span.style.top  = this.body[i].y *this.height +"px";
  }

 
}
//设置蛇移动的原型
//创建一个新的蛇头。删除蛇尾
Snake.prototype.move = function (target,food) {
  var flag = false; 
  var newHead = {
    x: this.body[0].x,
    y: this.body[0].y,
  }
  switch(this.direction) {
    case "left":
    newHead.x--;
    break;
    case "right":
    newHead.x++;
    break;
    case "up":
    newHead.y--;
    break;
    case "down":
    newHead.y++;
    break;
  }
  //新增蛇头
  this.body.unshift(newHead);
  //删除蛇尾,做判断 如果吃到食物就不用删除
  if (newHead.x===food.x &&newHead.y ===food.y) {
    food.render(target);
    flag=true;
  }
  else {
    this.body.pop();
  } 
  //重新渲染蛇
  this.render(target);
  return flag;
}