//////////////////////////////////////////////////////////////////
////////////////Weather System///////////////////////
//////////////////////////////////////
function Weather(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.cloud=options.cloud;
  function gridSky(){
      for (var rowIndex = 0; rowIndex < options.rows; rowIndex++){
        for (var columnIndex = 0; columnIndex < options.columns; columnIndex++){
          $('.board').append($('<div>')
            .addClass('sky')
            .attr('data-row-weather', rowIndex)
            .attr('data-col-weather', columnIndex)
          );
        }
    }
  }//End of function
  gridSky();
  this.drawCloud();
}
Weather.prototype.generateCloud=function(size,row,column,direction,cloudType){
  this.size=size;
  this.row=row;
  this.column=column;
  this.direction=direction;
  while(size>0){
    console.log(row,column,size);
  var cloudLong = '[data-row-weather=' + row+ '][data-col-weather=' + column+ ']';
  $(cloudLong).addClass(cloudType);
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
        console.log(" WHAT???");
    }
  size--;
 }
};
Weather.prototype.aleatoryNumber=function(min, max){
  return Math.floor(Math.random() * (max - min + 2)) + min;
};
Weather.prototype.aleatoryWord=function(){
    var options=["left","right","up","down"];
      var randomize=Math.round(Math.random()*3);
      return options[randomize];
};

Weather.prototype.drawCloud=function(){
  //EVITAR ROW 0,1
  ////CREADOR DE ELEMENTOS
  var i=0;
  while(i<5){
    //Normal Clouds
  this.generateCloud(this.aleatoryNumber(2,6),this.aleatoryNumber(1,20),this.aleatoryNumber(1,23),this.aleatoryWord(),"cloud");
        i++;}
};

var weather= new Weather({
  rows: 14,
  columns: 20,
  cloud:4
});
