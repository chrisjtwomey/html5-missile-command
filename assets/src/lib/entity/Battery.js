import {Entity} from './Entity.js'
import {AntiBallisticMissile} from '../projectile/AntiBallisticMissile.js'

export const MAX_MISSILE_NUM = 12;

export const TYPE_ALPHA = 0;
export const TYPE_OMEGA = 1;
export const TYPE_DELTA = 2;

export class Battery extends Entity {
  constructor(posX, posY, battery_type) {
    super(posX, posY, 50, 15, 0);

    if(battery_type == TYPE_ALPHA) {
      this._abm_speed = 500;
      this._name = "ALPHA";
    } else if(battery_type == TYPE_OMEGA) {
      this._abm_speed = 500;
      this._name = "OMEGA";
    } else if(battery_type == TYPE_DELTA) {
      this._abm_speed = 1000;
      this._name = "DELTA";
    }

    this._ammo = MAX_MISSILE_NUM;
    this._fireLock = false;
  }

  static get TYPE_ALPHA() {
    return TYPE_ALPHA;
  }

  static get TYPE_OMEGA() {
    return TYPE_OMEGA;
  }

  static get TYPE_DELTA() {
    return TYPE_DELTA;
  }

  update(dt) {
    return null;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = "#FFF"
    ctx.fillRect(this.pos.x - this.dimensions.width / 2, this.pos.y,  this.dimensions.width,  this.dimensions.height);

    ctx.fillStyle = "#FFF";
    ctx.fillText(this.ammo, this.pos.x - 40, this.pos.y - 20);

    ctx.fillText(this.name, this.pos.x + 40, this.pos.y - 20);
    ctx.restore();
  }

  fire(target) {
    if(this.ammo > 0) {
      let missile = new AntiBallisticMissile(this.pos.x, this.pos.y, target.x, target.y, this.abm_speed);
      missile.launch();
      this.ammo--;
    }
  }

  get name() {
    return this._name;
  }

  get abm_speed() {
    return this._abm_speed;
  }

  get ammo() {
    return this._ammo;
  }

  get fireLock() {
    return this._fireLock;
  }

  set fireLock(fireLock) {
    this._fireLock = fireLock;
  }

  set ammo(ammo) {
    this._ammo = ammo;
  }
}
