import {Entity} from './Entity.js'
import {Missile} from './Missile.js'

export const MAX_MISSILE_NUM = 30;

export class Turret extends Entity {

  constructor(posX, posY, width, height) {
    super(posX, posY, width, height, 0);
  }

  update(dt) {
    return null;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = "#FFF"
    ctx.fillRect(this.pos.x - this.dimensions.width / 2, this.pos.y +  this.dimensions.height / 2,  this.dimensions.width,  this.dimensions.height);
    ctx.restore();
  }

  fire(target) {
    let missile = new Missile(this.pos.x, this.pos.y, target.x, target.y, 0);
    missile.launch();
  }
}
