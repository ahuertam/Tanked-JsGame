/*******************************************
TANKS
*******************************************/

function Tank(){
  this.direction = "up";
  this.lifes=3;
  this.points=0;
  this.position=[
    {row:1,column:1}, // ITS AN ARRAY OF OBJECTS SO WE CAN STORE MORE THAN ONE POSITION ( EX WE WANT TO STORE A RESPAWN POSITION)
    {row:1,column:18}
  ];

  }
Tank.prototype.canAdvance=function(position){//Comprueba si puede avanzar
  return true;
};
Tank.prototype.canGoBack=function(position){//Comprueba si puede avanzar
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
    switch (this.direction) {
      case "up"://Move upper Row
      if (this.canAdvance(this.position[i])){
        console.log("moveForward UP ");
          initialPos.row -=1;
        }else{console.log("Cant move Forward");}
        break;
      case "down"://move down Row
      if (this.canAdvance(this.position[i])){
        console.log("moveForward down ");
        initialPos.row +=1;
        }else{console.log("Cant move Forward");}
        break;
      case "left":
      if (this.canAdvance(this.position[i])){
        console.log("moveForward Left ");//move less column
        initialPos.column -=1;
        }else{console.log("Cant move Forward");}
        break;
      case "right":
      if (this.canAdvance(this.position[i])){
        console.log("moveForward Right ");//move right  column
        initialPos.column +=1;
        }else{console.log("Cant move Forward");}
        break;
  }//swich
  console.log(initialPos.row+" "+initialPos.column);
};
Tank.prototype.moveBack=function(i){
  var initialPos=this.position[i];
    switch (this.direction) {
      case "up"://Move upper Row
      if (this.canGoBack(this.position[i])){
        console.log("Going BackWards while facing up ");
          initialPos.row +=1;
          }else{console.log("Cant move Forward");}
        break;
      case "down"://move down Row
      if (this.canGoBack(this.position[i])){
        console.log("Going BackWards while facing down ");
        initialPos.row -=1;
        }else{console.log("Cant move Forward");}
        break;
      case "left":
      if (this.canGoBack(this.position[i])){
        console.log("Going BackWards while facing  Left ");//move less column
        initialPos.column +=1;
        }else{console.log("Cant move Forward");}
        break;
      case "right":
      if (this.canGoBack(this.position[i])){
        console.log("Going BackWards while facing   Right ");//move right  column
        initialPos.column -=1;
        }else{console.log("Cant move Forward");}
        break;
    }//swich

  console.log(initialPos.row+" "+initialPos.column);

};

Tank.prototype.pressFire=function(direction){
  //Generate a new bullet with the direction of the tank
  console.log("FIRING A BULLET direction: "+direction);
  var tank_position = JSON.parse(JSON.stringify(this.position));//THIS ELIMINATES THE OBJECT REFERENCE
  console.log('this position',this.position);
  var bullet =new Bullet(tank_position,direction);
  //setTimeout(function () {bullet.moveForward();},1000);
  bullet.moveForward();
  return(bullet);
};
//return this.position[player].row === object.row && this.position[i].column === object.column;
Tank.prototype.pressFireT2=function(direction){
  //Generate a new bullet with the direction of the tank
  console.log("FIRING A BULLET direction: "+direction);
  var tank2_position = JSON.parse(JSON.stringify(this.position));//THIS ELIMINATES THE OBJECT REFERENCE
  console.log('this position',this.position);
  var bullet2 =new Bullet(tank2_position,direction);
  //setTimeout(function () {bullet.moveForward();},1000);
  bullet2.moveForwardT2();
  return(bullet2);
};

Tank.prototype.collidesWith=function(player,object){
  return this.postion[player].some(function (element){
    return element.row === object.row &&
      element.column === object.column;
    });
};
Tank.prototype.recieveShoot=function(){
  this.lifes-=1;
  if (this.lifes>0){
    console.log("LIFES LEFT: "+this.lifes);
    return false; //aun no muere
  }
  else{console.log("YOU HAVE LOST");
    return true;}
};
Tank.prototype.getSomePoints=function(number){
  this.points+=number;
  console.log(number+" Points Scored! You have: "+this.points);
};

Tank.prototype.getsPowerUp=function(){

};
////////////////////////////////////////////////
///////////////SANDBOX PART/////////////////////
//////////////////////////////////////
//tank =new Tank();
//tank2=new Tank();
