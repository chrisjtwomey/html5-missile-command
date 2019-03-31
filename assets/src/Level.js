import {entityManager} from './lib/entity/EntityManager.js'
import {Player} from './lib/entity/Player.js'

export class Level {

  constructor(canvas, level_num) {
    //this.particleEmitter = new ParticleEmitter();
    this._player = new Player(canvas);

    this._started = false;
    this._paused  = false;

    this._level_num = level_num;

  }

  update(dt) {
    entityManager.update(dt)
  }

  render(ctx) {
    ctx.save();
    entityManager.render(ctx);
    this._player.render(ctx);
    ctx.restore();
  }

  start() {
    this._started = true;
    this._paused  = false;

    console.info("Game started");
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
