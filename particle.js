class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
    this.radius = 5;

    this.vx = Math.random() * (0.5 - -0.5) + 0.5;
    this.vy = -1.1;
    this.acc = 0.9;
    this.history = [];
  }
  draw(ctx) {
    for (let i = 0; i < this.history.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(
        this.history[i].x,
        this.history[i].y,
        this.radius * 0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();

      if (this.history.length > 20) {
        this.history.splice(i, 1);
      }
    }
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.vx += this.acc;
    this.vy += this.acc;
    this.x += this.vx;
    this.y += this.vy;
    this.acc *= 0;
    let v = { x: this.x, y: this.y };
    this.history.push(v);
  }
  applyForce(force) {
    this.acc += force;
  }
}
