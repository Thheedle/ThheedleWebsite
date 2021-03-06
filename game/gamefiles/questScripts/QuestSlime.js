class QuestSlime extends QuestMonster {
	constructor(startX, startY) {
		super(startX, startY);

		this.health = 3;
		this.maxHealth = 3;

		this.currentSprite = '<span style="color: transparent; text-shadow: 0 0 4px lime">O</span>';

		QuestSlime.slimeArray.push(this);
	}

	move() {
		if (player.onScreen) {
			var dist = taxi(this.x, this.y, player.x, player.y);
			if (dist <= 5 && dist > 0) {
				this.runAway();
			} else {
				this.wander();
			}
		}
	}

	runAway() {
		console.log("trying to escape");
		var xDelta = Math.sign(this.x - player.x);
		var yDelta = Math.sign(this.y - player.y);

		var plannedX = this.x + xDelta;
		var plannedY = this.y + yDelta;

		if (noCollisions(plannedX, plannedY)) {
			this.x = plannedX;
			this.y = plannedY;
		}
	}

	wander() {
		var moveChance = getRandomInt(2);
		if (moveChance <= 0) {
			var xDelta = getRandomInt(3) - 1;
			var yDelta = getRandomInt(3) - 1;

			var plannedX = this.x + xDelta;
			var plannedY = this.y + yDelta;

			if (noCollisions(plannedX, plannedY)) {
				this.x = plannedX;
				this.y = plannedY;
			}
		}
	}

	fireball() {
		this.dealDamage(2);
		console.log("we got " + this.health + " left");
	}

	remove() {
		for (var i = 0; i < QuestSlime.slimeArray.length; i++) {
			if (QuestSlime.slimeArray[i] == this) {
				QuestSlime.slimeArray.splice(i, 1);
				break;
			}
		}
	}
}

QuestSlime.slimeArray = new Array();

QuestSlime.moveSlimes = function() {
	for (var i = 0; i < QuestSlime.slimeArray.length; i++) {
		QuestSlime.slimeArray[i].move();
	}
	updateCamera();
};