import {Missile} from './Missile.js'

export class CruiseMissile extends Missile {

  constructor(posX, posY, targetX, targetY, speed) {
    super(posX, posY, targetX, targetY, speed);
  }

  update(dt) {
    super.update(dt);

    if(this.pos.y <= this.target.y) {
      this.remove();
    }
  }

  render(ctx) {
    ctx.save();

    ctx.strokeStyle = "#FF0000"
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.origin.x, this.origin.y);
    ctx.stroke();

    ctx.restore();
  }
}
