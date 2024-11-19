class Circle {
  constructor(effect, radius, startA, endA, speed, color, soundFrequency) {
    this.effect = effect;
    this.x = effect.width / 2;
    this.y = effect.height / 2;
    this.radius = radius;
    this.startA = startA;
    this.endA = endA;
    this.speed = speed;
    this.color = color;
    this.soundFrequency = soundFrequency
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, this.startA, this.endA);
    ctx.stroke();
  }
  update() {
    this.startA += this.speed;
    this.endA += this.speed;
  }
}

