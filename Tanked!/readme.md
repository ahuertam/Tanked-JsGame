<h1>IRONHACK WEEK 3 PROYECT</h1>
<p>The project is called Tanked! . Its a 2 player game on a fixed layout
where both players are a tank that can move up,dow,left and right and shoot bullets from their cannons.</p>

<h2>LOGIC PART First Iteration</h2>
<h3> In the first iteration there should be two Tanks players that can move around an empty scenario and that can shoot bullets from their position/h3>
<h2>TANK PLAYER CONSTRUCTOR<h2>
<p>We will have a Tank constructor that would have predetermined functions:
  <ul>
    <li> It Should Move Forward and BackWards</li>
    <li>It should be able to turn left and right so it can move itself 360 </li>
    <li> It should have the ability to fire the cannon , which will create an independent object called BULLET </li>
    <li> It should react to collisions  </li>
    <li>It should be able to have at least another TANK player  </li>
  </ul>
</p>
<h2>BULLET CONSTRUCTOR<h2>
<p>The First Type of Bullet would be created:
  <ul>
    <li> It Should Move  just Forward </li>
    <li> It should react to collisions  </li>
  </ul>
</p>
<h2> MAP</h2>
<p>On the first Iteration the map will just be an array in which the Tanks should Move around,there will be no Boundarys ( as a round planet) </p>
<p>***************************************************</p>
<h2>LOGIC PART Second Iteration</h2>
<h3> In the Second iteration Object Walls should be added, destruction of elements ( BUllet and Tanks should be added), also a limit of bullets fired by the tanks  that should wait a given timer to be able to fire again, also powerup item defined/h3>
<h2>TANK PLAYER CONSTRUCTOR<h2>
<p>We will  add:
  <ul>
    <li> </li>
    <li>Should be destroyed in case it collisions with a bullet  </li>
    <li>Should get benefits from a powerup but restarted one it dies  </li>
    <li> Cannot get passed a wall ( boundary) </li>
    <li>Iwhen it dies it should have a number of lifes that should be affected </li>
  </ul>
</p>
<h2>BULLET CONSTRUCTOR<h2>
<p>The First Type of Bullet would be defined:
  <ul>
    <li>Should be destroyed in case it collisions with a bullet </li>
    <li>Should be destroyed in case it collisions with a <strong>WALL </li>
    <li>Should be destroyed in case it collisions with a <strong>TANK </li>
  </ul>
</p>
<h2> MAP</h2>
<p>On the first Iteration the map will just be an array in which the Tanks should Move around,there will be no Boundarys ( as a round planet) </p>
<h2> ITEM<h2>
<p>Generic type of ITEM:
  <ul>
    <li>Should be generated on a predefined spot after sometime has passed</li>
    <li>Should be destroyed in case it collisions with a <strong>TANK </li>
    <li>if distroyed it should be able to Launch the generate event again.</li>
  </ul>
<p>***************************************************</p>
<p>***************************************************</p>
<h2>1st Visual </h2>
<h3>On this phase the layout should have an HTML an CSS that can draw all the Logic explained above.
<h2>GAME CONSTRUCTOR</h2>
<h3> This JS will define where the Tanks will be painted, where to generate and paint de Wall and more necesarily events for the game.</h3>
<p>We will add:
  <ul>
    <li> a DrawTank function </li>
    <li>  a generate Wall function</li>
    <li> A Draw Wall</li>
    <li> FFunctions that clear the objects of the game</li>
    <li> An update Function that updates the current state of the game  </li>
    <li>a control function that listens to key events</li>
    <li> an start function of the game</li>
    <li> a stop function for the game </li>

  </ul>
</p>
