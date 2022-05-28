class Platform {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 330;
    this.y = 350;
    this.w = 250;
    this.h = 20;
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  move() {}
}
