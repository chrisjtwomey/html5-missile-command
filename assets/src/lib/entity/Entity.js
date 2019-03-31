import {entityManager} from './EntityManager.js'
import {Vector2D} from '../util/Vector2D.js'

export class Entity {

  constructor(posX, posY, width, height, scoreValue) {
    this._scoreValue = scoreValue;
    this._score = 0;
    this._score_interp = this._score;

    this._pos = new Vector2D(posX, posY);
    this._velocity = new Vector2D(0, 0);
    this._acceleration = new Vector2D(0, 0);

    if (width !== "undefined" && height !== "undefined") {
        this._width = width;
        this._height = height;
    }

    this._bounds = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
    };

    entityManager.add(this)
  }

  static distanceTo(entityA, entityB) {
      return entityA.getPos().distanceTo(entityB.getPos());
  }

  addScore(score) {
      this._score += score;
  }

  destroy() {
    entityManager.remove(this)
  }

  update(dt) {
    this._updatePosition(dt);
  }

  get pos() {
    return this._pos;
  }

  get velocity() {
    return this._velocity;
  }

  get acceleration() {
    return this._acceleration;
  }

  get dimensions() {
    return {
        width: this._width * scaleW,
        height: this._height * scaleH
    };
  }

  get bounds() {
    return this._bounds;
  }

  get score() {
    return this._score;
  }

  get scoreValue() {
    return this._scoreValue;
  }

  set pos(pos) {
    this._pos = pos;
  }

  set velocity(velocity) {
    this._velocity = velocity;
  }

  set width(width) {
    this._width  = width;
  }

  set height(height) {
    this._height = height;
  }

  set bounds(bounds) {
    this._bounds = bounds;
  }

  set score(score) {
    this._score = score;
  }

  set scoreValue(scoreValue) {
    this._scoreValue = scoreValue;
  }

  _compute_dVelocity(acceleration, dt) {
      return acceleration.scale(dt);
  }

  _updatePosition(dt) {
      // var newPos = this._checkOutOfBounds();
      //
      // this._handleOutOfBounds(newPos);
      //
      // var velocity = this.getVelocity().add(this.getAcceleration());

      this.pos = this.pos.add(this.velocity.scale(dt));

      this.acceleration.setComponents(0, 0);
  }

  _checkOutOfBounds() {
      var width = (this.getDimensions().width !== "undefined") ? this.getDimensions().width : 0,
          height = (this.getDimensions().height !== "undefined") ? this.getDimensions().height : 0;

      var newPos = this.getPos().clone(),
          bounds = this.getBounds();

      if (newPos.x < bounds.x - width) {
          newPos.x = (bounds.x + bounds.width) + width;
      }

      if (newPos.x > (bounds.x + bounds.width) + width) {
          newPos.x = bounds.x - width;
      }

      if (newPos.y < bounds.y - height) {
          newPos.y = (bounds.y + bounds.height) + height;
      }

      if (newPos.y > (bounds.y + bounds.height) + height) {
          newPos.y = bounds.y - height;
      }

      return newPos;
  }

  _handleOutOfBounds(correctedPos) {
      if (correctedPos.x != this.getPos().x || correctedPos.y != this.getPos().y) {
          this.setPos(correctedPos);
      }
  }
}
