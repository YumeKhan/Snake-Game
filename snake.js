var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var snakeSize = 10;

var delay = 100;

var snake = [
	{ x: 100, y: 100 },
	{ x: 90, y: 100 },
	{ x: 80, y: 100 },
	{ x: 70, y: 100 },
	{ x: 60, y: 100 }
];

var dx = snakeSize;
var dy = 0;

var food = { x: 0, y: 0 };

var score = 0;

function createFood() {
	food.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
	food.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;

	// Verifique se a comida não está em cima da cobra 
	for (var i = 0; i < snake.length; i++) {
		if (food.x == snake[i].x && food.y == snake[i].y) {
			createFood();
			break;
		}
	}
}

createFood();

function drawSnake() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < snake.length; i++) {
		ctx.fillStyle = "green";
		ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
	}

	ctx.fillStyle = "red";
	ctx.fillRect(food.x, food.y, snakeSize, snakeSize);


	var headX = snake[0].x + dx;
	var headY = snake[0].y + dy;

	if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
		clearInterval(game);
		alert("Game Over!");
		return;
	}

	for (var i = 1; i < snake.length; i++) {
		if (headX == snake[i].x && headY == snake[i].y) {
			clearInterval(game);
			alert("Game Over!");
			return;
		}
	}


	if (headX == food.x && headY == food.y) {
		score++;
		createFood();
	} else {
		snake.pop();
	}

	var newHead = { x: headX, y: headY };
	snake.unshift(newHead);

	document.getElementById("score").innerHTML = "Score: " + score;
}


document.addEventListener("keydown", function (event) {
	if (event.keyCode == 37 && dx != snakeSize) { // esquerda 
		dx = -snakeSize;
		dy = 0;
	} else if (event.keyCode == 38 && dy != snakeSize) { // cima 
		dx = 0;
		dy = -snakeSize;
	} else if (event.keyCode == 39 && dx != -snakeSize) { // direita 
		dx = snakeSize;
		dy = 0;
	} else if (event.keyCode == 40 && dy != -snakeSize) { // baixo 
		dx = 0;
		dy = snakeSize;
	}
});

var game = setInterval(drawSnake, delay); 
