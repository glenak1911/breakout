/* Global canvas Variables */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;

/* Global ball variables */
var dx = 2;
var dy = -2;
var ballRadius = 5;

/* Global paddle variables */
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

/* Global brick variables */
var bricks = [];
var brickRowCount = 3;
var brickColumnCount = 5
var brickWidth = 50;
var brickHeight = 10;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 5;
var r;
var c;
var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

/* Global score variables */
var score = 0;

/*Main function that calls the draw method every 10ms */
function initialize(){
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.addEventListener("mousemove", mouseMoveHandler, false);
	buildBricks();

	setInterval(draw, 10);
}

/*Draws the actual ball and fills it with a blue color*/
function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}
/*This function clears the canvas, and draws at the specified x and y location,  and determines collision with the wall*/
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetection();
	drawBricks();

	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
		dx = -dx;
	}

	if(y + dy < ballRadius){
		dy = -dy;
	}else if(y + dy > canvas.height-ballRadius){
		if(x > paddleX && x < paddleX + paddleWidth){
			dy=-dy;
		}else{
			alert("Game Over");
			window.location.reload(true);
		}
	}

	if(rightPressed && paddleX < canvas.width-paddleWidth){
		paddleX+=7;
	}

	if(leftPressed && paddleX>0){
		paddleX-=7;
	}

	x+=dx;
	y+=dy;
}

/* Draws paddle */
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}

/* Handles the opperation if the left or right arrow is pressed */
function keyDownHandler(e){
	if(e.keyCode == 39){
		console.log("Left");
		rightPressed = true;
	}
	else if(e.keyCode == 37){
		console.log("Right");
		leftPressed = true;
	}
}

/* Handles the operation if the left or right arrow is released */
function keyUpHandler(e){
	if(e.keyCode == 39){
		rightPressed = false;
	}
	else if(e.keyCode == 37){
		leftPressed = false;
	}
}

/* Initializes the bricks by placing them in an array and assigns them a status of 1(visible) */
function buildBricks(){
	for(c = 0;c<brickColumnCount;c++){
		bricks[c] = [];
		for(r = 0;r<brickRowCount;r++){
			bricks[c][r] = {x:0, y:0, status:1};
		}
	}
}

/* Draws bricks on the screen by looping through the array and drawing the bricks with a status of 1 */
function drawBricks(){
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status ==1 ){
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

/* Detects collision and sets status to 0 */
function collisionDetection(){
	for(c = 0;c < brickColumnCount; c++){
		for(r = 0;r < brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status==1){
			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
								b.status=0;
								score++;
								if(score == brickColumnCount*brickRowCount){
									alert("You Win!");
									window.location.reload(true);
								}
            }
					}
		}
	}
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText ("Score: "+score,8,20);
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
