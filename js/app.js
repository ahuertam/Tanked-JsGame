
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
//////////////////////////////////////////////////////////////////
////////////////DRAWING///////////////////////
////////////////////////////////////////
Game.prototype.drawTank1=function(){
    var player1Pos = '[data-row=' + this.tank.position[0].row + '][data-col=' + this.tank.position[0].column + ']';
    $(player1Pos).addClass('player1');

};
Game.prototype.drawTank2=function(){

  var player2Pos = '[data-row=' + this.tank.position[1].row + '][data-col=' + this.tank.position[1].column + ']';
  $(player2Pos).addClass('player2');
};
Game.prototype.generateWall=function(size){
this.size=size;
};
Game.prototype.drawWall=function(){
};


Game.prototype.drawBulletT1=function(bullet){
    //Max widh || bullet vrange=10 While todo lo anterior
    console.log(bullet.range);
    //$('.bullet1').removeClass('bullet1');Imprime solo una columna( no vale porque machacaría cualquier disparo)
    while(bullet.range>0){
      this.clearBullets(Bullet1player1Pos);//Imprime solo uno Y si lo quito imprime todos
      var Bullet1player1Pos = '[data-row=' + bullet.position[0].row+ '][data-col=' + bullet.position[0].column + ']';
      //  var timerSet = setInterval(bullet.moveForward,500);
        bullet.moveForward();
      $(Bullet1player1Pos).addClass('bullet1');
      bullet.range--;
      //setTimeout(clearBullets(Bullet1player1Pos), 1000);

      //var timerSet= setInterval(this.clearBullets(Bullet1player1Pos), 1000);
     }
};


Game.prototype.drawBulletT2=function(){
  var Bullet1player2Pos = '[data-row=' + this.tank.position[1].row + '][data-col=' + this.tank.position[1].column + ']';
  $(Bullet1player2Pos).addClass('bullet1');
};
//////////////////////////////////////////////////////////////////
////////////////CLEARS///////////////////////
/////////////////////////////////////////

Game.prototype.clearClass=function(){
  $('.player1').removeClass('player1-'+direction);

};
Game.prototype.clearTank1=function(){
  $('.player1').removeClass('left');
  $('.player1').removeClass('right');
  $('.player1').removeClass('down');
  $('.player1').removeClass('up');
};

Game.prototype.clearTank1Global=function(){
  $('.player1').removeClass('left');
  $('.player1').removeClass('right');
  $('.player1').removeClass('down');
  $('.player1').removeClass('up');
  $('.player1').removeClass('player1');
};

Game.prototype.clearTank2=function(){
$('.player2').removeClass('player2');
};

Game.prototype.clearBullets=function(bullet){
  $(bullet).removeClass('bullet1');
};
Game.prototype.clearWalls=function(){

};
Game.prototype.clearItems=function(){

};
//////////////////////////////////////////////////////////////////
////////////////CONTROLS///////////////////////
////////////////////////////////////////////////////
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
            $('.player1').addClass('left');

            break;
          case "right":
            this.clearTank1Global();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('right');
            break;
          case "up":
            this.clearTank1Global();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('up');
            break;
          case "down":
            this.clearTank1Global();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('down');
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
            $('.player1').addClass('left');
            break;
          case "right":
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('right');
            break;
          case "up":
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('up');
            break;
          case "down":
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('down');
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
            $('.player1').addClass('down');
            break;
          case "right":
            this.clearTank1();
            this.tank.turnLeft();
            this.drawTank1();
            $('.player1').addClass('up');
            break;
          case "up":
            this.clearTank1();
            this.tank.turnLeft();
            this.drawTank1();
            $('.player1').addClass('left');
            break;
          case "down":
            this.clearTank1();
            this.tank.turnLeft();
            this.drawTank1();
            $('.player1').addClass('right');
            break;
        }
        break;
      case 39: // arrow right
        //this.tank.turnRight();
        switch (this.tank.direction) {
          case "left":
            this.clearTank1();
            this.tank.turnRight();
            $('.player1').addClass('up');
            break;
          case "right":
            this.clearTank1();
            this.tank.turnRight();
            $('.player1').addClass('down');
            break;
          case "up":
            this.clearTank1();
            this.tank.turnRight();
            $('.player1').addClass('right');
            break;
          case "down":
            this.clearTank1();
            this.tank.turnRight();
            $('.player1').addClass('left');
            break;
        }
        break;
      case 32: // spacebar

          switch (this.tank.direction) {
            case "left":
              var bulletLeft=this.tank.pressFire(this.tank.direction);
              bulletLeft.position[0].column -=1;
              this.drawBulletT1(bulletLeft);

              break;
            case "right":
              var bulletRight=this.tank.pressFire(this.tank.direction);
              bulletRight.position[0].column +=1;
              //var timerSet= setInterval(this.drawBulletT1(bulletRight), 10000);
              this.drawBulletT1(bulletRight);

              break;
            case "up":
              var bulletUp=this.tank.pressFire(this.tank.direction);
              bulletUp.position[0].row -=1;
              this.drawBulletT1(bulletUp);
              break;
            case "down":

              var bulletDown=this.tank.pressFire(this.tank.direction);
              bulletDown.position[0].row +=1;
              this.drawBulletT1(bulletDown);
              break;
          }
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
//////////////////////////////////////////////////////////////////
////////////////GAME FUNCTIONS///////////////////////
/////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////
////////////////OBJECTS///////////////////////
//////////////////////////////////////
var game =new Game({
  rows: 14,
  columns: 20,
tank:new Tank(),
tank2:new Tank()
});
