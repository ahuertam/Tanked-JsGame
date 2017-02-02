/* The Bullet For the IA

*/

function BulletIA(position,direction){
  this.direction=direction;
  this.type="basic";
  this.position=position;
  this.range=0;
  this.checkType(this.type);
}

BulletIA.prototype.basicType=function(){

};

BulletIA.prototype.checkType=function(){
  if (this.type==="basic"){
    this.range=2;
  }

};
BulletIA.prototype.moveForward=function(){
  //Range of the shoot
    var direction=this.direction;
    console.log("Bullet Moving forward to direction :"+direction);
    var bulletPos=this.position[0];
    console.log(bulletPos);
    switch (direction) {
      case "up"://Move upper Row
        console.log("Bullet Going UP ");
        //we should check wether it has collided with something
          bulletPos.row -=1;
        break;
      case "down"://move down Row
        console.log("Bullet Going down ");
        bulletPos.row +=1;
        break;
      case "left":
        console.log("Bullet Going Left ");//move less column
        bulletPos.column -=1;
        break;
      case "right":
        console.log("Bullet Going Right ");//move right  column
        bulletPos.column +=1;
        //var timerR=setInterval(function(){bulletPos.column +=1;} ,4000);
        break;
    }
    //setTimeout((this.moveForward), 400);
    console.log(bulletPos);
  //DESTROY BULLET IF IT DID NOT COLLIDE
};
