window.addEventListener("keydown", keyPressed);

var wMap = new QuestMap(worldMapText);
var camera = new QuestCamera(20, 20, 40, 20, 8, 4);
var player = new QuestPlayer(camera.x + (camera.width / 2), camera.y + (camera.height / 2));

var gamePanel = document.getElementById("gamepanel");

var debugEnabled = true;

if (debugEnabled) {
	debug();
}

function debug() {
	document.getElementById("debug").style.visibility = "visible";
	document.getElementById("fireballButton").setAttribute("onclick", "setProne()");
}

function noCollisions(globalX, globalY) {
	return camera.noCollisions(globalX, globalY);
}

function setProne() {
	player.setProne();
}

function outOfBounds(x, y) {
	return camera.outOfBounds(x, y);
}

function keyPressed(e) {
	player.handleDirection(e.keyCode);
}

function updateFireballs() {
	QuestFireball.updateFireballs();
}

function drawFireballs() {
	for (var i = 0; i < QuestFireball.fireballArray.length; i++) {
		if (camera.onScreen(QuestFireball.fireballArray[i].x, QuestFireball.fireballArray[i].y)) {
			camera.writeScreen(QuestFireball.fireballArray[i].x, QuestFireball.fireballArray[i].y, '<span style="background-color: red"> </span>');
		}
	}
}

function updateNecessary() {
	return QuestFireball.updateNecessary();
}

function updateCamera() {
	updateMapData();
	drawEntities();
	if (player.onScreen) {
		camera.writeScreen(player.x, player.y, player.getSprite());
	}
	gamePanel.innerHTML = camera.getView();
}

function moveCamera(xDelta, yDelta) {
	camera.move(xDelta, yDelta);
}

function updateMapData() {
	wMap.populateCamera(camera.screen, camera.width, camera.height, camera.x, camera.y);
}

function drawEntities() {
	drawFireballs();
}

updateCamera();

setInterval(function() {
	//playerY++;
	updateCamera();
}, 1000);

setInterval(function() {
	//playerY++;
	player.toggleBold();
	updateCamera();
}, 500);

setInterval(function() {
	if (updateNecessary()) {
		updateFireballs();
		updateCamera();
	}
}, 100);