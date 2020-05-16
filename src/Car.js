const { SyncHook, AsyncSeriesHook } = require('tapable');

module.exports = class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook([
                'source',
                'target',
                'routesList',
            ]),
        };
    }

    run() {
        this.accelerate(10);
        this.brake();
        this.calculateRoutes('Async', 'hook', 'demo');
    }

    accelerate(speed) {
        this.hooks.accelerate.call(speed);
    }

    brake() {
        this.hooks.brake.call();
    }

    calculateRoutes(source, target, routesList) {
        console.time('cost');
        this.hooks.calculateRoutes.promise(source, target, routesList).then(
            () => {
                console.timeEnd('cost');
            },
            (err) => {
                console.error(err);
                console.log(timeEnd('cost'));
            }
        );
    }
};
