import {entityManager} from './lib/entity/EntityManager.js'
import {Turret} from './lib/entity/Turret.js'
import {Vector2D} from './lib/util/Vector2D.js'

export class Level {

  constructor(canvas, level_num) {
    //this.particleEmitter = new ParticleEmitter();

    this._started = false;
    this._paused  = false;

    this._level_num = level_num;

    // cursor pointer
    this._pointer = new Vector2D(0, 0);
    this._turrets = []


    canvas.onmousemove = function(evt) {
      this.pointer.setComponents(evt.x, evt.y);
    }.bind(this)

    canvas.onmousedown = function(evt) {
      let target = new Vector2D(evt.x, evt.y),
          turret = this._determineFiringTurret(target);

      if(turret != null) {
        turret.fire(target);
      }
    }.bind(this)
  }

  update(dt) {
    entityManager.update(dt)
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

  _determineFiringTurret(target) {
    let closest_turret = null;
    let smallest_distance = null;

    for(let turret of this._turrets) {
      if(closest_turret != null) {
        let distance = turret.pos.distanceTo(target);

        if(turret.ammo > 0 && ! turret.destroyed && distance < smallest_distance) {
          smallest_distance = distance;
          closest_turret = turret;
        }
      } else {
        if(turret.ammo > 0 && ! turret.destroyed){
          closest_turret = turret;
          smallest_distance = turret.pos.distanceTo(target);
        }
      }
    }

    return closest_turret;
  }

  _spawnTurrets() {
    this._turrets = [
      new Turret(canvas.width * 0.2, canvas.height - 40, 50, 20),
      new Turret(canvas.width * 0.4, canvas.height - 40, 50, 20),
      new Turret(canvas.width * 0.6, canvas.height - 40, 50, 20),
      new Turret(canvas.width * 0.8, canvas.height - 40, 50, 20)
    ]
  }

  start() {
    this._spawnTurrets();

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
