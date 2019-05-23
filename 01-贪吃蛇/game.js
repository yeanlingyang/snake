//属性  对象 地图   蛇对象   食物对象

function Game (options) {
  options =  options ||{};
  this.map = options.map ;
  this.snake = options.snake || new Snake();
  this.food  = options.food || new Food();
  this.direction = options.direction ||100;

  //将蛇对象和食物对象 渲染到地图上
  this.snake.render (this.map);
  this.food .render (this.map);
  this.timeId = null;
  //节流阀的设置
  this.flag = true;
  this.score = 0;
}
Game.prototype.start = function () {
  var that = this;
  var snake = this.snake;
  var food = this.food;
  var map = this.map;
  this.timeId = setInterval(function() {
    var result =snake.move(map,food);

    if(result) {
      that.score++;
      var score = document.querySelector(".score");
      score.innerText =that.score<10? "0"+that.score :that.score;
      console.log(that.score);
    }


    //蛇头撞墙的时候游戏结束。重新游戏
    var head = snake.body[0];
    var maxX = map.offsetWidth / food.width-1;
    var maxY = map.offsetHeight/food.height-1;
    if (head.x<0 ||head.y<0 ||head.x>maxX ||head.y>maxY) {
      clearInterval(that.timeId);
      alert("游戏结束，点击确认重新开始");
      location.reload();
    }


    //蛇头和自己的身体重合的时候，游戏结束，重新开始游戏
    for (var i = 4;i<snake.body.length;i++) {
      var temp = snake.body[i];
      if (temp.x===head.x && temp.y===head.y) {
        clearInterval(that.timeId);
        alert("游戏结束，点击确认重新开始");
        location.reload();
      }
    }
  },that.direction)

  this.addEvent();
}
//按键设置

Game.prototype.addEvent = function() {
  var snake = this.snake;
  var that = this;
  document.onkeyup=function(e) {
      if (that.flag) {
        that.flag=false;
        switch(e.keyCode) {
        case 37:
        if(snake.direction!=="right") {
          snake.direction="left";
        }
        break;
        case 38:
        if(snake.direction!=="down") {
          snake.direction="up";
        }
        break;
        case 39:
        if(snake.direction!=="left") {
          snake.direction="right";
        }
        break;
        case 40:
        if(snake.direction!=="up") {
          snake.direction="down";
        }
        break;
      }
      setInterval(function() {
        that.flag=true;
      },this.direction)
    }
  }
};