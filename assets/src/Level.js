//import {window} from '../Loader.js'
import {entityManager} from './lib/entity/EntityManager.js'
import {Battery} from './lib/entity/Battery.js'
import {Vector2D} from './lib/util/Vector2D.js'
import {KeyboardState} from '../../vendor/js/THREEx/KeyboardState.js'

export class Level {

  constructor(canvas, level_num) {
    //this.particleEmitter = new ParticleEmitter();

    this._started = false;
    this._paused  = false;

    this._level_num = level_num;

    // cursor pointer
    this._pointer  = new Vector2D(0, 0);
    this._keyboard = new KeyboardState(window);

    this._batteries = []

    canvas.onmousemove = function(evt) {
      this.pointer.setComponents(evt.x, evt.y);
    }.bind(this)

    canvas.onmousedown = function(evt) {
      let target = new Vector2D(evt.x, evt.y),
          battery = this._pointer_determineFiringBattery(target);

      if(battery != null) {
        battery.fire(target);
      }
    }.bind(this)
  }

  update(dt) {
    entityManager.update(dt);

    // TODO: less messy
    let targetBattery;

    if(this.keyboard.pressed("1")) {
      targetBattery = this._batteries[0];
    } else if(this.keyboard.pressed("2")) {
      targetBattery = this._batteries[1];
    } else if(this.keyboard.pressed("3")) {
      targetBattery = this._batteries[2];
    }

    if(!targetBattery) {
      for(let battery of this._batteries) {
        battery.fireLock = false;
      }
    } else if (!targetBattery.fireLock) {
      targetBattery.fire(this.pointer);
      targetBattery.fireLock = !targetBattery.fireLock;
    }
  }

  render(ctx) {
    ctx.save();
    entityManager.render(ctx);

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

  _pointer_determineFiringBattery(target) {
    let closestBattery = null;
    let smallestDistance = null;

    for(let battery of this._batteries) {
      if(closestBattery != null) {
        let distance = battery.pos.distanceTo(target);

        if(battery.ammo > 0 && ! battery.destroyed && distance < smallestDistance) {
          smallestDistance = distance;
          closestBattery = battery;
        }
      } else {
        if(battery.ammo > 0 && ! battery.destroyed){
          closestBattery = battery;
          smallestDistance = battery.pos.distanceTo(target);
        }
      }
    }

    return closestBattery;
  }

  _spawnBatteries() {
    this._batteries = [
      new Battery(canvas.width * 0.2, canvas.height - 40, Battery.TYPE_ALPHA),
      new Battery(canvas.width * 0.5, canvas.height - 40, Battery.TYPE_DELTA),
      new Battery(canvas.width * 0.8, canvas.height - 40, Battery.TYPE_OMEGA)
    ]
  }

  start() {
    this._spawnBatteries();

    this._started = true;
    this._paused  = false;

    console.info("Level #" + this.levelNum  + " started");
  }

  pause() {
    this._paused = true;
  }

  unpause() {
    this._paused = false;
  }

  stop() {
    this._started = false;
    this._paused  = false;
  }

  get pointer() {
    return this._pointer;
  }

  get keyboard() {
    return this._keyboard;
  }

  get levelNum() {
    return this._level_num;
  }

  get isStarted() {
    return this._started;
  }

  get isOver() {
    return entityManager.players.length == 0;
  }
}
