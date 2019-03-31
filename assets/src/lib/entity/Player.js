import {Turret} from './Turret.js'
import {Vector2D} from '../util/Vector2D.js'

export class Player {
  constructor(canvas) {
    this._pointer = new Vector2D(0, 0);
    this._turret = new Turret(canvas.width / 2, canvas.height - 60, 50, 20);

    canvas.onmousemove = function(evt) {
      this._pointer.setComponents(evt.x, evt.y);
    }.bind(this)

    canvas.onmousedown = function(evt) {
      let target = new Vector2D(evt.x, evt.y);
      this._turret.fire(target)
    }.bind(this)
  }

  get pointer() {
    return this._pointer;
  }

  render(ctx) {
    ctx.save();
    // draw target "X"
    ctx.strokeStyle = "#FFF"
    ctx.beginPath();
    ctx.moveTo(this.pointer.x - 5, this.pointer.y - 5);
    ctx.lineTo(this.pointer.x + 5, this.pointer.y + 5);

    ctx.moveTo(this.pointer.x + 5, this.pointer.y - 5);
    ctx.lineTo(this.pointer.x - 5, this.pointer.y + 5);
    ctx.stroke();

    // ctx.fillStyle = "#FFF";
    // ctx.fillText("(" + this._pointer.x + ", " + this._pointer.y + ")", this._pointer.x, this._pointer.y);
    ctx.restore();
  }
}
