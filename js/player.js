class Player {
  constructor(ctx, platform) {
    this.ctx = ctx;
    this.platform = platform;

    this.x = 50;
    this.y = 360;

    this.vx = 0;
    this.vy = 0;

    this.w = 50;
    this.h = 75;

    this.y0 = this.ctx.canvas.height * 0.75;

    this.g = 0.4;

    this.tick = 0;

    this.img = new Image();
    this.img.frames = 3;
    this.img.frameIndex = 0;
    this.img.src = "img/mario.png";

    this.bullets = [];
    this.score = new Score(ctx);

    this.audioJump = new Audio("audio/jump.wav");
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames,
      0,
      this.img.width / 3,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.score.draw();
  }

  move() {
    this.vy += this.g;
    this.x += this.vx;
    this.y += this.vy;

    if (this.y >= this.y0) {
      this.vy = 0;
      this.y = this.y0;
    }

    this.tick++;

    if (this.tick >= 10) {
      this.tick = 0;
      this.animate();
    }

    this.checkPlatform();

    this.score.move();
  }

  checkPlatform() {
    if (
      this.y + this.h > this.platform.y &&
      this.x + this.w > this.platform.x &&
      this.x < this.platform.x + this.platform.w &&
      this.vy > 0
    ) {
      this.y0 = this.platform.y - this.h;
    } else {
      this.y0 = this.ctx.canvas.height * 0.75;
    }
  }

  animate() {
    if (this.vy === 0) {
      this.img.frameIndex++;

      if (this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
      }
    }
  }

  hit() {
    this.score.dec();
  }

  isAlive() {
    return this.score.total > 0;
  }

  keyDown(key) {
    if (key === KEY_UP && this.vy === 0) {
      this.vy = -10;
      this.audioJump.play();
    }

    if (key === KEY_RIGHT) {
      this.vx = 10;
    }

    if (key === KEY_LEFT) {
      this.vx = -10;
    }
  }

  keyUp(key) {
    if (key === KEY_RIGHT || key === KEY_LEFT) {
      this.vx = 0;
    }
  }
}
