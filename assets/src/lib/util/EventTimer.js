export class EventTimer {
  constructor(time, callback) {
    this._waitTime = time; // the time first specified
    this._timeRemaining = time; // the time left until callback is called
    this._callback = callback; // the callback function
  }

  /**
   * Tells the event timer to spend time
   * in the game loop. The function callback
   * is called once the time specified runs
   * out, the timer is then reset.
   *
   * @param  {Double} dt delta-time used to
   * wait an accurate amount of time
   * @return {void}
   */
  wait(dt) {
    if (this._timeRemaining > 0) {
      this._timeRemaining -= (1000 * dt);
    } else {
      this._callback.call();
      this.reset();
    }
  }

  reset() {
    this._timeRemaining = this._waitTime;
  }

  setWaitTime(time) {
    this._waitTime = time;
    this._timeRemaining = time;
  }

  getWaitTime() {
    return this._waitTime;
  }

  setTimeRemaining(time) {
    this._timeRemaining = time;
  }

  getTimeRemaining() {
    return this._timeRemaining;
  }
}
