const canvas = document.getElementById("bird");
const context = canvas.getContext("2d");

let frames = 0; // Animasyon için helper
const degree = Math.PI/180;

const sprite = new Image();
sprite.src = "sources/images/sprite.png";

const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

const bird = {
    animation : [
        {sX: 276, sY : 112}, // 1. source
        {sX: 276, sY : 139}, // 2. source
        {sX: 276, sY : 164}, // 3. source
        {sX: 276, sY : 139}  // 4. source
    ],
    x : canvas.width/2,
    y : 200,
    w : 34,
    h : 26,

    radius : 12,

    frame : 0,

    gravity : 0.25,
    jump : 4.6,
    speed : 0,
    rotation : 0,

    draw : function(){
        let bird = this.animation[this.frame];

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);

        context.restore();
    },

    update: function(){
        // Oyun hazır olduğunda kuş animate olmalı
        this.period = state.current == state.getReady ? 10 : 5;
        // Her bir periyotta frame sayısı 1 artıyor
        this.frame += frames%this.period == 0 ? 1 : 0;
        // Frame sayısı 0'dan 4'e gidiyor sonra tekrar 0 oluyor
        this.frame = this.frame%this.animation.length;

    }
}

function draw() {
  context.fillStyle = "#70c5ce";
  context.fillRect(0, 0, canvas.width, canvas.height);

  bird.draw();
}

function update(){
    // Kuş sürekli sprite değiştiriyor
    bird.update();
}

function loop() {
  update();
  draw();
  frames++;
  requestAnimationFrame(loop);
}
console.log("Canvas Width: " + canvas.width);
console.log("Canvas height: " + canvas.height);
console.log(degree);
loop();
