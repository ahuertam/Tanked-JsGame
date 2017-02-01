
/////////////////////////////////////////CONSTRUCTORS

function Game(obj){
  this.tank= obj.tank;
  gridBackground();
  this.drawTank2();
  this.controlsTank2();
  //////
  console.log(this.tank);
  ///

}
//////////////////////////////////////////////////////////////////
////////////////DRAWING///////////////////////
////////////////////////////////////////
Game.prototype.paintLives=function(tank){
document.getElementById("lifes2").innerHTML =this.tank.lifes;

};
Game.prototype.drawTank2=function(){

  var player2Pos = '[data-row=' + this.tank.position[1].row + '][data-col=' + this.tank.position[1].column + ']';
  $(player2Pos).addClass('player2');
};
Game.prototype.drawBulletT2=function(bullet){
    console.log(bullet.range);
    var game = this;
    function moveBullet() {
      var Bullet1player2Pos = '[data-row=' + bullet.position[1].row+ '][data-col=' + bullet.position[1].column + ']';
      game.clearBullets(Bullet1player2Pos); //1/2 DO NOT CHANGE ORDER
      bullet.moveForward();//2/2
      Bullet1player2Pos = '[data-row=' + bullet.position[1].row+ '][data-col=' + bullet.position[1].column + ']';
      $(Bullet1player2Pos).addClass('bullet2');
      }
    var interval = setInterval(function () {
      if (bullet.range > 0) {
////////////////IMPACT  WALL////////////////////////
        if (game.checkNextFwd(bullet.direction,bullet.position[1],"wall")){
          console.log("obstacle AHEAD");
          Bullet1player2Pos = '[data-row=' + bullet.position[1].row+ '][data-col=' + bullet.position[1].column + ']';
          game.soundPlayer("biggun1");
          game.clearBullets(Bullet1player2Pos);
          clearInterval(interval);
        }
////////////////IMPACT Breakble WALL////////////////////////
          else if (game.checkNextFwd(bullet.direction,bullet.position[1],"wallBreak")) {
            console.log("Break the DAMN Wall");
            Bullet1player2Pos = '[data-row=' + bullet.position[1].row+ '][data-col=' + bullet.position[1].column + ']';
            game.killFwd(bullet.position[1],bullet.direction,"wallBreak");
            game.soundPlayer("lightExplosion");
            game.clearBullets(Bullet1player2Pos);
            game.tank.getSomePoints(100);
            clearInterval(interval);
          }
////////////////IMPACTA CONTRA JUGADOR 1////////////////////////
          else if (game.checkNextFwd(bullet.direction,bullet.position[1],"player1")) {
            console.log("DIE YOU BLUE MUDWATER!");
            Bullet1player2Pos = '[data-row=' + bullet.position[1].row+ '][data-col=' + bullet.position[1].column + ']';
            //LLAMAR A FUNCION QUE RESTA VIDA, EN CASO QUE NO TENGA VIDAS ACABA LA PARTIDA
            //If result = True inicia muerte // Else Continua
            game.clearBullets(Bullet1player2Pos);
            if(game.tank1.recieveShoot()){////////END GAME HERE
              game.tank.getSomePoints(1500);
              game.soundPlayer("bigExplosion");
              game.killFwd(bullet.position[1],bullet.direction,"player1");
              alert("RED PLAYER 1 WINS!! LONG LIVE THE RED`S" + "LIFES LEFT :"+game.tank2.lifes+" That gives Some points too man!, in total you have got :"+game.tank2.points);
              clearInterval(interval);
            }else{
              game.soundPlayer("lightExplosion");
              game.tank.getSomePoints(500);
              clearInterval(interval);}
          }
        else{
        moveBullet();
        bullet.range--;}
      } else {
        Bullet1player2Pos = '[data-row=' + bullet.position[1].row+ '][data-col=' + bullet.position[1].column + ']';
        game.clearBullets(Bullet1player2Pos);
        clearInterval(interval);
      }
    }, 100  );

};

Game.prototype.drawDotBlue=function(){
    // var player1Pos = '[data-row=' + this.tank.position[0].row + '][data-col=' + this.tank.position[0].column + ']';
    // $(player1Pos).addClass('dotBlue');
    //   var timerSet= setInterval(this.clearBlueDot(player1Pos),10);
};
//////////////////////////////////////////////////////////////////
////////////////CLEARS///////////////////////
/////////////////////////////////////////

Game.prototype.clearClass=function(){
  $('.player2').removeClass('player2-'+direction);

};
Game.prototype.clearTank2Global=function(){
  $('.player2').removeClass('left');
  $('.player2').removeClass('right');
  $('.player2').removeClass('down');
  $('.player2').removeClass('up');
  $('.player2').removeClass('player2');
};
Game.prototype.clearTank2=function(){
  $('.player1').removeClass('left');
  $('.player1').removeClass('right');
  $('.player1').removeClass('down');
  $('.player1').removeClass('up');
};

Game.prototype.clearBullets=function(bullet){
  $(bullet).removeClass('bullet2');
  //debugger;
};
Game.prototype.clearWall=function(position){
  var RemoveWall = '[data-row=' + position.row+ '][data-col=' + position.column + ']';
  $(RemoveWall).removeClass('wallBreak');
};
Game.prototype.clearBlueDot=function(){
  $('.player1').removeClass('dotBlue');
};

