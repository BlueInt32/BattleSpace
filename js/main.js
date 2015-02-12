"use strict";
function Game(){

	var self = this;
	
	this.startGame = function(){
		self.keyboard.keyDownHandle();
		self.keyboard.keyupHandle();
		requestAnimationFrame(self.gameLoop);
	}
	
	this.gameLoop = function(){
		console.log(self);
		requestAnimationFrame(self.gameLoop);   
		self.spaceShip.stepMove();
		self.spaceShip.spaceShipShoot();
		self.board.bgAnimation();
		self.asteroidsManager.stepMove();
		self.ennemiesManager.shootStepMove();
		self.ennemiesManager.stepMove();
	};
	
	this.spaceShip = {
		htmlElement : document.getElementById("spaceShip"),
		fireZone: document.getElementById("shootzone"),
		speed : 13,
		shoots : [],
		shootIndex : 1,
		isShooting : false,
		shootItem : null,
		shootBox: null,
		shootActivation : false,
		stepMove :function() {
			if (self.keyboard.press) {
				if (self.keyboard.left && this.htmlElement.offsetLeft - 15 > 0) {
					this.htmlElement.style.left = this.htmlElement.offsetLeft - speed;
				}

				if (self.keyboard.right && this.htmlElement.offsetLeft + 143 < windowWith) {
					this.htmlElement.style.left = this.htmlElement.offsetLeft + speed;
				}

				if (self.keyboard.up && this.htmlElement.offsetTop - 15 > 0) {
					this.htmlElement.style.top = this.htmlElement.offsetTop - speed;
				} 

				if (self.keyboard.down && this.htmlElement.offsetTop + 151 < window.innerHeight) {
					this.htmlElement.style.top = this.htmlElement.offsetTop + speed;
				}
			}
		},
		
		spaceShipShoot : function() {
			if (this.isShooting) {
				var li = document.createElement("li");
				li.setAttribute("class", "shoot");
				li.setAttribute("id", this.shootIndex);
				li.style.top = spaceShip.offsetTop;
				li.style.left = spaceShip.offsetLeft + 50;
				this.fireZone.appendChild(li);
				this.shoots.push(shootIndex);
				this.shootIndex++;
				
				for( var a = 0; a < shoots.length;a++ ) {
					this.shootItem = document.getElementById(shoots[a]);
					this.shootItem.style.top = this.shootItem.offsetTop - 30 + "px";

					if ( this.shootItem.offsetTop < -1) {
						fireZone.removeChild(this.shootItem);
						shoots.splice(a, 1);
					}

					for( var b = 0; b < asteroids.length; b++) {
						asteroidItem = document.getElementById(asteroids[b]);
						asteroidBox = {x: asteroidItem.offsetTop, y: asteroidItem.offsetLeft, width: 106, height: 106};
						shootBox = {x: this.shootItem.offsetTop, y: this.shootItem.offsetLeft, width: 5, height: 20};
						collisionHandle(shootBox, asteroidBox, asteroidItem);
						asteroidItem = null;
					}
				}
			}
		}
	};
		
	this.board = {
		htmlElement_1 : document.getElementById("bg_1"),
		htmlElement_2 : document.getElementById("bg_2"),
		windowWith : window.innerWidth,
		windowHeight : window.innerHeight,
		bgAnimation : function() {
			this.htmlElement_2.style.top = this.htmlElement_2.offsetTop + 1 + "px";
			this.htmlElement_1.style.top = this.htmlElement_1.offsetTop + 1 + "px";

			if (this.htmlElement_1.offsetTop === 0) {
				this.htmlElement_2.style.top = -this.windowHeight;
			} else if (this.htmlElement_1.offsetTop === this.windowHeight) {
				this.htmlElement_1.style.top = -this.windowHeight;
			}
		}
	};
	
	this.keyboard = {
		press : false,
		up : false,
		down : false,
		left : false,
		right : false,
		keyDownHandle : function() {
			document.addEventListener("keydown", function(event) {
				switch (event.keyCode) {
					case 37: self.keyboard.left = true; break;
					case 39: self.keyboard.right = true; break;
					case 38: self.keyboard.up = true; break;
					case 40: self.keyboard.down = true; break;
					case 32: self.spaceShip.isShooting = true; break;
				}

				press = true;
				event.preventDefault();
			});
		},
		keyupHandle: function () {
			document.addEventListener("keyup", function(event) {
				switch (event.keyCode) {
					case 37: self.keyboard.left = false; break;
					case 39: self.keyboard.right = false; break;
					case 38: self.keyboard.up = false; break;
					case 40: self.keyboard.down = false; break;
					case 32: self.spaceShip.isShooting = false; break;
				}
			});
		}
	};
	
	this.ennemiesManager = {
		enemies : [],
		enemiesShoots : [],
		stepMove : function() {
			for(var e = 0; e < self.ennemiesManager.enemies.length; e++) {
				
				enemyItem = document.getElementById(self.ennemiesManager.enemies[e]);
				distance = spaceShip.offsetLeft - enemyItem.offsetLeft;
				
				if(distance > 0)
				{
					enemyItem.style.left = (enemyItem.offsetLeft + 2) + "px";
				}
				else
				{
					enemyItem.style.left = (enemyItem.offsetLeft - 2) + "px";
				}

				enemyItem.style.top = enemyItem.offsetTop + 2 + "px";

				if (enemyItem.offsetTop > windowHeight) {
					enemyZone.removeChild(enemyItem);
					self.ennemiesManager.enemies.splice(e, 1);
				}
			}
		},
		shootStepMove : function(){
			for( var t = 0; t < enemiesShoots.length;t++ ) {
				enemyShootItem = document.getElementById(enemiesShoots[t]);
				enemyShootItem.style.top =  enemyShootItem.offsetTop + 3 + "px";
				if ( enemyShootItem.offsetTop > windowHeight) {
					enemyShootZone.removeChild(enemyShootItem);
					enemiesShoots.splice(t, 1);
				}
			}
		}
	};
	
	this.asteroidsManager = {
		asteroids : [],
		stepMove : function() {
			for(var b = 0; b < asteroids.length; b++) {
				asteroidItem = document.getElementById(asteroids[b]);
				asteroidItem.style.top = asteroidItem.offsetTop + 5 + "px";

				if (asteroidItem.offsetTop > windowHeight) {
					asteroidZone.removeChild(asteroidItem);
					asteroids.splice(b, 1);
				}

				asteroidBox = {x: asteroidItem.offsetTop, y: asteroidItem.offsetLeft, width: 106, height: 169};
				spaceShipBox = {x: spaceShip.offsetTop, y: spaceShip.offsetLeft, width: 128, height: 128};
				collisionHandle(spaceShipBox, asteroidBox, asteroidItem);
			}
		}
	};
	this.wtf = {
		i : 1,
		e : 1,
		c : 1,
		d : 1,
		x : 1,
		asteroidZone : document.getElementById("asteroidzone"),
		enemyZone : document.getElementById("enemyzone"),
		enemyShootZone : document.getElementById("enemies_shoot_zone"),
	};
	
	this.factories = {
		initFactories : function(){
			setInterval(this.asteroidGeneration, 2000);
			setInterval(this.enemyGeneration, 3000);
			setInterval(this.enemyShootGeneration, 1000);
		},
		enemyShootGeneration : function() {
			for(var w = 0; w < enemies.length; w++) {
				enemyItem = document.getElementById(enemies[w]);
				li = document.createElement("li");
				li.setAttribute("class", "enemy_shoot");
				li.setAttribute("id", "enemiesShoot_" + x);
				li.style.top = enemyItem.offsetTop + 66;
				li.style.left = enemyItem.offsetLeft + 32;
				enemyShootZone.appendChild(li);
				enemiesShoots.push("enemiesShoot_" + x);
				x++;
			}
		},
		asteroidGeneration : function() {
			li = document.createElement("li");
			astPosition = Math.floor((Math.random() * windowWith) + 1);
			li.setAttribute("class", "asteroid");
			li.setAttribute("id", "asteroid_"+c);
			li.style.left = astPosition;
			asteroidZone.appendChild(li);
			asteroids.push("asteroid_"+c);
			c++;
		},
		enemyGeneration : function() {
			en = document.createElement("li");
			enemyPosition = Math.floor((Math.random() * windowWith) + 1);
			en.setAttribute("class", "enemy");
			en.setAttribute("id", "enemy_"+d);
			en.style.left = enemyPosition;
			enemyZone.appendChild(en);
			enemies.push("enemy_"+d);
			d++; 
		}
	};
	
	this.collisionHandle = function(box1, box2, itemToDestroy) {
		if (box1.x < box2.x + box2.width && box1.x + box1.width > box2.x && box1.y < box2.y + box2.height && box1.height + box1.y > box2.y) {
			itemToDestroy.style.background = explosion;
		}
	};
};

