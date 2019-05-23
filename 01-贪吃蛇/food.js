//属性   对象  食物的宽 高  背景色 位置 x y 
     //  方法

function  Food (options) {
  options = options ||{};
  this.width = options.width||20;
  this.height =options.height ||20;
  this.bgColor = options.bgColor ||"#30d734";
  this.x = options.x || 0;
  this.y = options.y || 0;
}
Food.prototype.render = function (target) {
  //删除旧的食物
  var oldDiv = target.querySelector("div");
  oldDiv && target.removeChild(oldDiv);
  //动态创建div，被把他放进target中
  var div = document.createElement("div");
  target.appendChild (div);

  //设置div 的样式
  div.style.width =  this.width+"px";
  div.style.height= this.height+"px";
  div.style.backgroundColor = this.bgColor;
  //随机位置
  this.x = parseInt(Math.random() * (target.offsetWidth/this.width));
  this.y = parseInt(Math.random() *(target.offsetHeight/this.height));

  //设置div的left值和top值
  div.style.position = "absolute";
  div.style.left = this.x *this.width +"px";
  div.style.top  = this.y *this.height +"px";

}