Game.prototype.clearItems=function(){

};

//////////////////////////////////////////////////////////////////
////////////////Complementary FUNCTIONS///////////////////////

Game.prototype.checkClass=function(objPos,classToLook){
  this.objPos=objPos;
  if($(objPos).hasClass(classToLook)){
    return true;
  }else{return false;}
};

Game.prototype.checkNextFwd=function(direction,position,classToLook){
  var originPos = '[data-row=' + position.row + '][data-col=' + position.column + ']';
  var rowOrigin=position.row;
  var colOrigin=position.column;
  switch (this.tank.direction) {
    case "left":
      colOrigin -=1;
      var newposLeft = '[data-row="' + rowOrigin + '"][data-col="' + colOrigin + '"]';
      if(this.checkClass(newposLeft,classToLook)){
        return true;
      }else{return false;}
      break;
    case "right":
       colOrigin +=1;
       var newposRight = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposRight,classToLook)){
         return true;
       }else{return false;}
      break;
    case "up":
       rowOrigin -=1;
       var newposUp = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposUp,classToLook)){
         return true;
       }else{return false;}
      break;
    case "down":
       rowOrigin +=1;
       var newposDown = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposDown,classToLook)){
         return true;
       }else{return false;}
      break;
  }
};
Game.prototype.checkNextBkw=function(direction,position,classToLook){
  var originPos = '[data-row=' + position.row + '][data-col=' + position.column + ']';
  var rowOrigin=position.row;
  var colOrigin=position.column;
  switch (this.tank.direction) {
    case "left":
      colOrigin +=1;
      var newposLeft = '[data-row="' + rowOrigin + '"][data-col="' + colOrigin + '"]';
      if(this.checkClass(newposLeft,classToLook)){
        return true;
      }else{return false;}
      break;
    case "right":
       colOrigin -=1;
       var newposRight = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposRight,classToLook)){
         return true;
       }else{return false;}
      break;
    case "up":
       rowOrigin +=1;
       var newposUp = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposUp,classToLook)){
         return true;
       }else{return false;}
      break;
    case "down":
       rowOrigin -=1;
       var newposDown = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposDown,classToLook)){
         return true;
       }else{return false;}
      break;
  }
};
Game.prototype.killThat=function(position,classToKill){
  if(this.checkClass(position,classToKill)){
    $(position).removeClass(classToKill);}
    else{console.log ("ERROR KILLING the "+classToKill);}
  };

Game.prototype.killFwd=function(position,direction,classToLook){
  //Recibe game.killFwd(bullet.position[0],bullet.direction,"wallBreak");
  //var originPos = '[data-row=' + position.row + '][data-col=' + position.column + ']';
  var rowOrigin=position.row;
  var colOrigin=position.column;
  switch (direction) {
    case "left":
      colOrigin -=1;
      var newposLeft = '[data-row="' + rowOrigin + '"][data-col="' + colOrigin + '"]';
      if(this.checkClass(newposLeft,classToLook)){
          this.killThat(newposLeft,classToLook);
      }else{break;}
      break;
    case "right":
       colOrigin +=1;
       var newposRight = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposRight,classToLook)){
         this.killThat(newposRight,classToLook);
     }else{break;}
      break;
    case "up":
       rowOrigin -=1;
       var newposUp = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposUp,classToLook)){
         this.killThat(newposUp,classToLook);
     }else{break;}
      break;
    case "down":
       rowOrigin +=1;
       var newposDown = '[data-row=' + rowOrigin + '][data-col=' + colOrigin + ']';
       if(this.checkClass(newposDown,classToLook)){
         this.killThat(newposDown,classToLook);
     }else{break;}
      break;
  }
};



////////////////////////////////////////////////////////////////// wallBreak
////////////////CONTROLS///////////////////////
////////////////////////////////////////////////////

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
  //this.clearTank2();
  //console.log("Drawing it again");
  this.scoreUpdate();
  //this.drawTank2();
  //this.scoreUpdate();
};
Game.prototype.stop=function(){

};////////
//////////////////////////////////////////////////////////////////
////////////////SCORE MANAGER///////////////////////
/////////////////////////////////////////
Game.prototype.scoreUpdate=function(){

document.getElementById("points2").innerHTML =this.tank.points;
//document.getElementById("points2").innerHTML =this.tank2.points;

};////////


//////////////////////////////////////////////////////////////////
////////////////SOUND PLAYER SELECTOR///////////////////////
/////////////////////////////////////////

Game.prototype.soundPlayer=function(type){
  switch (type) {
    case "shoot":
    var audio = new Audio('./sounds/gunshot1.mp3');
    audio.play();
      break;
    case "lightExplosion":
    var audio2 = new Audio('./sounds/explosion1.mp3');
    audio2.play();
    break;
    case "biggun1":
    var audio3 = new Audio('./sounds/biggun1.mp3');
    audio3.play();
    break;
    case "bigExplosion":
    var audio4 = new Audio('./sounds/explosion.mp3');
    audio4.play();
    break;
  }//Swich
};

//////////////////////////////////////////////////////////////////
////////////////OBJECTS///////////////////////
//////////////////////////////////////
var game =new Game({
  rows: 14,
  columns: 20,
tank:new Tank(),
tank2:new Tank()
});
