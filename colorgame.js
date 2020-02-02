var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var displayColor = document.getElementById("colorDisplay");
var messageDislay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i=0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");		
			this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
	for(var i=0; i<squares.length; i++){
		//add click listenrs to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked color
			var clickedColor = this.style.backgroundColor;
			//compare clicked-color to pickedColor
			if(clickedColor === pickedColor){
				changeColors(clickedColor);
				h1.style.background = pickedColor;
				messageDislay.textContent = "Correct"
				resetButton.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDislay.textContent = "Try Again"
			}
		});
	}
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numOfSquares);
	//pick a random color from colors color-array
	pickedColor = pickColor();
	//change displayColor to match pickedColor
	displayColor.textContent =	pickedColor;
	resetButton.textContent = "New Colors";
	messageDislay.textContent = "";
	//change colors on squares
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});

function changeColors(color){
	//loop through all colors
	for(var i=0; i<squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var randomNumber = Math.floor(Math.random() * colors.length);
	return colors[randomNumber];
}

function generateRandomColors(numOfColors){
	//make an array
	var arr = [];
	//add numOfColors-random colors to the array
	for(var i=0; i<numOfColors; i++){
		arr.push(randomColor());
	}
	//return the color-array
	return arr;
}

function randomColor(){
	//pick a "red"ish color from 0 to 255
	var r = Math.floor(Math.random() * 256);
	//pick a "geen"ish color from 0 to 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue"ish color from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}