// kibo variable for controlling keyboard input:
var kibo = new Kibo();


// Enemy object
// Purpose: template for creating Enemy objects
//Param: x,y: screen-xcoord, screen y-coord
var Enemy = function(x, y) {
    // instance vars:
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Purpose: Updates the enemy instance's position
// Param: dt is a time delta
Enemy.prototype.update = function(dt) {
    this.x = this.x * dt;
    this.y = this.y * dt;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// The Player class

// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
};

// Purpose: Updates the player instance's position
// Param: dt is a time delta
Player.prototype.update = function(dt) {
    this.x = this.x * dt;
    this.y = this.y * dt;
};

//Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Player.prototype.handleInput = function(keycode) {
    switch(keycode) {
        case 37:
        k.up(['up', 'w'], function() {
            player.y = player.y - 1;
        });
        break;

        case 38:
        k.up(['down', 's'], function() {
            player.y = player.y + 1;
        });
        break;

        case 39:
        k.up(['left', 'a'], function() {
            player.x = player.x - 1;
        });
        break;

        case 40:
        k.up(['right', 'd'], function() {
            player.x = player.x + 1;
        });
        break;
    } 
};


//Instantiation of Enemies and Player

//Number of enemies in play
var numEnemies = 6;
//Array of Enemies available for play
var allEnemies = [];

//Purpose: Populate allEnemies Array
// Anon. Func for populating array "allEnemies"
(function (numEnemies, allEnemies){
    for(var e = 0; e < numEnemies; e++){
        allEnemies.push(new Enemy(0,0));
    }
})();

var player = new Player(200,406);





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
