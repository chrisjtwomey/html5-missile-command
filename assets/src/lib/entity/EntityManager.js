export class EntityManager {

  constructor() {
    this._entities = [];
  }

  update(dt) {
    for(let entity of this.entities) {
      entity.update(dt);
    }
  }

  render(ctx) {
    for(let entity of this.entities) {
      entity.render(ctx);
    }
  }

  add(entity) {
    this._entities.push(entity);
  }

  remove(entity) {
    return this._entities.splice(this._entities.indexOf(entity), 1);
  }

  get entities() {
    return this._entities;
  }

  get players() {
    return this._entities;
  }
}

var entityManager = new EntityManager();

export { entityManager }
