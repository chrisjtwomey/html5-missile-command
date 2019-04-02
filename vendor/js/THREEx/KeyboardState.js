export const MODIFIERS = ['shift', 'ctrl', 'alt', 'meta'];
export const ALIAS = {
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'space': 32,
    'pageup': 33,
    'pagedown': 34,
    'tab': 9
};

export class KeyboardState {
    constructor(targetElem) {
      // to store the current state
      this._keyCodes = {};
      this._modifiers = {};
      this._targetElem = targetElem;

      // bind keyEvents
      let self = this;
      this._onKeyDown = function (event) {
        self._onKeyChange(event, true);
      };
      this._onKeyUp = function (event) {
        self._onKeyChange(event, false);
      };

      // bind keyEvents
      this.targetElem.addEventListener("keydown", this._onKeyDown, false);
      this.targetElem.addEventListener("keyup", this._onKeyUp, false);
    }

    static get MODIFIERS() {
      return MODIFIERS;
    }

    static get ALIAS() {
      return ALIAS;
    }

    get targetElem() {
      return this._targetElem;
    }

    _onKeyDown(event) {
      this._onKeyChange(event, true);
    }

    _onKeyUp(event) {
      this._onKeyChange(event, false);
    }

    _onKeyChange(event, pressed) {
      // log to debug
      //console.log("onKeyChange", event, pressed, event.keyCode, event.shiftKey, event.ctrlKey, event.altKey, event.metaKey)

      // update this.keyCodes
      let keyCode = event.keyCode;
      this._keyCodes[keyCode] = pressed;

      // update this.modifiers
      this._modifiers['shift'] = event.shiftKey;
      this._modifiers['ctrl'] = event.ctrlKey;
      this._modifiers['alt'] = event.altKey;
      this._modifiers['meta'] = event.metaKey;
    }

    /**
     * query keyboard state to know if a key is pressed of not
     *
     * @param {String} keyDesc the description of the key. format : modifiers+key e.g shift+A
     * @returns {Boolean} true if the key is pressed, false otherwise
     */
    pressed(keyDesc) {
      let keys = keyDesc.split("+");
      for (let key of keys) {
          let pressed;
          if (MODIFIERS.indexOf(key) !== -1) {
              pressed = this._modifiers[key];
          } else if (Object.keys(ALIAS).indexOf(key) != -1) {
              pressed = this._keyCodes[ALIAS[key]];
          } else {
              pressed = this._keyCodes[key.toUpperCase().charCodeAt(0)]
          }
          if (!pressed) return false;
      };
      return true;
    }

    /**
     * To stop listening of the keyboard events
     */
    destroy() {
      // unbind keyEvents
      this.targetElem.removeEventListener("keydown", this._onKeyDown, false);
      this.targetElem.removeEventListener("keyup", this._onKeyUp, false);
    }
}
