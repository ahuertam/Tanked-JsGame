
/////////////////////////////////////////CONSTRUCTORS

function Game2(obj){
  this.tank= obj.tank;
  this.tank2= obj.tank2;
  this.rows = obj.rows;
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
  this.drawWall();
  //////
  console.log(this.tank);
  ///

}
//////////////////////////////////////////////////////////////////
////////////////DRAWING///////////////////////
////////////////////////////////////////
Game.prototype.paintLives=function(tank){
document.getElementById("lifes1").innerHTML =this.tank.lifes;

};
Game.prototype.drawTank1=function(){
    var player1Pos = '[data-row=' + this.tank.position[0].row + '][data-col=' + this.tank.position[0].column + ']';
    $(player1Pos).addClass('player1');

};
Game.prototype.drawTank2=function(){

  var player2Pos = '[data-row=' + this.tank.position[1].row + '][data-col=' + this.tank.position[1].column + ']';
  $(player2Pos).addClass('player2');
};
Game.prototype.generateWall=function(size,row,column,direction,wallType){
  this.size=size;
  this.row=row;
  this.column=column;
  this.direction=direction;
  while(size>0){
    console.log(row,column,size);
  var wallLong = '[data-row=' + row+ '][data-col=' + column+ ']';
  $(wallLong).addClass(wallType);
    switch (direction) {
      case 'left':
        row++;
        break;
      case 'right':
        row++;
        break;
      case 'up':
        column--;
        break;
      case 'down':
        column++;
        break;
      default:
        console.log("WALLE WHAT???");
    }
  size--;
 }
};
Game.prototype.aleatoryNumber=function(min, max){
  return Math.floor(Math.random() * (max - min + 2)) + min;
};
Game.prototype.aleatoryWord=function(){
    var options=["left","right","up","down"];
      var randomize=Math.round(Math.random()*3);
      return options[randomize];
};

Game.prototype.drawWall=function(){
  //Evitar los puntos del SPAWN de los tankes
  //EVITAR ROW 0,1
  //generateWall=function(size,row,column,direction,wallType)
  //BOUNDARY WALLS:

  this.generateWall(22,0,20,"up","wall");//boundary up
  this.generateWall(21,0,0,"right","wall");//boundary left
  this.generateWall(16,0,19,"right","wall");//boundary right
  this.generateWall(21,13,0,"down","wall");//boundary down

      //KEEP THIS PUTS WALLS AROUND THE border
  // this.generateWall(22,0,20,"up","wall");//boundary up
  // this.generateWall(21,0,0,"right","wall");//boundary left
  // this.generateWall(16,0,19,"right","wall");//boundary right
  // this.generateWall(21,13,0,"down","wall");//boundary down

  ////CREADOR DE ELEMENTOS
  var i=0;
  while(i<5){
    //Normal Wals
  this.generateWall(this.aleatoryNumber(2,6),this.aleatoryNumber(1,20),this.aleatoryNumber(1,23),this.aleatoryWord(),"wall");
  this.generateWall(this.aleatoryNumber(4,7),this.aleatoryNumber(1,20),this.aleatoryNumber(1,21),this.aleatoryWord(),"wall");
  //this.generateWall(this.aleatoryNumber(2,4),this.aleatoryNumber(7,14),this.aleatoryNumber(4,14),this.aleatoryWord(),"wall");

  //bush
  this.generateWall(this.aleatoryNumber(0,1),this.aleatoryNumber(1,14),this.aleatoryNumber(4,23),this.aleatoryWord(),"bush");
  this.generateWall(this.aleatoryNumber(0,1),this.aleatoryNumber(1,14),this.aleatoryNumber(4,23),this.aleatoryWord(),"bush");

  //BreakableWALS wallBreak
  this.generateWall(this.aleatoryNumber(4,7),this.aleatoryNumber(3,10),this.aleatoryNumber(2,19),this.aleatoryWord(),"wallBreak");
  this.generateWall(this.aleatoryNumber(1,3),this.aleatoryNumber(2,14),this.aleatoryNumber(2,19),this.aleatoryWord(),"wallBreak");
        i++;}
};


