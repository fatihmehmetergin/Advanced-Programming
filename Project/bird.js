const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var flappy;
var myObstacles = [];
var background, foreground;

var bird = new Image();
var backgroundImg = new Image();
var pipeTop = new Image();
var pipeBottom = new Image();
var foregroundImg = new Image();

bird.src = "sources/images/bird.png";
backgroundImg.src = "sources/images/background.png";
foregroundImg.src = "sources/images/foreground.png";
pipeTop.src = "sources/images/pipeTop.png";
pipeBottom.src = "sources/images/pipeBottom.png";

canvas.addEventListener("touchstart", function(evt){
    console.log("touchstart listener");
    accelerate(-0.2);
});

canvas.addEventListener("touchend", function(evt){
    console.log("touchend listener");
    accelerate(0.05);
});

canvas.addEventListener("mousedown", function(evt){
    console.log("mousedown listener");
    accelerate(-0.2);
});

canvas.addEventListener("mouseup", function(evt){
    console.log("mouseup listener");
    accelerate(0.05);

});

function startGame() {
    myGameArea.setArea();
    myGameArea.start();
}

var myGameArea = {
    start : function() {
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 15);
    },
    setArea : function () {
        background = new component(canvas.width, canvas.height, backgroundImg, 0, 0, "background");
        foreground = new component(canvas.width, foregroundImg.height, foregroundImg, 0, canvas.height-foregroundImg.height, "foreground");
        flappy = new component(34, 26, bird, 50, 150, "bird");
        flappy.gravity = 0.05;
    },
    clear : function() {
        context.fillStyle = "#70c5ce";
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function component(width, height, img, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.image = img;
    this.update = function() {
        if (this.type == "background"){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.type == "bird"){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.type == "pipeTop"){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.type == "pipeBottom"){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (this.type == "foreground"){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }

    this.hitBottom = function() {
        var rockbottom = canvas.height - foreground.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }

    // TODO: Burayı ekle
    this.hitTop = function() {

    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var gap, h, maxYpos, x, bottomYPos, topYPos;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (flappy.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        maxYpos = -150;
        gap = 85;
        h = 400;
        x = 320;
        topYPos = maxYpos * (Math.random() + 1);
        bottomYPos = topYPos + h + gap;

        myObstacles.push(new component(50, 400, pipeTop, x, topYPos, "pipeTop"));
        myObstacles.push(new component(50, 400, pipeBottom, x, bottomYPos, "pipeBottom"));
    }
    background.update();
    foreground.update();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    flappy.newPos();
    flappy.update();
    foreground.update();

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    flappy.gravity = n;
}
