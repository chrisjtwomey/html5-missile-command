requirejs.config({
    // append a timestamp to our script urls to keep them fresh
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'soundmanager2': 'vendor/js/soundmanager2/soundmanager2-jsmin',
        'soundManager': 'assets/src/lib/util/soundmanager',
        'PxLoader': 'vendor/js/PxLoader/PxLoader',
        'PxLoaderImage': 'vendor/js/PxLoader/PxLoaderImage',
        'PxLoaderSound': 'vendor/js/PxLoader/PxLoaderSound',
        'InvalidArgumentError': 'assets/src/lib/error/InvalidArgumentError',
        'Loader': 'assets/src/Loader',
        'Vector2D': 'assets/src/lib/util/Vector2D',
        'Library': 'assets/src/lib/util/Library',
        'Build': 'assets/src/Game',
        'Level': 'assets/src/Level',
        'Entity': 'assets/src/lib/entity/Entity',
        'CollidableEntity': 'assets/src/lib/entity/CollidableEntity',
        'EntityManager': 'assets/src/lib/entity/EntityManager',
        'Enemy': 'assets/src/lib/entity/Enemy',
        'EventTimer': 'assets/src/lib/util/EventTimer',
        'Explosion': 'assets/src/lib/projectile/Explosion',
        'ParticleEmitter': 'assets/src/lib/projectile/ParticleEmitter',
    },
    shim: {
        'soundmanager2': {
            exports: 'soundManager'
        },
        'InvalidArgumentError': {
            exports: 'InvalidArgumentError'
        },
        'PxLoaderImage': {
            deps: ['PxLoader']
        },
        'PxLoaderSound': {
            deps: ['PxLoader']
        }
    }
});

var conf = {
    viewport: {
        width: 800,
        height: 600
    }
};

window.config = conf;