Game.prototype.drawBulletT1=function(bullet){
    console.log(bullet.range);
    var game = this;
    function moveBullet() {
      var Bullet1player1Pos = '[data-row=' + bullet.position[0].row+ '][data-col=' + bullet.position[0].column + ']';
      game.clearBullets(Bullet1player1Pos); //1/2 DO NOT CHANGE ORDER

      bullet.moveForward();//2/2
      Bullet1player1Pos = '[data-row=' + bullet.position[0].row+ '][data-col=' + bullet.position[0].column + ']';
      $(Bullet1player1Pos).addClass('bullet1');
      }

    //$('.bullet1').removeClass('bullet1');
    //moveBullet();//Hace que salte una casilla el disparo
    var interval = setInterval(function () {
      if (bullet.range > 0) {
////////////////IMPACT  WALL////////////////////////
        if (game.checkNextFwd(bullet.direction,bullet.position[0],"wall")){
          console.log("obstacle AHEAD");
          Bullet1player1Pos = '[data-row=' + bullet.position[0].row+ '][data-col=' + bullet.position[0].column + ']';
          game.soundPlayer("biggun1");
          game.clearBullets(Bullet1player1Pos);
          clearInterval(interval);
        }
////////////////IMPACT Breakble WALL////////////////////////
          else if (game.checkNextFwd(bullet.direction,bullet.position[0],"wallBreak")) {
            console.log("Break the DAMN Wall");
            Bullet1player1Pos = '[data-row=' + bullet.position[0].row+ '][data-col=' + bullet.position[0].column + ']';
            game.killFwd(bullet.position[0],bullet.direction,"wallBreak");
            game.soundPlayer("lightExplosion");
            game.clearBullets(Bullet1player1Pos);
            game.tank.getSomePoints(100);
            clearInterval(interval);
          }
////////////////IMPACTA CONTRA JUGADOR 2////////////////////////
          else if (game.checkNextFwd(bullet.direction,bullet.position[0],"player2")) {
            console.log("DIE YOU RED DUMPSTER!");
            Bullet1player1Pos = '[data-row=' + bullet.position[0].row+ '][data-col=' + bullet.position[0].column + ']';
            //LLAMAR A FUNCION QUE RESTA VIDA, EN CASO QUE NO TENGA VIDAS ACABA LA PARTIDA
            //If result = True inicia muerte // Else Continua
            game.clearBullets(Bullet1player1Pos);
            if(game.tank2.recieveShoot()){////////END GAME HERE
              game.tank.getSomePoints(1500);
              game.soundPlayer("bigExplosion");
              game.killFwd(bullet.position[0],bullet.direction,"player2");
              alert("BLUE PLAYER 1 WINS!! LONG LIVE THE BLUE`S" + "LIFES LEFT :"+game.tank.lifes+" That gives Some points too man!, in total you have got :"+game.tank.points);
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
        Bullet1player1Pos = '[data-row=' + bullet.position[0].row+ '][data-col=' + bullet.position[0].column + ']';
        game.clearBullets(Bullet1player1Pos);
        clearInterval(interval);
      }
    }, 100  );

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
Game.prototype.clearTank1Global=function(){
  $('.player2').removeClass('left');
  $('.player2').removeClass('right');
  $('.player2').removeClass('down');
  $('.player2').removeClass('up');
  $('.player2').removeClass('player2');
};

Game.prototype.clearTank2=function(){
$('.player2').removeClass('player2');
};

Game.prototype.clearBullets=function(bullet){
  $(bullet).removeClass('bullet1');
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
Game.prototype.controlsTank1=function(){
  //var $player1 = $('.player1');
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
        switch (this.tank.direction) {
          case "left":
          if (this.checkNextFwd(this.tank.direction,this.tank.position[0],"wall")||
          this.checkNextFwd(this.tank.direction,this.tank.position[0],"wallBreak")||
          this.checkNextFwd(this.tank.direction,this.tank.position[0],"player2")) {
            console.log("obstacle AHEAD");
            }
            else{
            this.clearTank1Global();
            this.drawDotBlue();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('left');

          }
            break;
          case "right":
          if (this.checkNextFwd(this.tank.direction,this.tank.position[0],"wall")||
          this.checkNextFwd(this.tank.direction,this.tank.position[0],"wallBreak")||
          this.checkNextFwd(this.tank.direction,this.tank.position[0],"player2")) {
            console.log("obstacle AHEAD");
            }
            else{
            this.clearTank1Global();
            this.drawDotBlue();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('right');
          }
            break;
          case "up":
          if (this.checkNextFwd(this.tank.direction,this.tank.position[0],"wall")||
          this.checkNextFwd(this.tank.direction,this.tank.position[0],"wallBreak")||
          this.checkNextFwd(this.tank.direction,this.tank.position[0],"player2")) {
            console.log("obstacle AHEAD");
            }
            else{
            this.clearTank1Global();
            this.drawDotBlue();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('up');
          }
            break;
          case "down":
          if (this.checkNextFwd(this.tank.direction,this.tank.position[0],"wall")||
          this.checkNextFwd(this.tank.direction,this.tank.position[0],"wallBreak")||
          this.checkNextFwd(this.tank.direction,this.tank.position[0],"player2")) {
            console.log("obstacle AHEAD");
            }
            else{
            this.clearTank1Global();
            this.drawDotBlue();
            this.tank.moveForward(0);
            this.drawTank1();
            $('.player1').addClass('down');
            break;
          }
        }
        break;
      case 40: // arrow down
        //this.tank.moveBack(0); checkNextBkw
        switch (this.tank.direction) {
          case "left":
          if (this.checkNextBkw(this.tank.direction,this.tank.position[0],"wall")||
          this.checkNextBkw(this.tank.direction,this.tank.position[0],"wallBreak")||
          this.checkNextBkw(this.tank.direction,this.tank.position[0],"player2")) {
            console.log("obstacle AHEAD");
            }
            else{
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('left');
              }
            break;
          case "right":
          if (this.checkNextBkw(this.tank.direction,this.tank.position[0],"wall")||
          this.checkNextBkw(this.tank.direction,this.tank.position[0],"wallBreak")||
          this.checkNextBkw(this.tank.direction,this.tank.position[0],"player2")) {
            console.log("obstacle AHEAD");
            }else{
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('right');
          }
            break;
          case "up":
          if (this.checkNextBkw(this.tank.direction,this.tank.position[0],"wall")||
          this.checkNextBkw(this.tank.direction,this.tank.position[0],"wallBreak")||
          this.checkNextBkw(this.tank.direction,this.tank.position[0],"player2")) {
            console.log("obstacle AHEAD");
            }else{
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('up');
          }
            break;
          case "down":
          if (this.checkNextBkw(this.tank.direction,this.tank.position[0],"wall")||
          this.checkNextBkw(this.tank.direction,this.tank.position[0],"wallBreak")||
          this.checkNextBkw(this.tank.direction,this.tank.position[0],"player2")) {
            console.log("obstacle AHEAD");
            }else{
            this.clearTank1Global();
            this.tank.moveBack(0);
            this.drawTank1();
            $('.player1').addClass('down');
          }
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
        // var audio = new Audio('./sounds/gunshot1.mp3');
        // audio.play();
          this.soundPlayer("shoot");
          switch (this.tank.direction) {
            case "left":
              var bulletLeft=this.tank.pressFire(this.tank.direction);
              bulletLeft.position[0].column +=1;
              this.drawBulletT1(bulletLeft);

              break;
            case "right":
              var bulletRight=this.tank.pressFire(this.tank.direction);
              bulletRight.position[0].column -=1;
              //var timerSet= setInterval(this.drawBulletT1(bulletRight), 10000);
              this.drawBulletT1(bulletRight);

              break;
            case "up":
              var bulletUp=this.tank.pressFire(this.tank.direction);
              bulletUp.position[0].row +=1;
              this.drawBulletT1(bulletUp);
              break;
            case "down":

              var bulletDown=this.tank.pressFire(this.tank.direction);
              bulletDown.position[0].row -=1;
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

document.getElementById("points1").innerHTML =this.tank.points;
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
var game2 =new Game({
  rows: 14,
  columns: 20,
tank:new Tank(),
});
