/*******************************************
TANKS
*******************************************/

function Tank(options){
  this.direction = "right";
  this.lifes=3;
  this.position=[
    {row:5,column:5}
  ];

  }
Tank.prototype.canAdvance=function(){//Comprueba si puede avanzar
  return true;
};
Tank.prototype.canGoBack=function(){//Comprueba si puede avanzar
  return true;
};
Tank.prototype.turnLeft=function(){
  switch (this.direction) {
    case "up":
      console.log("Turning Left and Going LEFT");
      this.direction = 'left';
      break;
    case "left":
      console.log("Turning Left and Going DOWN");
      this.direction = 'down';
      break;
    case "down":
      console.log("Turning Left and Going RIGHT");
      this.direction = 'right';
      break;
    case "right":
      console.log("Turning Left and Going UP");
      this.direction = 'up';
      break;
  }
};
Tank.prototype.turnRight=function(){
  switch (this.direction) {
    case "up":
      console.log("Turning Right and Going Right");
      this.direction = 'right';
      break;
    case "left":
      console.log("Turning Right and Going UP");
      this.direction = 'up';
      break;
    case "down":
      console.log("Turning Right and Going left");
      this.direction = 'left';
      break;
    case "right":
      console.log("Turning Right and Going Down");
      this.direction = 'down';
      break;
  }
};
Tank.prototype.moveForward=function(){
  var initialPos=this.position[0];
  if (tank.canAdvance){
    switch (this.direction) {
      case "up"://Move upper Row
        console.log("Going UP ");
          initialPos.row +=1;
        break;
      case "down"://move down Row
        console.log("Going down ");
        initialPos.row -=1;
        break;
      case "left":
        console.log("Going Left ");//move less column
        initialPos.column -=1;
        break;
      case "right":
        console.log("Going Right ");//move right  column
        initialPos.column +=1;
        break;
    }
  }else{console.log("Cant move Forward");}
  console.log(initialPos.row+" "+initialPos.column);
};
Tank.prototype.moveBack=function(){
  var initialPos=this.position[0];
  if (tank.canGoBack){
    switch (this.direction) {
      case "up"://Move upper Row
        console.log("Going BackWards while facing up ");
          initialPos.row -=1;
        break;
      case "down"://move down Row
        console.log("Going BackWards while facing down ");
        initialPos.row +=1;
        break;
      case "left":
        console.log("Going BackWards while facing  Left ");//move less column
        initialPos.column +=1;
        break;
      case "right":
        console.log("Going BackWards while facing   Right ");//move right  column
        initialPos.column -=1;
        break;
    }
  }else{console.log("Cant move Forward");}
  console.log(initialPos.row+" "+initialPos.column);

};
Tank.prototype.stopTank=function(){//Stops the tank

};

Tank.prototype.pressFire=function(){
//Generate a new bullet with the direction of the tank
console.log("FIRING A BULLET direction: "+this.direction);
var bullet =new Bullet(this);
bullet.moveForward(this.direction);
};
Tank.prototype.collidesWith=function(){

};
Tank.prototype.recieveShoot=function(){

};
Tank.prototype.getsPowerUp=function(){

};
////////////////////////////////////////////////
///////////////SANDBOX PART/////////////////////
//////////////////////////////////////
tank =new Tank();
tank2=new Tank();
