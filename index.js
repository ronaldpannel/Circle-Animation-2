/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

ctx.lineWidth = 2;
const playBtn = document.getElementById("btn");
const soundFrequencies = [
  1760, 1567.98, 1396.91, 1318.51, 1174.66, 1046.5, 987.77, 880, 783.99, 698.46,
  659.25, 587.33, 523.25, 493.88, 440, 392, 349.23, 329.63, 293.66, 261.63,
];

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.circleArray = [];
    this.exParticleArray = [];
    this.circleNum = 60;
    this.exParticleNum = 100;
    this.gravity = Math.random() * (0.05 - 0.005) + 0.005;
    this.createCircles();
    this.particle = new Particle(this);
  }
  createCircles() {
    for (let i = 0; i < this.circleNum; i++) {
      const circleSoundFrequency = soundFrequencies[i];
      let radius = i * 4 + 10;
      let startA = Math.PI / 4;
      let endA = startA + (3 * Math.PI) / 2;
      let dir = Math.random() > 0.5 ? -1 : 1;
      let speed = i * 0.0008 + 0.0004;
      let hue = i * 60;
      let color = `hsl(${hue}, 50%, 50%)`;
      this.circleArray.push(
        new Circle(
          this,
          radius,
          startA,
          endA,
          speed,
          color,
          circleSoundFrequency
        )
      );
    }

    // this.circleArray[this.circleArray.length - 1].startA = 0;
    // this.circleArray[this.circleArray.length - 1].endA = Math.PI * 2;
  }
  createExParticles(x, y) {
    for (let i = 0; i < this.exParticleNum; i++) {
      this.exParticleArray.push(new ExParticle(this, x, y));
    }
  }
  collision() {
    for (let i = 0; i < this.circleArray.length; i++) {
      let circle = this.circleArray[i];
      let dx = this.particle.x - circle.x;
      let dy = this.particle.y - circle.y;
      let d = Math.hypot(dx, dy);

      if (
        d > circle.radius - this.particle.radius &&
        d < circle.radius + this.particle.radius
      ) {
        let angle = Math.atan2(dy, dx);
        let angleInCircle = (angle + 2 * Math.PI) % (2 * Math.PI);
        let startA = (circle.startA + 2 * Math.PI) % (2 * Math.PI);
        let endA = (circle.endA + 2 * Math.PI) % (2 * Math.PI);
        let withinGap =
          (startA < endA && angleInCircle >= startA && angleInCircle <= endA) ||
          (startA > endA && (angleInCircle >= startA || angleInCircle <= endA));

        if (withinGap) {
          this.createExParticles(this.particle.x, this.particle.y);
        }
        this.particle.vx *= -1;
        this.particle.vy *= -1;
        this.circleArray.splice(i, 1);
        let note = Math.floor(Math.random() * soundFrequencies.length);
        playSound(soundFrequencies[note]);
      }
    }
  }
  reset() {
    this.circleArray = [];
    this.exParticleArray = [];
    this.createExParticles(this.particle.x, this.particle.y);
    this.createCircles();
    this.particle = new Particle(this);
  }

  render(ctx) {
    this.particle.draw(ctx);
    this.particle.update();
    this.particle.applyForce(this.gravity);
    for (let i = 0; i < this.circleArray.length; i++) {
      this.circleArray[i].draw(ctx);
      this.circleArray[i].update();
    }
    for (let i = 0; i < this.exParticleArray.length; i++) {
      this.exParticleArray[i].draw(ctx);
      this.exParticleArray[i].update();
      if (this.exParticleArray[i].alpha < 0) {
        this.exParticleArray.splice(i, 1);
      }
    }
    this.collision();

    if (this.circleArray.length == 0) {
      this.reset();
    }
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(ctx);
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  requestAnimationFrame(animate);
}
0;
animate();
playBtn.addEventListener("click", () => {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
});

// window.addEventListener("resize", () => {
//   canvas.width = canvas.width;
//   canvas.height = canvas.height;
// });
