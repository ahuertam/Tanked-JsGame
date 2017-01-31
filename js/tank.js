/*******************************************
TANKS
*******************************************/

function Tank(){
  this.direction = "up";
  this.lifes=3;
  this.position=[
    {row:0,column:1}, // ITS AN ARRAY OF OBJECTS SO WE CAN STORE MORE THAN ONE POSITION ( EX WE WANT TO STORE A RESPAWN POSITION)
    {row:6,column:6}
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
Tank.prototype.moveForward=function(i){
  var initialPos=this.position[i];
  if (this.canAdvance()){
    switch (this.direction) {
      case "up"://Move upper Row
        console.log("moveForward UP ");
          initialPos.row -=1;
        break;
      case "down"://move down Row
        console.log("moveForward down ");
        initialPos.row +=1;
        break;
      case "left":
        console.log("moveForward Left ");//move less column
        initialPos.column -=1;
        break;
      case "right":
        console.log("moveForward Right ");//move right  column
        initialPos.column +=1;
        break;
    }
  }else{console.log("Cant move Forward");}
  console.log(initialPos.row+" "+initialPos.column);
};
Tank.prototype.moveBack=function(i){
  var initialPos=this.position[i];
  if (this.canGoBack()){
    switch (this.direction) {
      case "up"://Move upper Row
        console.log("Going BackWards while facing up ");
          initialPos.row +=1;
        break;
      case "down"://move down Row
        console.log("Going BackWards while facing down ");
        initialPos.row -=1;
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
var tank_position = JSON.parse(JSON.stringify(this.position));//THIS ELIMINATES THE OBJECT REFERENCE
console.log('this position',this.position);
var bullet =new Bullet(tank_position,this.direction);
bullet.moveForward();
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
//tank =new Tank();
//tank2=new Tank();
