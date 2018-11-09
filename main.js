//FARRIS
//Everett //(DAEDA)
//10//28//2018
//WIP

var canvas			= document.getElementById("canvas");
var ctx				= canvas.getContext('2d');
var backgroundImage = new Image();
var music           = document.getElementById("music");
//canvas.width		= document.body.clientWidth;
//canvas.height		= document.body.clientHeight;
canvas.style.width	= canvas.width + "px";
canvas.style.height	= canvas.height + "px";
input.offset = new Vector2(GetLeft(canvas), GetTop(canvas));
backgroundImage.src = "maze.bmp";
//music.play();

var player = new Player();
var count = 0;
var previousX = 0;
var previousY = 0;

var floor = new Array();
floor.push(new Rectangle(20, 510, 2, 236));
floor.push(new Rectangle(298, 510, 2, 236));

floor.push(new Rectangle(20, 510, 280, 2));
floor.push(new Rectangle(172, 746, 128, 2));
floor.push(new Rectangle(20, 746, 96, 2));

for (var i = 0; i < floor.length; i++)
	floor[i].color = new Color(255, 0, 255, 0.5);

var Update = setInterval(function()
{
	previousX = player.rect.x;
	previousY = player.rect.y;

	player.Update();

	
	var collided = false;
	for (var i = 0; i < floor.length; i++)
	{
		if (floor[i].Intersects(player.rect))
		{
			count++;
			console.log(count);
			player.SetPosition(previousX, previousY);
			player.jumpAvailable = true;
			collided = true;
			break;
		}
	}
	
/*	var collided = false;
	for (var i = 0; i < floor.length; i++)
	{
		if (floor[i].Intersects(player.rect))
		{
			player.SetPosition(null, floor[i].y - player.rect.height);
			player.jumpAvailable = true;
			collided = true;
			break;
		}
	}*/
	
	if (!collided)
		player.jumpAvailable = false;
}, 1);

(function(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	window.requestAnimationFrame = requestAnimationFrame;
})();
var requestId = 0;

function Draw()
{	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.drawImage(backgroundImage, 0, 0);
	
	for (var i = 0; i < floor.length; i++)
		floor[i].Draw(ctx);
	
	player.Draw(ctx);
	
	requestId = window.requestAnimationFrame(Draw);
}

function Start()
{
	requestId = window.requestAnimationFrame(Draw);
}

function Stop()
{
	if (requestId)
		window.cancelAnimationFrame(requestId);
	
	requestId = 0;
}

Start();