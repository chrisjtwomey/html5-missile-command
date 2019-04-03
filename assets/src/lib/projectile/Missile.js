import {CollidableEntity} from '../entity/CollidableEntity.js'
import {Explosion} from '../entity/Explosion.js'
import {Vector2D} from '../util/Vector2D.js'

export class Missile extends CollidableEntity {

  constructor(posX, posY, targetX, targetY, speed, scoreValue = 0) {
    super(posX, posY, 2, 2, scoreValue);

    this._origin = new Vector2D(this.pos.x, this.pos.y);
    this._target = new Vector2D(targetX, targetY);
    let dir = this.origin.angleTo(this.target);
    this._dir = new Vector2D(Math.cos(dir), Math.sin(dir));

    this.speed = speed;
  }

  get target() {
    return this._target
  }

  get origin() {
    return this._origin;
  }

  get dir() {
    return this._dir;
  }

  get speed() {
    return this._speed;
  }

  set speed(speed) {
    this._speed = speed;
  }

  update(dt) {
    super.update(dt);
  }

  destroy() {
    let explosion = new Explosion(this.pos.x, this.pos.y);
    super.destroy();
  }

  render(ctx) {
    ctx.save();

    ctx.fillStyle = "#FFF"
    ctx.fillRect(this.pos.x - this.width / 2, this.pos.y - this.height / 2,  this.width,  this.height);

    ctx.restore();
  }

  launch() {
    let velocity = this.dir.scale(this.speed);
    this.velocity.setComponents(velocity.x, velocity.y);
  }
}
