
export class Vector2D {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }

  add(v) {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  sub(v) {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }

  multiply(v) {
    return new Vector2D(this.x * v.x, this.y * v.y);
  }

  scale(factor) {
    return new Vector2D(this.x * factor, this.y * factor);
  }

  normalize() {
    var v = new Vector2D(0, 0),
        len = this.magnitude();

    if (len !== 0) {
      v.x = this.x / len;
      v.y = this.y / len;
    }

    return v;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  rotate(theta, v) {
    var cs = Math.cos(theta),
        sn = Math.sin(theta);

    var x = this.x - v.x,
        y = this.y - v.y;

    var x_prime = (x * cs) - (y * sn) + v.x,
        y_prime = (x * sn) + (y * cs) + v.y;

    return new Vector2D(x_prime, y_prime);
  }

  angleTo(v) {
    return Math.atan2(v.y - this.y, v.x - this.x);
  }

  angleBetween(v) {
    return Math.atan2(this.y, this.x) - Math.atan2(v.y, v.x);
  }

  magnitude() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  distanceTo(v) {
    var xd = v.x - this.x,
        yd = v.y - this.y;

    return Math.abs(Math.sqrt(xd * xd + yd * yd));
  }

  setComponents(x, y) {
    this.x = x;
    this.y = y;
  }

  round() {
      return new Vector2D(Math.round(this.x), Math.round(this.y));
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
