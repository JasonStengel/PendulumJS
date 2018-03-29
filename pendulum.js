var canvas = ctx = false;
var frameRate = 1/40;
var frameDelay = frameRate * 1000;

/*used to change the arc and the velocity of the pendulum*/
var arcSlider = document.getElementById("arc");
var velocitySlider = document.getElementById('velocity');
var arcNumber = document.getElementById("arcNum");
var velocityNumber = document.getElementById("velocityNum");
var arc = (arcSlider.value / 100);
var velocity = velocitySlider.value;

var pendulum = {mass: 100, length:300, theta: (Math.PI/2) - arc , omega: 0, alpha:0, J:0};
//listener for arc slider
arcSlider.addEventListener("change", function(){
  arcNumber.innerHTML = "arc: " + (arcSlider.value / 100);
  arc = arcSlider.value / 100;
  init();
});
//listener for velocity slider
velocitySlider.addEventListener("change", function(){
  velocityNumber.innerHTML = "velocity: " + velocitySlider.value;
  velocity = velocitySlider.value;
  init();
});

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
//function to call looped draw function
function init() {
  pendulum.mass = 100;
  pendulum.theta = (Math.PI/2) - arc;
  pendulum.omega = 0;
  pendulum.alpha = 0;
  pendulum.J = pendulum.mass * pendulum.length * pendulum.length / velocity;
  
  lastTime = new Date();
  requestAnimFrame(draw);  
}

//loop for pendulum
	  function draw(){
      
	  var width = 1000, height = 600;
	  var len = 150;
    var timeMs = (new Date()).getTime();
    var deltaT = (timeMs - lastTime.getTime()) / 1000; 
      
    canvas = document.getElementById("myCanvas");
	  let ctx = canvas.getContext("2d");
    
    
    if (deltaT > 0.050)
    {
        deltaT = 0.050;
    }
    deltaT = 0.01;
      
      
    /* Calculate current position from last frame's position*/
    pendulum.theta += pendulum.omega * deltaT + (.5 * pendulum.alpha * deltaT * deltaT );  
      
    /* calculates force */
    var T = pendulum.mass * 9.81 * Math.cos(pendulum.theta) * pendulum.length;  
      
    /* Current acceleration */
    var alpha = T / pendulum.J;   
      
    // Calculate current velocity from last frame's velocity and
    pendulum.omega += .5 * (alpha + pendulum.alpha) * deltaT;   
      
    /* Update acceleration */
    pendulum.alpha = alpha;    
      
    //sets the current x and y for the pendulum
    var bobX = width/2 + pendulum.length * Math.cos(pendulum.theta);
    var bobY = pendulum.length * Math.sin(pendulum.theta);
    
    //clears the canvas
	  ctx.clearRect(0,0,width,height)
    
    //canvas line
    ctx.strokeStyle = "green";
	  ctx.beginPath();
	  ctx.moveTo(width/2,0);
	  ctx.lineTo(bobX,bobY);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "red";
    
    //canvas pendulum
    ctx.beginPath();
	  ctx.arc(bobX,bobY,16,0 ,Math.PI * 2 , false);
	  ctx.fill();
    ctx.closePath();
    
   //callback for the recursive function
	 requestAnimationFrame(draw);  
  }
	init();