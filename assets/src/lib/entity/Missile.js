import {Entity} from './Entity.js'
import {Vector2D} from '../util/Vector2D.js'

export class Missile extends Entity {

  constructor(posX, posY, targetX, targetY, scoreValue) {
    super(posX, posY, 5, 5, scoreValue);

    this._origin = new Vector2D(this.pos.x, this.pos.y);
    this._target = new Vector2D(targetX, targetY);
    let dir = this._origin.angleTo(this._target);
    this._dir = new Vector2D(Math.cos(dir), Math.sin(dir));
    this._speed = 250;
  }

  get target() {
    return this._target
  }

  get origin() {
    return this._origin;
  }

  update(dt) {
    super.update(dt);

    if(this.pos.y <= this.target.y) {
      this.destroy();
    }
  }

  render(ctx) {
    ctx.save();
    
    ctx.strokeStyle = "#FFF"
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
  }

  launch() {
    let velocity = this._dir.scale(this._speed);
    this._velocity.setComponents(velocity.x, velocity.y);
  }
}
