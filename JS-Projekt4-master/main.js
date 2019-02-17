function l(cont) {
    console.log(cont)
}

let canvas = {
    start() {
        this.src = document.querySelector("#gameBox");
        this.ctx = this.src.getContext('2d');
    },
    clear() {
        this.ctx.clearRect(0, 0, this.src.width, this.src.height);
    }
}

canvas.start();

class Ball {
    //create ball
    constructor(x, y, radius, color, isControlable) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vX = 0;
        this.vY = 0;
        this.time = Date.now();
        if (isControlable)
            window.addEventListener('deviceorientation', this.handleOrientation);
    }

    //drawing ball on canvas
    fill() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fill();
        canvas.ctx.stroke();
    }

    //set speed of ball movment
    setV(vX, vY) {
        this.vX = 0;
        this.vY = 0;
        this.vX = vX;
        this.vY = vY;
    }

    //update x and y position
    move() {
        this.x += this.vX;
        this.y += this.vY;
    }

    //execute function
    update() {
        this.move()
        this.boxCollision()
        this.fill()
    }

    //check if ball is collding w with bounds of canvas
    boxCollision() {
        if ((this.x - this.radius) <= 0)
            this.x = 0 + this.radius;
        if ((this.x + this.radius) >= canvas.src.width)
            this.x = canvas.src.width - this.radius;
        if ((this.y - this.radius) <= 0)
            this.y = this.radius;
        if ((this.y + this.radius) >= canvas.src.height)
            this.y = canvas.src.height - this.radius;
    }

    //checks if ball is colliding witch each other
    checkBallCollision(ball) {
        let a = this.x - ball.x
        let b = this.y - ball.y
        let c = Math.sqrt(a * a + b * b)
        let x = this.radius + ball.radius

        if (c <= x)
            return true;
        else
            return false;

    }


    //get gamma and beta 
    handleOrientation(e) {
        let x = e.gamma;
        let y = e.beta;

        ball.setV(x / 3, y / 3);


    }
}

let ball = new Ball(canvas.src.height / 2, canvas.src.width / 2, 20, 'blue', true);

let ball2 = new Ball(60, 60, 30, 'red', false);
let ball3 = new Ball(260, 80, 30, 'red', false);
let ball4 = new Ball(50, 250, 30, 'red', false);
let ball5 = new Ball(440, 200, 30, 'red', false);
let ball6 = new Ball(250, 320, 30, 'red', false);
let ball7 = new Ball(170, 280, 30, 'red', false);
let ball8 = new Ball(160, 200, 30, 'red', false);
let ball9 = new Ball(330, 290, 30, 'red', false);
let ball10 = new Ball(400, 400, 30, 'red', false);
let ball11 = new Ball(100, 400, 30, 'red', false);
let ball12 = new Ball(380, 100, 30, 'red', false);

let finishedBall = new Ball(240, 440, 40, 'green', false);

//list with red holes
let balls = [];
balls.push(ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9, ball10, ball11, ball12, finishedBall);


//update all game (moving, collision, drawing)
function update() {
    canvas.clear();
    //loop for execute collision check with holes and finish
    for (i = 0; i < balls.length; i++) {
        if (ball.checkBallCollision(balls[i])) {
            if (balls[i].color == "red") {
                clearInterval(interval);
                alert("You Lost!!!" + "\n" + "Your Time:  " + (Date.now() - ball.time) / 1000)
            }
            else if (balls[i].color == "green") {
                clearInterval(interval);
                alert("You Won!!!" + "\n" + "Your Time:  " + (Date.now() - ball.time) / 1000)
            }
        }
    }
    ball.update();
    //drawing elements from balls list on canvas
    balls.forEach(element => {
        element.update();
    });

}

let interval = setInterval(function () { update() }, 1000 / 60);
