var game = new Game();
game.startGame();


// var spaceShip = document.getElementById("spaceShip"),
    // bgOne = document.getElementById("bg_1"),
    // bgTwo = document.getElementById("bg_2"),
    // windowWith = window.innerWidth,
    // windowHeight = window.innerHeight,
    // press = false,
    // up = false,
    // down = false,
    // left = false,
    // right = false,
    // shoot = false,
    // speed = 13,
    // i = 1,
    // e = 1,
    // c = 1,
    // d = 1,
    // x = 1,
    // shoots = [],
    // enemiesShoots = [],
    // asteroids = [],
    // enemies = [],
    // fireZone = document.getElementById("shootzone"),
    // asteroidZone = document.getElementById("asteroidzone"),
    // enemyZone = document.getElementById("enemyzone"),
    // enemyShootZone = document.getElementById("enemies_shoot_zone"),
    // shootItem,
    // asteroidItem,
    // enemyItem,
    // enemyShootItem,
    // asteroidBox,
    // spaceShipBox,
    // shootBox,
    // shootActivation = false,
    // enemiesShootActivation = false,
    // li = null,
    // en = null,
    // astPosition = 0,
    // enemyPosition = 0,
    // enemyDirection = 0,
    // distance = 0,
    // explosion = "url('img/explosion.gif') no-repeat";


