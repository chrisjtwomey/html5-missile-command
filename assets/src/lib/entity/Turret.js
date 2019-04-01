import {Entity} from './Entity.js'
import {Missile} from '../projectile/Missile.js'

export const MAX_MISSILE_NUM = 12;

export class Turret extends Entity {

  constructor(posX, posY, width, height) {
    super(posX, posY, width, height, 0);

    this._ammo = MAX_MISSILE_NUM;
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
    ctx.restore();
  }

  fire(target) {
    if(this.ammo > 0) {
      let missile = new Missile(this.pos.x, this.pos.y, target.x, target.y, 0);
      missile.launch();
      this.ammo--;
    }
  }

  get ammo() {
    return this._ammo;
  }

  set ammo(ammo) {
    this._ammo = ammo;
  }
}
