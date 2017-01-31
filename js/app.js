
/////////////////////////////////////////CONSTRUCTORS

function Game(obj){
  this.tank= obj.tank;
  this.rows    = obj.rows;
  this.columns = obj.columns;
  function gridBackground(){
      for (var rowIndex = 0; rowIndex < obj.rows; rowIndex++){
        for (var columnIndex = 0; columnIndex < obj.columns; columnIndex++){
          $('.container').append($('<div>')
            .addClass('cell map')
            .attr('data-row', rowIndex)
            .attr('data-col', columnIndex)
          );
        }
    }
  }//End of function
  gridBackground();
  this.drawTank1();
  this.drawTank2();
  this.start();
  this.update();
  this.controlsTank1();
  this.controlsTank2();

  //////
  console.log(this.tank);
  ///

}

Game.prototype.drawTank1=function(){
    var player1Pos = '[data-row=' + this.tank.position[0].row + '][data-col=' + this.tank.position[0].column + ']';
    $(player1Pos).addClass('player1');

};
Game.prototype.drawTank2=function(){
  var player2Pos = '[data-row=' + this.tank.position[1].row + '][data-col=' + this.tank.position[1].column + ']';
  $(player2Pos).addClass('player2');
};
Game.prototype.generateWall=function(){

};
Game.prototype.drawWall=function(){
};
Game.prototype.drawBulletT1=function(){
  var Bullet1player1Pos = '[data-row=' + this.tank.position[0].row + '][data-col=' + this.tank.position[0].column + ']';
  $(Bullet1player1Pos).addClass('bullet1');
};
Game.prototype.drawBulletT2=function(){
  var Bullet1player2Pos = '[data-row=' + this.tank.position[1].row + '][data-col=' + this.tank.position[1].column + ']';
  $(Bullet1player2Pos).addClass('bullet1');
};
//////////////

Game.prototype.clearClass=function(){
  $('.player1').removeClass('player1-'+direction);

};
Game.prototype.clearTank1=function(){
  $('.player1').removeClass('player1-left');
  $('.player1').removeClass('player1-right');
  $('.player1').removeClass('player1-down');
  $('.player1').removeClass('player1-up');
};

Game.prototype.clearTank1Global=function(){
  $('.player1').removeClass('player1-left');
  $('.player1').removeClass('player1');
  $('.player1').removeClass('player1-right');
  $('.player1').removeClass('player1-down');
  $('.player1').removeClass('player1-up');
};

Game.prototype.clearTank2=function(){
$('.player2').removeClass('player2');
};
Game.prototype.clearBullets=function(){
$('.bullet1').removeClass('bullet1');
};
Game.prototype.clearWalls=function(){

};
Game.prototype.clearItems=function(){

};

Game.prototype.controlsTank1=function(){
  //var $player1 = $('.player1');
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
        switch (this.tank.direction) {
          case "left":
            this.clearTank1Global();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('player1-left');

            break;
          case "right":
            this.clearTank1Global();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('player1-right');
            break;
          case "up":
            this.clearTank1Global();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('player1-up');
            break;
          case "down":
            this.clearTank1Global();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('player1-down');
            break;
        }
        break;
      case 40: // arrow down
        //this.tank.moveBack(0);
        switch (this.tank.direction) {
          case "left":
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('player1-left');
            break;
          case "right":
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('player1-right');
            break;
          case "up":
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('player1-up');
            break;
          case "down":
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('player1-down');
            break;
        }
        break;
      case 37: // arrow left
        //this.tank.turnLeft();
        switch (this.tank.direction) {
          case "left":
            this.clearTank1();
            this.tank.turnLeft();
            this.drawTank1();
            $('.player1').addClass('player1-down');
            break;
          case "right":
            this.clearTank1();
            this.tank.turnLeft();
            this.drawTank1();
            $('.player1').addClass('player1-up');
            break;
          case "up":
            this.clearTank1();
            this.tank.turnLeft();
            this.drawTank1();
            $('.player1').addClass('player1-left');
            break;
          case "down":
            this.clearTank1();
            this.tank.turnLeft();
            this.drawTank1();
            $('.player1').addClass('player1-right');
            break;
        }
        break;
      case 39: // arrow right
        //this.tank.turnRight();
        switch (this.tank.direction) {
          case "left":
            this.clearTank1();
            this.tank.turnRight();
            $('.player1').addClass('player1-up');
            break;
          case "right":
            this.clearTank1();
            this.tank.turnRight();
            $('.player1').addClass('player1-down');
            break;
          case "up":
            this.clearTank1();
            this.tank.turnRight();
            $('.player1').addClass('player1-right');
            break;
          case "down":
            this.clearTank1();
            this.tank.turnRight();
            $('.player1').addClass('player1-left');
            break;
        }
        break;
      case 32: // spacebar
        this.tank.pressFire();
        break;
    }
  }.bind(this));

};
Game.prototype.controlsTank2=function(){
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 87: // w up
        this.tank.moveForward(1);
        break;
      case 83: // s down
        this.tank.moveBack(1);
        break;
      case 65: // a left
        this.tank.turnLeft();
        break;
      case 68: // arrow right
        this.tank.turnRight();
        break;
      case 17: // ctr
        this.tank.pressFire();
        break;
    }
  }.bind(this));

};
Game.prototype.start=function(){
  //this.update();
   setInterval(this.update.bind(this), 100);
};
Game.prototype.update=function(){
  //this.clearTank1();
  this.clearTank2();
  //console.log("Drawing it again");
//
  this.drawTank2();
};
Game.prototype.stop=function(){

};////////
///////////////////////////////////
var game =new Game({
  rows: 14,
  columns: 20,
tank:new Tank(),
tank2:new Tank()
});
