import {Missile} from './Missile.js'

export class AntiBallisticMissile extends Missile {

  constructor(posX, posY, targetX, targetY, speed) {
    super(posX, posY, targetX, targetY, speed);
  }

  destroy() {
    super.destroy();
  }

  update(dt) {
    super.update(dt);

    if(this.pos.y <= this.target.y) {
      this.destroy();
    }
  }

  render(ctx) {
    ctx.save();

    ctx.strokeStyle = "#0000FF"
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.origin.x, this.origin.y);
    ctx.stroke();

    // draw target "X"
    ctx.strokeStyle = "#FFF"
    ctx.beginPath();
    ctx.moveTo(this.target.x - 5, this.target.y - 5);
    ctx.lineTo(this.target.x + 5, this.target.y + 5);

    ctx.moveTo(this.target.x + 5, this.target.y - 5);
    ctx.lineTo(this.target.x - 5, this.target.y + 5);
    ctx.stroke();

    ctx.restore();

    super.render(ctx);
  }
}
