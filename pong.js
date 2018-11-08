/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Audo files.

//Make sure audio is loaded before it plays.
var pingHasLoaded = false;
function pingIsLoaded() {
    pingHasLoaded = true;
}

var ping = new Audio("sounds/ping.wav");
//Checks to make sure the audio can play. Works the same for the other audio.
ping.oncanplaythrough = pingIsLoaded;

var pongHasLoaded = false;
function pongIsLoaded() {
    pongHasLoaded = true;
}

var pong = new Audio("sounds/pong.wav");
pong.oncanplaythrough = pongIsLoaded;

var bustHasLoaded = false;
function bustIsLoaded() {
    bustHasLoaded = true;
}

var bust = new Audio("sounds/bust.wav");
bust.oncanplaythrough = bustIsLoaded;

//ball coordinates
var xcord = 500;
var ycord = 250;

//paddle speed.
var speed = 3.9;

//paddle sizes
var paddleW = 25;
var paddleL = 100;

//first paddle coordinates
var rec1x = 10;
var rec1y = 180;

//second paddle coordinates
var rec2x = 965;
var rec2y = 180;

//Ball directions
var dx = 4;
var dy = (Math.random() * 3) - 1.5;

//Ball size
var radius = 15;

var timerId;
var frameCounter = 0;

//score
var player1Score = 0;
var player2Score = 0;

function startAni() {
		timerId = setInterval(draw, 16);
}

function stopAni() {
		clearTimeout(timerId);
}

function keyPressed(event) {
		e = event;
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		
		//If up arrow is pressed move up.
		if((event.keyCode === 38) && (rec2y >= 10)){
				rec2y -= speed;
		}
		
		//if down arrow is pressed move down.
		if((event.keyCode === 40) && (rec2y <= canvas.height - (paddleL + 10))) {
				rec2y += speed;
		}
		
		//If W is pressed move up.
		if((event.keyCode === 87) && (rec1y >= 10)){
				rec1y -= speed;
		}
		
		//If S is pressed move down.
		if((event.keyCode === 83) && (rec1y <= canvas.height - (paddleL + 10))){
				rec1y += speed;
		}
}

function draw() {

		var canvas = document.getElementById("myCanvas");
		//Get 2d from the context library
		var context = canvas.getContext("2d");
		//Clearing the canvas.
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.fillStyle = "#FFFFF";
		context.rect(rec1x, rec1y, paddleW, paddleL);
		context.fill();

		context.fillStyle = "#FFFFF";
		context.rect(rec2x, rec2y, paddleW, paddleL);
		context.fill();

		xcord += dx;
		ycord += dy;
		
		//if the ball is at the left side edge, give player 1 a point.
		if ((xcord <= 0 + radius)) {
				dx = -dx;
				player2Score++;
			if(pingHasLoaded){
				ping.load();
        ping.play();
			}
			
			if(player2Score < 5){
				stopAni();
			  setTimeout(startAni, 1000);
				
				/* Reset the ball and paddle positions, delay it for 1 second 
					 (1000 milliseconds) */
				setTimeout(
						function(){ 
						xcord = 500; 
						ycord = 250; 
						dy = (Math.random() * 3 - 1.5);
						rec1x = 10;
						rec1y = 180;
						rec2x = 965;
						rec2y = 180;
						}, 
						1000);
						
			}
		}
		
		//if the ball is at the right side edge, give player 2 a point.
		if((xcord >= canvas.width - radius)){
				dx = -dx;
				player1Score++;
				
			if(pingHasLoaded){
				ping.load();
        ping.play();
			}
			
			if(player1Score < 5){
				stopAni();
			  setTimeout(startAni, 1000);
				
				/* Reset the ball and paddle positions, delay it for 1 second 
					 (1000 milliseconds) */
				setTimeout(
								
						function(){ 
						xcord = 500; 
						ycord = 250; 
						dy = (Math.random() * 3 - 1.5);
						rec1x = 10;
						rec1y = 180;
						rec2x = 965;
						rec2y = 180;
						}, 
						1000);
			}
		}

		if ((ycord <= 0 + radius) || (ycord >= canvas.height - radius)) {
				dy = -dy;
				
		}
		
		//If the ball is not at the top of the box, move it up otherwise move down
		if (ycord <= canvas.height - radius) {
	  		context.fillStyle = "#FFFFFF";
			  context.beginPath();
				context.arc(xcord, ycord, radius, 0, Math.PI * 2, true);
				context.closePath();
				context.fill();
		} else {
				context.fillStyle = "#FFFFFF";
				context.beginPath();
				context.arc(xcord, -ycord, radius, 0, Math.PI * 2, true);
				context.closePath();
				context.fill();
		}
		
		//score keeping
		
		/*If the ball is in the same x cooridinate as the paddle and the balls y 
			cooridnate minus the paddles y coordinate is between 0 and the paddle
		  length, hit back ball. Add the diameter of the ball to the hit marker to
		  make the hit point the entire diameter of the ball minus 5 pixels to
			adjust for hits that graze the very tip of the ball. */
		if( ( (xcord <= (0 + 35 + radius)) && ((ycord - rec1y ) >= (0 - ((radius * 2) - 5))) 
						&& ( (ycord - rec1y) <= (100 + ((radius * 2) - 15))) ) 
						||
						(xcord >= (canvas.width - 35 - radius)) && ((ycord - rec2y) >= 
						(0 - ((radius * 2) - 15))) && ( (ycord - rec2y) <= 
						(100 + ((radius * 2) - 5)))
				){
			
				dx = -dx;
				
				if(pongHasLoaded){
				pong.load();
        pong.play();
			}
		}
		
		//The player scoreboards.
		var player1 = document.getElementById("player1").innerHTML = player1Score;
		var player2 = document.getElementById("player2").innerHTML = player2Score;
		
		//Automatically draw the net down the middle.
		var net = 25;

		while (net < 480) {
				context.fillStyle = "#FFFFF";
				context.rect(498, net, 10, 10);
				context.fill();
				net += 20;
		}
		
		/* If one player has a score of 5, they win. */
		if(player2Score == 5){
				var winner = document.getElementById("winner2").style["visibility"] = 
								"visible";
				stopAni();
				if(bustHasLoaded){
						bust.load();
						bust.play();
				}
		}
		
		if(player1Score == 5){
			  var winner = document.getElementById("winner1").style["visibility"] =
								"visible";
				stopAni();
				if(bustHasLoaded){
						bust.load();
						bust.play();
				}
		}
		
		// Debugging code.
		/* if (xcord >= canvas.width - radius) {
				//stopAni();
				frameCounter++;
				console.log(frameCounter);
		} */


}