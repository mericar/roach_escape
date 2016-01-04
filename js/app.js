
// Enemy object
// Purpose: template for creating Enemy objects
//Param: x,y: screen-xcoord, screen y-coord
var Enemy = function(x, y, pace) {
    // instance vars:
    this.sprite = 'images/enemy-bug.png';
    this.pace = pace;
    this.x = x;
    this.y = y;
};

// Purpose: Updates the enemy instance's position
// Param: dt is a time delta
Enemy.prototype.update = function(dt) {
    if (this.x <= 560){
        this.x += this.pace * dt;
    }else{
        this.x = 0;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Instantiation of Enemies
var allEnemies = [];

var e1 = new Enemy(75,200,250);
var e2 = new Enemy(300,100,300);
var e3 = new Enemy(175,50,350);
var e4 = new Enemy(250,250,250);
var e5 = new Enemy(400,200,200);
var e6 = new Enemy(0,100,400);

//Populates array of enemies:
allEnemies.push(e1,e3,e4,e6);



// The Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.pace = 30;
    this.x = 200;
    this.y = 410;
};

Player.prototype.resetLocation = function(){
    player.x = 200;
    player.y = 410;
}

//Instantiate player variable
var player = new Player();

// Purpose: Updates the player game state
// Param: dt is a time delta
Player.prototype.update = function() {
    // Check collisions by looking at the
    (function (){
        for (var e = 0; e < allEnemies.length; e++) {
            if (allEnemies[e].x <= (player.x + 30) && (allEnemies[e].x + 30) >= player.x && 
                allEnemies[e].y <= (player.y + 30) && (allEnemies[e].y + 30) >= player.y)
            {
                player.resetLocation();
                window.alert("    :(    Try Again Champ!!!    ");
            }
        }
        if (player.y <= -10){
            window.alert("    :D    Way To Go Boss!!!    ");
            player.resetLocation();
        }
    })();
};


//Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Player.prototype.handleInput = function(keycode) {
    switch(keycode) {
        case 'left':
            if(player.x - player.pace >= 0){
                player.x -=  player.pace;
            }else{
                player.x = 0;
            }
            console.log(player.x + ' , ' + player.y);
            break;

        case 'up':
            if(player.y - player.pace >= -10){
                player.y -=  player.pace;
            }else{
                player.y = -10;
            }
            console.log(player.x + ' , ' + player.y);
            break;

        case 'right':
            if(player.x + player.pace <= 420){
                player.x +=  player.pace;
            }else{
                player.x = 420;
            }
            console.log(player.x + ' , ' + player.y);
            break;

        case 'down':
            if (player.y + player.pace <=410){
                player.y += player.pace;
            }else{
                player.y = 410;
            }
            console.log(player.x + ' , ' + player.y);
            break;
    } 
};


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
