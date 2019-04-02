import {entityManager} from './lib/entity/EntityManager.js'
import {EventTimer} from './lib/util/EventTimer.js'
import {Level} from './Level.js'

const DEFAULT_WIDTH  = 650;
const DEFAULT_HEIGHT = 450;

const PHYSICS_LEVEL     = 1;
const GRAV_CONST        = 1;
const GRAV_MIN_DISTANCE = 200;

const PARTICLES   = 0.5;
const SHADOW_BLUR = 0.5;

const INIT_LEVEL_NUM       = 1;
const LEVEL_RESET_INTERVAL = 1000;

export const MAX_FPS       = 65;
export const DEFAULT_SPEED = 1;
export const DEFAULT_DT    = 0.015;

export class Game {

  constructor(canvas) {
    this._started = false;
    this._paused  = false;

    this._canvas = canvas;

    this._currentLevel = null;

    this.speed = DEFAULT_SPEED;
    this.fps   = MAX_FPS;

    this._dt = DEFAULT_DT;

    this._updateFPSTimer = new EventTimer(1000, function() {
      this.fps = Math.round((1000 / this._dt) / 1000);
    }.bind(this))

    this._nextLevelTimer = new EventTimer(LEVEL_RESET_INTERVAL, function () {
      this.nextLevel();
    }.bind(this));
  }

  update(dt) {
    this._dt = dt * this.speed;

    if (this._currentLevel != null && this._started && !this._paused) {
      if (!this.isOver && this._currentLevel.isOver) {
        this._nextLevelTimer.wait(dt);
      }

      this._currentLevel.update(this._dt);
    }

    this._updateFPSTimer.wait(this._dt);
  }

  render(ctx) {
    ctx.save();
    ctx.font = "16px AtariChunky";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ctx.strokeStyle = "#FFF";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // render level, debug etc
    this._currentLevel.render(ctx);

    ctx.restore();
  }

  start() {
    this._started = true;
    this._paused  = false;

    this._currentLevel = new Level(canvas, INIT_LEVEL_NUM);
    this._currentLevel.start();

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

    this._currentLevel = null;
  }

  nextLevel() {
    this._currentLevel = new Level(canvas, this._currentLevel.levelNum++);
    this._currentLevel.start();
  }

  get isStarted() {
    return this._started;
  }

  get isOver() {
    return this._currentLevel.isOver;
  }
}
