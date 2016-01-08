
//GemType
var gemPic = {
    'green':'images/Gem-Green.png',
    'blue':'images/Gem-Blue.png',
    'orange':'images/Gem-Orange.png',
};


var gemPoints = {
    'green': 100,
    'blue': 500,
    'orange': 1000,
};

function getGemPoints(gemtype){
    return gemPoints.gemtype;
};
console.log(getGemPoints('green'));



//Gem object
var Gem = function(x, y, pace, gemtype){
    switch(gemtype){

        case 'green':
        this.sprite = gemPic.green;
        this.type = 'green'
        break;

        case 'blue':
        this.sprite = gemPic.blue;
        this.type = 'blue';
        break;

        case 'orange':
        this.sprite = gemPic.orange;
        this.type = 'orange';
        break;
    }
    this.pace = pace;
    this.x = x;
    this.y = y;
    this.claimed = false;
}

// Purpose: updates location of Gem
// Param: dt is a time delta
Gem.prototype.update = function(dt) {
    if (this.x <= 1100){
        this.x += this.pace * dt;
    }else{
        this.x = 0;
    }
};

// Draw the Gem on the screen if gem not claimed by player
Gem.prototype.render = function() {
    if (!this.claimed){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};



// Enemy object
// Purpose: template for creating Enemy objects
//Param: x,y: screen-xcoord, screen y-coord
var Enemy = function(x, y, pace) {
    this.sprite = 'images/enemy-bug.png';
    this.pace = pace;
    this.x = x;
    this.y = y;
};

// Purpose: Updates the enemy instance's position
// Param: dt is a time delta
Enemy.prototype.update = function(dt) {
    if (this.x <= 1100){
        this.x += this.pace * dt;
    }else{
        this.x = 0;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//Instantiation of Gems
var allGems = [];
var g1 = new Gem(40,50,990,'orange');
var g2 = new Gem(400,200,675,'blue');
var g3 = new Gem(800,125,800,'green');
//Populates array of Gems
allGems.push(g1,g2,g3);


//Instantiation of Enemies
var allEnemies = [];

var e1 = new Enemy(75,200,500);
var e2 = new Enemy(300,135,350);
var e3 = new Enemy(175,50,150);
var e4 = new Enemy(250,250,250);
var e5 = new Enemy(0,100,420);

//Populates array of enemies
allEnemies.push(e1,e2,e3,e4,e5);


// The Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.pace = 30;
    this.x = 450;
    this.y = 410;
    this.score = 0;
};

Player.prototype.resetLocation = function(){
    player.x = 450;
    player.y = 410;
}

//Instantiate player variable
var player = new Player();

// Purpose: Updates the player game state
// Param: dt is a time delta
Player.prototype.update = function() {
    for (var e = 0; e < allEnemies.length; e++) {
            if (allEnemies[e].x <= (player.x + 30) && (allEnemies[e].x + 30) >= player.x && 
                allEnemies[e].y <= (player.y + 30) && (allEnemies[e].y + 30) >= player.y)
            {
                window.alert("    :(    Try Again Champ!!!    ");
                player.resetLocation();
            }
        }
        //if collision with a gem occurs, the gem is claimed and the rendering funcs will take note.
        for (var g = 0; g < allGems.length; g++) {
            if (allGems[g].x <= (player.x + 30) && (allGems[g].x + 30) >= player.x && 
                allGems[g].y <= (player.y + 30) && (allGems[g].y + 30) >= player.y)
            {
                allGems[g].claimed = true;
                var points = getGemPoints(allGems[g].type);
                player.score++;
                player.updateScore;
                console.log(player.score);
            }
        }        

        if (player.y <= -10 && player.score > 10 ){
            window.alert("    :D    Way To Go Boss!!!    ");
            player.resetLocation();
        }
};

//Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles the input for the game
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
            if(player.x + player.pace <= 990){
                player.x +=  player.pace;
            }else{
                player.x = 990;
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
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
