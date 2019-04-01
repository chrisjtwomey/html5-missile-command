import {Entity} from './Entity.js'
import {circlesIntersect} from '../util/Library.js'

export class CollidableEntity extends Entity {
  constructor(posX, posY, width, height, scoreValue) {
    super(posX, posY, width, height, scoreValue);

    this._destroyed = false;
  }

  intersects(collidableEntity) {
      let c1 = this.boundingCircle,
          c2 = collidableEntity.boundingCircle;

      return circlesIntersect(c1.x, c1.y, c1.r, c2.x, c2.y, c2.r);
  }

  get boundingCircle() {
    return {
      x: this.x,
      y: this.y,
      r: this.width / 2
    }
  }

  get outOfBounds() {
    let outOfBounds = false;

    return outOfBounds;
  }

  get destroyed() {
    return this._destroyed;
  }

  set destroyed(destroyed) {
    this._destroyed = destroyed;
  }

  _handleOutOfBounds(correctedPos) {
      if (correctedPos.x != this.getPos().x || correctedPos.y != this.getPos().y) {
          this.setPos(correctedPos);
      }
  }
}
