/* The Bullet
There would be at least 4 types of bullet being the most basic
one the one that moves straighforward.
*/

function Bullet(position,direction){
  this.direction=direction;
  this.type="basic";
  this.position=position;
}

Bullet.prototype.basicType=function(){

};

Bullet.prototype.checkType=function(){

};
Bullet.prototype.moveForward=function(){
  var range=0;//Range of the shoot
  while (range < 10){
    var direction=this.direction;
    console.log("Bullet Moving forward to direction :"+direction);
    var bulletPos=this.position[0];
    console.log(bulletPos);
    switch (direction) {
      case "up"://Move upper Row
        console.log("Bullet Going UP ");
        //we should check wether it has collided with something
          bulletPos.row +=2;
        break;
      case "down"://move down Row
        console.log("Bullet Going down ");
        bulletPos.row -=2;
        break;
      case "left":
        console.log("Bullet Going Left ");//move less column
        bulletPos.column -=2;
        break;
      case "right":
        console.log("Bullet Going Right ");//move right  column
        bulletPos.column +=2;
        break;
    }
    console.log(bulletPos);
    range++;
  }
  //DESTROY BULLET IF IT DID NOT COLLIDE
};
Bullet.prototype.collidesWith=function(){

};
