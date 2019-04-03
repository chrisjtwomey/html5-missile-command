import {CollidableEntity} from '../entity/CollidableEntity.js'


export class Explosion extends CollidableEntity {

  constructor(posX, posY, scoreValue = 0) {
    super(posX, posY, 1, 1, scoreValue);

    this._radius = 1;
    this._maxRadius = 30;
    this._expansionRate = 0.2;
    this._retractionRate = 0.2;
    this._expanded = false;
  }


  update(dt) {
    let resultingRadius;

    if(! this.expanded) {
      resultingRadius = this.radius + this.expansionRate;

      if(resultingRadius > this.maxRadius) {
        resultingRadius = this.maxRadius;
        this.expanded = true;
      }
    } else {
      resultingRadius = this.radius - this.retractionRate;

      if(resultingRadius < 0) {
        this.remove();
      }
    }

    this.radius = resultingRadius;
  }

  render(ctx) {
    ctx.save();

    ctx.fillStyle = "#FFF"
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this._radius, 0, 360);
    ctx.fill();

    ctx.restore();
  }

  get radius() {
    return this._radius;
  }

  get maxRadius() {
    return this._maxRadius;
  }

  get expanded() {
    return this._expanded;
  }

  get expansionRate() {
    return this._expansionRate;
  }

  get retractionRate() {
    return this._retractionRate;
  }

  set radius(radius) {
    this._radius = radius;
  }

  set expanded(expanded) {
    this._expanded = expanded;
  }
}
