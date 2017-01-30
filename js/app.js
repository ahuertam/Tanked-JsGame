//////////////////FUNCTIONS

///
function Map(obj)
{
  this.rows    = obj.rows;
  this.columns = obj.columns;
  function gridBackground(){
      for (var rowIndex = 0; rowIndex < obj.rows; rowIndex++){
        for (var columnIndex = 0; columnIndex < obj.columns; columnIndex++){
          $('.container').append($('<div>')
            .attr('data-row', rowIndex)
            .attr('data-col', columnIndex)
          );
        }
    }
  }//End of function
  gridBackground();
}

/////////////////////////////////////////CONSTRUCTORS

function Game(obj){
  this.tank= obj.tank;

  this.drawTank1();
  this.start();
  this.update();
  this.controlsTank1();

  //////
  console.log(obj);
  ///

}
Game.prototype.drawTank1=function(){
    var player1InitialPos = '[data-row=' + this.tank.position[0].row + '][data-col=' + this.tank.position[0].column + ']';
    $(player1InitialPos).addClass('player1');
};
Game.prototype.drawTank2=function(){

};
Game.prototype.generateWall=function(){

};
Game.prototype.drawWall=function(){
};

//////////////
Game.prototype.clearTank1=function(){
$('.player1').removeClass('player1');
};
Game.prototype.clearTank2=function(){

};
Game.prototype.clearBullets=function(){

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
        this.tank.moveForward();
        break;
      case 40: // arrow down
        this.tank.moveBack();
        break;
      case 37: // arrow left
        this.tank.turnLeft();
        break;
      case 39: // arrow right
        this.tank.turnRight();
        break;
      case 32: // spacebar
        this.tank.pressFire();
        break;
    }
  }.bind(this));

};
Game.prototype.controlsTank2=function(){

};
Game.prototype.start=function(){
setInterval(this.update.bind(this), 100);
};
Game.prototype.update=function(){
  this.clearTank1();
  this.drawTank1();
};
Game.prototype.stop=function(){

};////////
///////////////////////////////////
var map = new Map({
  rows: 40,
  columns: 30,
});
var game =new Game({
tank:new Tank(),
//tank2:new Tank()
});
