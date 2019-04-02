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

    entityManager.add(this)
  }

  static distanceTo(entityA, entityB) {
      return entityA.getPos().distanceTo(entityB.getPos());
  }

  addScore(score) {
      this._score += score;
  }

  remove() {
    entityManager.remove(this)
  }

  update(dt) {
    this.velocity.add(this.acceleration);

    this.pos = this.pos.add(this.velocity.scale(dt));
    this.acceleration.setComponents(0, 0);
  }

  get pos() {
    return this._pos;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get velocity() {
    return this._velocity;
  }

  get acceleration() {
    return this._acceleration;
  }

  get dimensions() {
    return {
        width: this.width,
        height: this.height
    };
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

  set score(score) {
    this._score = score;
  }

  set scoreValue(scoreValue) {
    this._scoreValue = scoreValue;
  }
}
