class ExParticle {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.vx = Math.random() * (3 - -3) + -3;
    this.vy = Math.random() * (4 - -4) + -4;
    this.radius = 3;
    this.alpha = 1;
    this.angle = 0;
    
  }
  update() {
    
    this.radius = 3;

    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01;

    this.angle++;
    this.red = Math.floor(Math.random() * 255) + 1;
    this.green = Math.floor(Math.random() * 255 + 1);
    this.blue = Math.floor(Math.random() * 255) + 1;
   
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
